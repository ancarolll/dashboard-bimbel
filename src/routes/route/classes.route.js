const express = require('express');
const router = express.Router();
const Classes = require('../../controllers/classes.controller');


router.get('/', Classes.read);
router.get('/:id', Classes.readById);
router.post('/', Classes.create);
router.put('/:id', Classes.update);
router.delete('/:id', Classes.delete);

module.exports = router;