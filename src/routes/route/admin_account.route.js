const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin_account.controller');

router.post('/', adminController.create);
router.get('/', adminController.read);
router.get('/:id', adminController.readById);
router.put('/:id', adminController.update);
router.delete('/:id', adminController.delete);


module.exports = router;
