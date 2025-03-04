const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users.controller');
const menuPermissionController = require('../../controllers/menu_permissions.controller');


router.get('/', userController.read);
router.get('/:id', userController.readById);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

router.post(
    '/permission/menu', 
    menuPermissionController.create
)

module.exports = router;