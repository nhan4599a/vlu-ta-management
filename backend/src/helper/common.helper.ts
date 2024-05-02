import multer from 'multer'

const upload = multer()

const uploadFileMiddleware = upload.single('file')

export { uploadFileMiddleware }