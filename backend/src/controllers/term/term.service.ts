import { IScheduleDetail, ITerm, ITermClass } from '../../db/models/term'
import moment from 'moment'
import { readExcelFile } from '../../helper/file.helper'
import { Row } from 'read-excel-file'
import { ParseNumberOption, isNumber, throwValidationError } from '../../helper/validation.helper'
import { Cell } from 'read-excel-file/types'
import { constants } from '../../constants'
import { DayInWeek } from '../../constants/day.enum'

const parseNumberOptions: ParseNumberOption = {
    allowDecimal: false,
    allowNegative: false
}

const parseLessonOptions: ParseNumberOption = {
    allowDecimal: false,
    min: 1,
    max: 15
}

const validateScheduleData = (scheduleData: string[]) => {
    const result: IScheduleDetail[] = []

    for (const scheduleStr of scheduleData) {
        const match = scheduleStr.match(/((thứ ([2-7]))|(chủ nhật)) \((\d)-(\d)\)/i)

        if (!match?.length) {
            throwValidationError('Lịch học không hợp lệ')
        }
    
        const dayInWeekStr = match![3]
        const startLessonStr = match![5]
        const endLessonStr = match![6]

        if (!isNumber(startLessonStr, parseLessonOptions)) {
            throwValidationError('Số tiết không hợp lệ')
        }

        if (!isNumber(endLessonStr, parseLessonOptions)) {
            throwValidationError('Số tiết không hợp lệ')
        }

        result.push({
            day: (Number(dayInWeekStr) - 2) || DayInWeek.Sunday,
            startLesson: Number(startLessonStr),
            endLesson: Number(endLessonStr)
        })
    }

    return result
}

const validateTermClassesData = (cells: Cell[]) => {
    const result: ITermClass[] = []

    const [
        classesCountStr,
        classNames,
        schedules,
        startDateStr,
        endDateStr,
        maxStudentsCountStr,
        PICs
    ] = cells

    if (!isNumber(classesCountStr, parseNumberOptions)) {
        throwValidationError('Số lượng lớp không hợp lệ')
    }

    if (!isNumber(maxStudentsCountStr, parseNumberOptions)) {
        throwValidationError('Số lượng sinh viên không hợp lệ')
    }

    const classesCount = Number(classesCountStr)

    const classesNameList = classNames.toString().split(constants.DELIMETER.LIST)
    const schedulesList = schedules.toString().split(constants.DELIMETER.LIST)
    const picsList = PICs.toString().split(constants.DELIMETER.LIST)

    if (classesCount !== classesNameList.length
        || classesCount !== schedulesList.length
        || classesCount !== picsList.length
    ) {
        throwValidationError('Số lượng lớp không đúng')
    }

    const startDate = moment(startDateStr.toString(), constants.FORMAT.DATE.DEFAULT, true)
    if (!startDate.isValid()) {
        throwValidationError('Ngày bắt đầu không hợp lệ')
    }

    const endDate = moment(endDateStr.toString(), constants.FORMAT.DATE.DEFAULT, true)
    if (!endDate.isValid()) {
        throwValidationError('Ngày kết thúc không hợp lệ')
    }

    for (let i = 0; i < classesCount; i++) {
        const className = classesNameList[i]
        const pic = picsList[i]

        const scheduleData = schedulesList[i].split(constants.DELIMETER.LIST_ITEM)
        const schedules = validateScheduleData(scheduleData)

        result.push({
            name: className,
            lecture: pic,
            maxStudentsCount: Number(maxStudentsCountStr),
            registrationInfo: null,
            attendanceRecordFile: null,
            startDate: startDate.toDate(),
            endDate: endDate.toDate(),
            schedule: schedules
        })
    }

    return result
}

const validateTermData = (rows: Row[]) => {
    const result: ITerm[] = []

    for (const row of rows) {
        const [code, name, type, creditsStr, sessionsStr, ...restProps] = row

        if (!isNumber(creditsStr)) {
            throwValidationError('Tín chỉ phải là số nguyên')
        }

        if (!isNumber(sessionsStr)) {
            throwValidationError('Số tiết học phải là số nguyên')
        }

        const termClassesData = validateTermClassesData(restProps)

        result.push({
            code: code.toString(),
            name: name.toString(),
            type: type.toString(),
            credits: Number(creditsStr),
            sessions: Number(sessionsStr),
            classes: termClassesData
        })
    }

    return result
}

const readTermData = async (file: Express.Multer.File): Promise<ITerm[]> => {
    const originalRows = await readExcelFile(file)

    return validateTermData(originalRows)
}

export { readTermData }