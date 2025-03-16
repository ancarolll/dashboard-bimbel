const Role = require('../models/role.model');

module.exports = {
    create: async (req, res) => {
        try {
            await Role.create(req.body);
            return res.status(201).json({
                status: "success",
                message: "Role created successfully",
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
            const roles = await Role.findAll({ where: { is_active: true } });
            if(roles.length == 0) {
                return res.status(404).json({
                    status: "error",
                    message: "No roles found",
                    data: []
                }); 
            }
            return res.status(200).json({
                status: "success",
                message: "Roles retrieved successfully",
                data: roles
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
    readById: async (req, res) => {
        try {
            const role = await Role.findByPk(req.params.id);
            if (!role) {
                return res.status(404).json({
                    status: "error",
                    message: "Role not found",
                    data: []
                });
            }
            return res.status(200).json({
                status: "success",
                message: "Role retrieved successfully",
                data: role
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
    update: async (req, res) => {
        try {
            const role = await Role.findByPk(req.params.id);
            if (!role) {
                return res.status(404).json({
                    status: "error",
                    message: "Role not found",
                    data: []
                });
            }
            await role.update(req.body);
            return res.status(200).json({
                status: "success",
                message: "Role updated successfully",
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
    delete: async (req, res) => {
        try {
            const role = await Role.findByPk(req.params.id);
            if (!role) {
                return res.status(404).json({
                    status: "error",
                    message: "Role not found",
                    data: []
                });
            }
            await role.update({ is_active: false });
            return res.status(200).json({
                status: "success",
                message: "Role deleted successfully",
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
}