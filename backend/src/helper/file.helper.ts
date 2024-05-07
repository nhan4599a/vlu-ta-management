import readXlsxFile from 'read-excel-file/node'
import { Express } from 'express'

export const readExcelFile = (file: Express.Multer.File) => {
    return readXlsxFile(file.buffer).then(data => data.slice(1))
}