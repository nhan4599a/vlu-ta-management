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
import mongoose, { PipelineStage } from "mongoose";
import { Role } from "../../constants/role.enum";

const ValidSemesterTypes = ["HK1", "HK2", "HÈ"];

type TermQuery = PaginationRequest & {
  semester: number | undefined;
  year: number;
  assistantsAvailableOnly: boolean;
  availableJobsOnly: boolean;
};

type TermDataItem = Omit<ITerm, "classes" | "sessions"> &
  Omit<IScheduleDetail, "startLesson" | "endLesson"> & {
    lesson: string;
    classId: string;
  };

type UpdateAttendantUrlRequest = {
  attendantUrl: string;
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
      registrationInfo: null,
      type: "",
      assistants: [],
    });
  }

  return result;
};

const validateTermClassesData = (type: string, cells: Cell[]) => {
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

  const typeData = type.split(constants.DELIMETER.LIST);

  if (typeData.length > 1 && typeData.length < classesCount) {
    throwValidationError("Loại học phần không hợp lệ");
  }

  for (let i = 0; i < classesCount; i++) {
    const className = classesNameList[i];
    const pic = picsList[i];

    const scheduleData = schedulesList[i].split(constants.DELIMETER.LIST_ITEM);
    const schedules = validateScheduleData(scheduleData);

    const termClass = {
      name: className,
      lecture: pic,
      maxStudentsCount: Number(maxStudentsCountStr),
      attendanceRecordFile: null,
      startDate: startDate.toDate(),
      endDate: endDate.toDate(),
      schedule: schedules,
    };

    const currentTypeData = typeData.length === 1 ? typeData[0] : typeData[i];

    const typeForClass =
      typeData.length === 1
        ? typeData[0]
        : currentTypeData.split(constants.DELIMETER.LIST_ITEM);

    if (
      typeData.length !== 1 &&
      typeForClass.length !== 1 &&
      typeForClass.length !== schedules.length
    ) {
      throwValidationError("Loại học phần không hợp lệ");
    }

    for (let i = 0; i < schedules.length; i++) {
      const currentType = typeData.length === 1 ? typeData[0] : typeForClass[i];

      schedules[i].type = currentType;
    }

    result.push(termClass);
  }

  return result;
};

