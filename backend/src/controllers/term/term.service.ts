import { Request } from "express";
import { IScheduleDetail, ITerm, ITermClass } from "../../db/models/term";
import moment from "moment";
import { readExcelFile } from "../../helper/file.helper";
import { Row } from "read-excel-file";
import {
  ParseNumberOption,
  isNumber,
  throwValidationError,
} from "../../helper/validation.helper";
import { Cell } from "read-excel-file/types";
import { constants } from "../../constants";
import { DayInWeek } from "../../constants/day.enum";
import { createTypedRequest } from "../../helper/type.helper";
import { PaginationRequest } from "../../types/integration.types";
import { paginate } from "../../helper/pagination.helper";

type TermDataItem = Omit<ITerm, "classes" | "sessions"> &
  Omit<IScheduleDetail, "startLesson" | "endLesson"> & {
    lesson: string;
    classId: string;
  };

const parseNumberOptions: ParseNumberOption = {
  allowDecimal: false,
  allowNegative: false,
};

const parseLessonOptions: ParseNumberOption = {
  allowDecimal: false,
  min: 1,
  max: 15,
};

const validateScheduleData = (scheduleData: string[]) => {
  const result: IScheduleDetail[] = [];

  for (const scheduleStr of scheduleData) {
    const match = scheduleStr.match(
      /((thứ ([2-7]))|(chủ nhật)) \((\d)-(\d)\)/i
    );

    if (!match?.length) {
      throwValidationError("Lịch học không hợp lệ");
    }

    const dayInWeekStr = match![3];
    const startLessonStr = match![5];
    const endLessonStr = match![6];

    if (!isNumber(startLessonStr, parseLessonOptions)) {
      throwValidationError("Số tiết không hợp lệ");
    }

    if (!isNumber(endLessonStr, parseLessonOptions)) {
      throwValidationError("Số tiết không hợp lệ");
    }

    const dayInWeekValue = Number(dayInWeekStr);

    result.push({
      day: !Number.isNaN(dayInWeekValue)
        ? dayInWeekValue - 2
        : DayInWeek.Sunday,
      startLesson: Number(startLessonStr),
      endLesson: Number(endLessonStr),
    });
  }

  return result;
};

const validateTermClassesData = (cells: Cell[]) => {
  const result: ITermClass[] = [];

  const [
    classesCountStr,
    classNames,
    schedules,
    startDateStr,
    endDateStr,
    maxStudentsCountStr,
    PICs,
  ] = cells;

  if (!isNumber(classesCountStr, parseNumberOptions)) {
    throwValidationError("Số lượng lớp không hợp lệ");
  }

  if (!isNumber(maxStudentsCountStr, parseNumberOptions)) {
    throwValidationError("Số lượng sinh viên không hợp lệ");
  }

  const classesCount = Number(classesCountStr);

  const classesNameList = classNames.toString().split(constants.DELIMETER.LIST);
  const schedulesList = schedules.toString().split(constants.DELIMETER.LIST);
  const picsList = PICs.toString().split(constants.DELIMETER.LIST);

  if (
    classesCount !== classesNameList.length ||
    classesCount !== schedulesList.length ||
    classesCount !== picsList.length
  ) {
    throwValidationError("Số lượng lớp không đúng");
  }

  const startDate = moment(
    startDateStr.toString(),
    constants.FORMAT.DATE.DEFAULT,
    true
  );
  if (!startDate.isValid()) {
    throwValidationError("Ngày bắt đầu không hợp lệ");
  }

  const endDate = moment(
    endDateStr.toString(),
    constants.FORMAT.DATE.DEFAULT,
    true
  );
  if (!endDate.isValid()) {
    throwValidationError("Ngày kết thúc không hợp lệ");
  }

  for (let i = 0; i < classesCount; i++) {
    const className = classesNameList[i];
    const pic = picsList[i];

    const scheduleData = schedulesList[i].split(constants.DELIMETER.LIST_ITEM);
    const schedules = validateScheduleData(scheduleData);

    result.push({
      name: className,
      lecture: pic,
      maxStudentsCount: Number(maxStudentsCountStr),
      registrationInfo: null,
      attendanceRecordFile: null,
      startDate: startDate.toDate(),
      endDate: endDate.toDate(),
      schedule: schedules,
    });
  }

  return result;
};

const validateTermData = (rows: Row[]) => {
  const result: ITerm[] = [];

  for (const row of rows) {
    const [code, name, type, creditsStr, sessionsStr, ...restProps] = row;

    if (!isNumber(creditsStr)) {
      throwValidationError("Tín chỉ phải là số nguyên");
    }

    if (!isNumber(sessionsStr)) {
      throwValidationError("Số tiết học phải là số nguyên");
    }

    const termClassesData = validateTermClassesData(restProps);

    result.push({
      code: code.toString(),
      name: name.toString(),
      type: type.toString(),
      credits: Number(creditsStr),
      sessions: Number(sessionsStr),
      classes: termClassesData,
    });
  }

  return result;
};

const readTermData = async (file: Express.Multer.File): Promise<ITerm[]> => {
  const originalRows = await readExcelFile(file);

  return validateTermData(originalRows);
};

const getTermData = async (req: Request) => {
  const { db, query } = createTypedRequest<{}, PaginationRequest>(req);

  return paginate<ITerm, TermDataItem>(db.terms, query, [
    {
      $unwind: {
        path: "$classes",
        includeArrayIndex: "classIndex",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$classes.schedule",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $set: {
        className: "$name",
        code: {
          $concat: [
            "$code",
            "_",
            "0",
            {
              $toString: {
                $add: ["$classIndex", 1],
              },
            },
          ],
        },
        rootId: "$_id",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ["$$ROOT", "$classes"],
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ["$$ROOT", "$schedule"],
        },
      },
    },
    {
      $set: {
        classId: "$classes._id",
        lesson: {
          $concat: [
            {
              $toString: "$startLesson",
            },
            "-",
            {
              $toString: "$endLesson",
            },
          ],
        },
      },
    },
    {
      $addFields: {
        isApproved: {
          $eq: ["$classes.registrationInfo.approved", true],
        },
        isRegistered: {
          $ne: ["$classes.registrationInfo", null],
        },
      },
    },
    {
      $set: {
        name: "$className",
        id: "$rootId",
      },
    },
    {
      $unset: [
        "rootId",
        "classes",
        "schedule",
        "className",
        "startLesson",
        "endLesson",
      ],
    },
    {
      $project: {
        id: 1,
        name: 1,
        code: 1,
        type: 1,
        credits: 1,
        day: 1,
        lesson: 1,
        classId: 1,
        isApproved: 1,
        isRegistered: 1,
        _id: 0,
      },
    },
    {
      $set: {
        day: {
          $switch: {
            branches: [
              { case: { $eq: ["$day", 0] }, then: "Thứ 2" },
              { case: { $eq: ["$day", 1] }, then: "Thứ 3" },
              { case: { $eq: ["$day", 2] }, then: "Thứ 4" },
              { case: { $eq: ["$day", 3] }, then: "Thứ 5" },
              { case: { $eq: ["$day", 4] }, then: "Thứ 6" },
              { case: { $eq: ["$day", 5] }, then: "Thứ 7" },
              { case: { $eq: ["$day", 6] }, then: "Chủ nhật" },
            ],
            default: "",
          },
        },
      },
    },
  ]);
};

export { readTermData, getTermData };
