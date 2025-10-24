import multer from "multer";

const storage = multer.diskStorage({
    // Set the destination folder where uploaded files will be temporarily stored
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },

    // File naming
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

export const upload = multer({ storage })