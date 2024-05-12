import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'

const upload = multer()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'evidences')
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4())
    }
})
const uploadMultiple = multer({
    storage: storage
})

const uploadFileMiddleware = upload.single('file')
const uploadMultipleFilesMiddleware = uploadMultiple.array('files')

export { uploadFileMiddleware, uploadMultipleFilesMiddleware }