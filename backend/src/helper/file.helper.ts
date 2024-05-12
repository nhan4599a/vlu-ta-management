import readXlsxFile from 'read-excel-file/node'

export const readExcelFile = async (file: Express.Multer.File) => {
    const data = await readXlsxFile(file.buffer)
    return data.slice(1)
}