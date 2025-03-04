const Users = require('../models/users.model');
const bcrypt = require('bcrypt');
module.exports = {
    create: async (req, res) => {
        try {
            const users = await Users.create(req.body);

            return res.status(201).json({
                status: "success",
                message: "User created successfully",
                data: users
            })
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
            const users = await Users.findAll({});
            if (users.length <= 0) {
                return res.status(404).json({
                    status: "error",
                    message: "User not found",
                    data: []
                })
            }

            return res.status(200).json({
                status: "success",
                message: "User retrieved successfully",
                data: users
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "error",
                message: "Internal Server Error",
                data: []
            })
        }
    },
    readById: async (req, res) => {
        try {
            const { id } = req.params;
            const users = await Users.findByPk(id);
            if (!users) {
                return res.status(404).json({
                    status: "error",
                    message: "User not found",
                    data: []
                })
            }

            return res.status(200).json({
                status: "success",
                message: "User retrieved successfully",
                data: users
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "error",
                message: "Internal Server Error",
                data: []
            })
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const users = await Users.findByPk(id);
            if (!users) {
                return res.status(404).json({
                    status: "error",
                    message: "User not found",
                    data: []
                })
            }

            const updatedUsers = await Users.update(req.body, {
                where: { id: id }
            });

            return res.status(200).json({
                status: "success",
                message: "User updated successfully",
                data: updatedUsers
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "error",
                message: "Internal Server Error",
                data: []
            })
        }
    },
    delete: async (req, res) => { 
        try {
            const { id } = req.params;
            const users = await Users.findByPk(id);
            if (!users) {
                return res.status(404).json({
                    status: "error",
                    message: "User not found",
                    data: []
                })
            }

            const deletedUsers = await Users.destroy({
                where: { id: id }
            });

            return res.status(200).json({
                status: "success",
                message: "User deleted successfully",
                data: deletedUsers
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "error",
                message: "Internal Server Error",
                data: []
            })
        }
    }
}