const validateTermData = (rows: Row[]) => {
  const result: ITerm[] = [];

  for (const row of rows) {
    const [
      year,
      semesterTypeStr,
      code,
      name,
      type,
      creditsStr,
      sessionsStr,
      ...restProps
    ] = row;

    if (!isNumber(year)) {
      throwValidationError("Năm học phải là số nguyên");
    }

    const semesterType = ValidSemesterTypes.indexOf(
      semesterTypeStr.toString().toUpperCase()
    );

    if (semesterType === -1) {
      throwValidationError("Học kỳ không hợp lệ");
    }

    if (!isNumber(creditsStr)) {
      throwValidationError("Tín chỉ phải là số nguyên");
    }

    if (!isNumber(sessionsStr)) {
      throwValidationError("Số tiết học phải là số nguyên");
    }

    const termClassesData = validateTermClassesData(type.toString(), restProps);

    result.push({
      year: Number(year),
      semester: semesterType,
      code: code.toString(),
      name: name.toString(),
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
  const { db, query, user } = createTypedRequest<{}, TermQuery>(req);

  const basePipeline: PipelineStage[] = [
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
        classId: "$classes._id",
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
      $addFields: {
        isApproved: {
          $eq: ["$classes.schedule.registrationInfo.approved", true],
        },
        isRegistered: {
          $ne: ["$classes.schedule.registrationInfo", null],
        },
        isWaiting: {
          $eq: ["$classes.schedule.registrationInfo.approved", null],
        },
      },
    },
  ];

  if (user.role === Role.Teacher) {
    basePipeline.push({
      $match: {
        lecture: user.code,
        year: Number(query.year),
      },
    });
  } else if (user.role === Role.Student) {
    basePipeline.push(
      ...[
        {
          $match: {
            isApproved: true,
            year: Number(query.year),
          },
        },
        {
          $lookup: {
            from: "applications",
            localField: "classes.schedule._id",
            foreignField: "scheduleId",
            as: "applications",
            pipeline: [
              {
                $match: {
                  code: user.code,
                },
              },
              {
                $project: {
                  _id: 1,
                  stage1Approval: 1,
                  stage2Approval: 1,
                },
              },
            ],
          },
        },
      ]
    );

    if (query.availableJobsOnly) {
      basePipeline.push(
        ...[
          {
            $match: {
              applications: {
                $size: 0,
              },
            },
          },
        ]
      );
    }
  } else {
    basePipeline.push({
      $match: {
        year: Number(query.year),
      },
    });
  }

  if (query.semester) {
    basePipeline.push({
      $match: {
        semester: Number(query.semester),
      },
    });
  }

  if (query.assistantsAvailableOnly) {
    basePipeline.push({
      $set: {
        assistantsCount: {
          $size: "$assistants",
        },
      },
    });
    basePipeline.push({
      $match: {
        assistantsCount: {
          $gt: 0,
        },
      },
    });
  }

  return paginate<ITerm, TermDataItem>(db.terms, query, [
    ...basePipeline,
    {
      $set: {
        scheduleId: "$classes.schedule._id",
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
        scheduleId: 1,
        isApproved: 1,
        isRegistered: 1,
        isWaiting: 1,
        applications: 1,
        classId: 1,
        attendanceRecordFile: 1,
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

const getAssitantsInfo = (req: Request) => {
  const { db, params, query } = createTypedRequest<{}, PaginationRequest>(req);

  return paginate(db.terms, query, [
    {
      $unwind: {
        path: "$classes",
      },
    },
    {
      $unwind: {
        path: "$classes.schedule",
      },
    },
    {
      $match: {
        "classes.schedule._id": new mongoose.Types.ObjectId(params.classId),
      },
    },
    {
      $set: {
        assistants: {
          $getField: {
            field: "assistants",
            input: "$classes.schedule",
          },
        },
      },
    },
    {
      $unset: ["classes"],
    },
    {
      $lookup: {
        from: "users",
        localField: "assistants",
        foreignField: "code",
        as: "users",
      },
    },
    {
      $project: {
        users: 1,
      },
    },
    {
      $unwind: {
        path: "$users",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ["$users", "$$ROOT"],
        },
      },
    },
    {
      $project: {
        users: 0,
      },
    },
  ]);
};

const getTermClassInfo = async (req: Request) => {
  const { db, params } = createTypedRequest(req);

  const result = await db.terms.aggregate([
    {
      $unwind: {
        path: "$classes",
      },
    },
    {
      $unwind: {
        path: "$classes.schedule",
      },
    },
    {
      $match: {
        "classes.schedule._id": new mongoose.Types.ObjectId(params.classId),
      },
    },
    {
      $set: {
        day: {
          $switch: {
            branches: [
              {
                case: {
                  $eq: ["$classes.schedule.day", 0],
                },
                then: "Thứ 2",
              },
              {
                case: {
                  $eq: ["$classes.schedule.day", 1],
                },
                then: "Thứ 3",
              },
              {
                case: {
                  $eq: ["$classes.schedule.day", 2],
                },
                then: "Thứ 4",
              },
              {
                case: {
                  $eq: ["$classes.schedule.day", 3],
                },
                then: "Thứ 5",
              },
              {
                case: {
                  $eq: ["$classes.schedule.day", 4],
                },
                then: "Thứ 6",
              },
              {
                case: {
                  $eq: ["$classes.schedule.day", 5],
                },
                then: "Thứ 7",
              },
              {
                case: {
                  $eq: ["$classes.schedule.day", 6],
                },
                then: "Chủ nhật",
              },
            ],
            default: "",
          },
        },
      },
    },
    {
      $set: {
        lesson: {
          $concat: [
            {
              $toString: "$classes.schedule.startLesson",
            },
            "-",
            {
              $toString: "$classes.schedule.endLesson",
            },
          ],
        },
      },
    },
    {
      $project: {
        name: 1,
        day: 1,
        lesson: 1,
        _id: 0,
      },
    },
  ]);

  return result[0];
};

const updateAttendantUrl = (req: Request) => {
  const { db, body, params } =
    createTypedRequest<UpdateAttendantUrlRequest>(req);

  const id = new mongoose.Types.ObjectId(params.classId);

  return db.terms.findOneAndUpdate(
    {},
    {
      $set: {
        "classes.$[i].attendanceRecordFile": body.attendantUrl,
      },
    },
    {
      arrayFilters: [
        {
          "i._id": id,
        },
      ],
    }
  );
};

export {
  readTermData,
  getTermData,
  getAssitantsInfo,
  getTermClassInfo,
  updateAttendantUrl,
};
