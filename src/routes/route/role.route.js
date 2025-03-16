const express = require('express');
const router = express.Router();
const roleController = require('../../controllers/roles.controlles');


router.get('/', roleController.read);
router.get('/:id', roleController.readById);
router.post('/', roleController.create);
router.put('/:id', roleController.update);
router.delete('/:id', roleController.delete);


module.exports = router;