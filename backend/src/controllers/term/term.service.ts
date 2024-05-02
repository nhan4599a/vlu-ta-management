import readXlsxFile from 'read-excel-file/node'
import { IScheduleDetail, ITerm, ITermClass } from '../../db/models/term'

const parseScheduleData = (scheduleData: string): IScheduleDetail | null => {
    const match = scheduleData.match(/[T,t]hứ (\d) \((\d)-(\d)\)/g)

    if (!match) {
        return null
    }

    const dayInWeek = Number(match[1]) - 1
    const startLesson = Number(match[2])
    const endLesson = Number(match[3])

    return {
        day: dayInWeek,
        startLesson,
        endLesson
    }
}

const readTermData = async (file: Express.Multer.File): Promise<ITerm[]> => {
    const originalRows = await readXlsxFile(file.buffer)

    const data: ITerm[] = originalRows.map(row => {
        const [code, name, type, credits,, ...restProps] = row

        const [, schedules, startDate, endDate, PICs] = restProps

        const classes: ITermClass[] = []

        const picsList = PICs.toString().split(';')
        const schedulesData = schedules.toString().split(';')

        for (let i = 0; i < picsList.length; i++) {
            const classSchedules = schedulesData[i].split(',')

            const schedules = [...classSchedules].map(parseScheduleData)

            if (schedules) {
                throw new Error('')
            }

            classes.push({
                PIC: picsList[i],
                startDate: new Date(startDate.toString()),
                endDate: new Date(endDate.toString()),
                attendanceRecordFile: null,
                schedule: schedules
            })
        }

        return {
            code: code.toString(),
            name: name.toString(),
            type: type.toString(),
            credits: Number(credits),
            classes
        }
    })

    return data
}

export { readTermData }