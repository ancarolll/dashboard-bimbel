const express = require('express');
const router = express.Router();

const menuController = require('../../controllers/menu.controller');


router.post('/', menuController.create);
router.get('/', menuController.read);
router.get('/:id', menuController.readById);
router.put('/:id', menuController.update);
router.delete('/:id', menuController.delete);



module.exports = router;