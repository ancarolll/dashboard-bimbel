const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const Uploads = require('../../controllers/uploads.controller');

// updaload config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../../public/uploads');
            fs.mkdirSync(dir);
            cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = uuidv4() + ext;
        cb(null, filename);
    }
});

const upload = multer({ storage });

router.post('/', upload.single('file'), Uploads.create);
router.get('/', Uploads.read);
router.get('/:id', Uploads.readById);
router.put('/:id', upload.single('file'), Uploads.update);
router.delete('/:id', Uploads.delete);

module.exports = router;