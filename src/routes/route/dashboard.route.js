const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const UploadController = require('../../controllers/uploads.controller');

const verifyPermission = require('../../middlewares/verify_permission');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../../public/uploads/'));
        },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post(
    '/upload', 
    verifyPermission,
    upload.single('file'), 
    UploadController.create
);


module.exports = router;