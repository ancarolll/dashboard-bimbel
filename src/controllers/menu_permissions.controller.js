const MenuPermission = require('../models/menu_permission.model');
const Menu = require('../models/menu.model');
const User = require('../models/users.model');


module.exports = {
    create: async (req, res) => {
        try {
            const menu = await Menu.findByPk(req.body.menu_id);
            if (!menu) {
                return res.status(400).json({
                    status: "failed",
                    message: 'menu not found',
                    data: []
                })
            }

            const user = User.findByPk(req.body.user_id);
            if (!user) {
                return res.status(400).json({
                    status: "failed",
                    message: 'user not found',
                    data: []
                })
            }

            const menuPermisssoin = await MenuPermission.create(req.body);
            return res.status(201).json({
                status: 'success',
                message: 'successfully created menu perrmison',
                data: menuPermisssoin
            });


        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "error",
                message: 'Internal Server Error',
                data: []
            })
        }
    },
    read: async (req, res) => {
        try {
            const menuPermisssoin = await MenuPermission.findAll({});

            if(menuPermisssoin.length <= 0) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'list menu permission not found',
                    data: []
                })
            }

            return res.status(200).json({
                status: 'success',
                message: 'successfully get list menu permission',
                data: menuPermisssoin
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "error",
                message: 'Internal Server Error',
                data: []
            })
        }
    },
    readById: async (req, res) => {
        try {
            const {
                id
            } = req.params;

            const menuPermisssoin = await MenuPermission.findByPk(id);
            if(!menuPermisssoin) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'menu permission not found',
                    data: []
                })
            }

            return res.status(200).json({
                status: 'success',
                message: 'successfully get list menu permission',
                data: menuPermisssoin
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "error",
                message: 'Internal Server Error',
                data: []
            })
        }
    },
    readByUserId: async (req, res) => {
        try {
            const {
                user_id
            } = req.params;

            const menuPermission = await MenuPermission.findAll({
                where: {
                    user_id: user_id
                }
            });

            if(menuPermission.length <= 0) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'menu permission not found',
                    data: []
                })
            }

            return res.status(200).json({
                status: 'success',
                message: 'successfully get list menu permission',
                data: menuPermission
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "error",
                message: 'Internal Server Error',
                data: []
            })
        }
    },
    update: async (req, res) => {
        try {
            const {
                id
            } = req.params;

            const menuPermisssoin = await MenuPermission.findByPk(id);
            if(!menuPermisssoin) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'menu permission not found',
                    data: []
                })
            }

            const menu = await Menu.findByPk(req.body.menu_id);
            if (!menu) {
                return res.status(400).json({
                    status: "failed",
                    message: 'menu not found',
                    data: []
                })
            }

            const user = User.findByPk(req.body.user_id);
            if (!user) {
                return res.status(400).json({
                    status: "failed",
                    message: 'user not found',
                    data: []
                })
            }

            await menuPermisssoin.update(req.body);
            return res.status(200).json({
                status: 'success',
                message: 'successfully update menu permission',
                data: menuPermisssoin
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "error",
                message: 'Internal Server Error',
                data: []
            })
        }
    },
    delete: async (req, res) => {
        try {
            const {
                id
            } = req.params;
            const menuPermisssoin = await MenuPermission.findByPk(id);
            if(!menuPermisssoin) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'menu permission not found',
                    data: []
                })
            }

            await menuPermisssoin.destroy();
            return res.status(200).json({
                status: 'success',
                message: 'successfully delete menu permission',
                data: []
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "error",
                message: 'Internal Server Error',
                data: []
            })
        }
    }
}