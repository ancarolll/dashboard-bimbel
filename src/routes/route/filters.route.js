const express = require('express');
const router = express.Router();
const filterController = require('../../controllers/filters.controller');


router.get('/', filterController.read);
router.get('/:id', filterController.readById);
router.post('/', filterController.create);
router.put('/:id', filterController.update);
router.delete('/:id', filterController.delete);

module.exports = router;
