import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import { getFileExtension } from './file.helper'

const upload = multer()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, `${uuidv4()}.${getFileExtension(file.originalname)}`)
    }
})
const uploadMultiple = multer({
    storage: storage
})

const uploadFileMiddleware = upload.single('file')
const uploadMultipleFilesMiddleware = uploadMultiple.array('files')

export const mapAttachment = (file: Express.Multer.File) => {
    return {
        savedFileName: file.filename,
        originalFileName: Buffer.from(file.originalname, 'latin1').toString('utf8')
    }
}

export { uploadFileMiddleware, uploadMultipleFilesMiddleware }