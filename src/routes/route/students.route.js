const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const multer = require('multer');

const studentsController = require('../../controllers/students.controller');


// import exlsx to database
const storageExcel = multer.diskStorage({
    destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../../../public/uploads');
            if(!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = uuidv4() + ext;
        cb(null, filename);
    }
});

const uploadExcel = multer({ storage: storageExcel });

router.get('/', studentsController.read);
router.get('/:id', studentsController.readById);
router.post('/', studentsController.create);
router.post('/import/student', uploadExcel.single('file_excel'), studentsController.import);
router.put('/:id', studentsController.update);
router.delete('/:id', studentsController.delete);

module.exports = router;