import multer from 'multer';

import { validateImageFormat } from '../validations';

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "public")
    },
    filename(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname)
    }
})

const fileFilterOptions = (cb: any, mimetype: string) => {

    const isFormatValid = validateImageFormat.test(mimetype)

    if (isFormatValid) {
        cb(null, true)
    } else {
        cb("File format is not valid")
    }

}

export const upload = multer({
    storage,
    fileFilter(req, file, cb) {
        fileFilterOptions(cb, file.mimetype)
    },
    limits: {
        fieldSize: 1000 * 1000
    }
})