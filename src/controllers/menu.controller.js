const Menu = require('../models/menu.model');

module.exports = {
    create: async (req, res) => {
        try {
            await Menu.create(req.body);
            return res.status(201).json({
                status: "success",
                message: "successfully created menu",
                data: []
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "error",
                message: "Internal Server Error",
                data: []
            })
        }
    },
    read: async (req, res) => {
        try {
            const menus = await Menu.findAll({});
            if (menus.length <= 0) {
                return res.status(400).json({
                    status: "failed",
                    message: "menu not found",
                    data: []
                })
            }

            return res.status(200).json({
                status: "success",
                message: "data menu found",
                data: menus
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "error",
                message: "Internal Server Error",
                data: []
            });
        }
    },
    readById: async (req, res) => {
        try {
            const {
                id
            } = req.params;
            const menu = await Menu.findByPk(id);
            if (!menu) {
                return res.status(400).json({
                    status: "failed",
                    message: "menu not found",
                    data: []
                })
            }

            return res.status(200).json({
                status: "success",
                message: "menu found",
                data: menu
            })
        } catch (error) {
            console.log(error);
            return res.json({
                status: "error",
                message: "Internal Server Error",
                data: []
            })
        }
    },
    update: async (req, res) => {
        try {
            const {
                id
            } = req.params;

            const menu = await Menu.findByPk(id);
            if (!menu) {
                return res.status(400).json({
                    status: "failed",
                    message: "menu not found",
                    data: []
                })
            }

            const updateMenu = await Menu.update(req.body, {
                where: { id: id }
            });

            if (updateMenu) {
                return res.status(200).json({
                    status: "success",
                    message: "successfully update menu",
                    data: updateMenu
                })
            }


        } catch (error) {
            console.log(error);
            return res.json({
                status: "error",
                message: "Internal Server Error",
                data: []
            })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const menu = await Menu.findByPk(id);
            if (!menu) {
                return res.status(404).json({
                    status: "error",
                    message: "Menu not found",
                    data: []
                })
            }

            await menu.destroy();
            return res.status(200).json({
                status: "success",
                message: "Menu deleted successfully",
                data: []
            })
        } catch (error) {
            console.log(error);
            return res.json({
                status: "error",
                message: "Internal Server Error",
                data: []
            })
        }
    }
}