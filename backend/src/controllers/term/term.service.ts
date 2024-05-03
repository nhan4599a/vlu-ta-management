import readXlsxFile from 'read-excel-file/node'
import { IScheduleDetail, ITerm, ITermClass } from '../../db/models/term'
import moment from 'moment'

const parseScheduleData = (scheduleData: string): IScheduleDetail | null => {
    const match = scheduleData.match(/[T,t]hứ (\d) \((\d)-(\d)\)/)

    if (!match?.length) {
        return null
    }

    const dayInWeek = Number(match[1]) - 2
    const startLesson = Number(match[2])
    const endLesson = Number(match[3])

    return {
        day: dayInWeek,
        startLesson,
        endLesson
    }
}

const readTermData = async (file: Express.Multer.File): Promise<ITerm[]> => {
    const originalRows = (await readXlsxFile(file.buffer)).slice(1)

    const data: ITerm[] = originalRows.map(row => {
        const [code, name, type, credits, sessions, ...restProps] = row

        const [
            classesCount,
            classNames,
            schedules,
            startDate,
            endDate,
            maxStudentsCount,
            PICs
        ] = restProps

        const classes: ITermClass[] = []

        const classesNameList = classNames.toString().split(';')
        const picsList = PICs.toString().split(';')
        const schedulesData = schedules.toString().split(';')

        for (let i = 0; i < Number(classesCount); i++) {
            const classSchedules = schedulesData[i].split(',')

            const schedules = [...classSchedules].map(parseScheduleData)

            if (schedules.some(item => item === null)) {
                throw new Error('')
            }

            classes.push({
                lecture: picsList[i],
                name: classesNameList[i],
                startDate: moment(startDate.toString(), 'dd/MM/yyyy').toDate(),
                endDate: moment(endDate.toString(), 'dd/MM/yyyy').toDate(),
                attendanceRecordFile: null,
                maxStudentsCount: Number(maxStudentsCount),
                schedule: schedules as IScheduleDetail[]
            })
        }

        return {
            code: code.toString(),
            name: name.toString(),
            type: type.toString(),
            credits: Number(credits),
            sessions: Number(sessions),
            classes
        }
    })

    return data
}

export { readTermData }