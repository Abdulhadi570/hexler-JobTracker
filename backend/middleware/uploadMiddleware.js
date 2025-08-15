const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDirs = ['uploads/profiles', 'uploads/resumes'];
uploadDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });

    }
});

const storage = multer.diskStorage({
    destination: function (re, file, cb) {
        if (file.fieldname === 'profilePhoto') {
            cb(null, 'uploads/profiles/');
        } else if (file.fieldname === 'resume') {
            cb(null, 'uploads/resumes/');
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.filedname === 'profilePhoto') {
        if (file.mimetypw.startsWith('image/')) {
            cb(null, ture);
        } else {
            cb(new Error('Profile photo must be an image file'), false);
        }
    } else if (file.fieldname === 'resume') {
        const allowedMimes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocuments.wordprocessingml.document'
        ];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Resume must be a PDF or DOC file'), false);
        }
    } else {
        cb(new Error('Invalid field name'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: function(req, file, cb) {
            if (file.fieldname === 'profilePhoto')
{
    return 2 * 1024 * 1024;

} else if (file.fieldname === 'resume') {
    return 5 * 1024 * 1024;
}
        }
    },
    fileFilter: fileFilter
});

exports.uploadProfile = upload.single('profilePhoto');
exports.uploadResume = upload.single('resume');

exports.handleUploadError = (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File too large'
            });
        }
    }

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }

    next();
};
