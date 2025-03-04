const AdminAccounts = require('../models/admin_accounts.model');


module.exports = {
    create: async (req, res) => {
        try {
            const adminAccount = await AdminAccounts.create(req.body);
            return res.status(201).json({
                status: 'success',
                message: 'Admin Account Created',
                data: adminAccount
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
                data: []
            })
        }
    },
    read: async (req, res) => {
        try {
            const adminAccount = await AdminAccounts.findAll({});
            if (adminAccount.length < 0) {
                return res.status(200).json({
                    status: 'failed',
                    message: 'No Admin Account Found',
                    data: []
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Admin Account Retrieved',
                data: adminAccount
            });

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
                data: []
            })
        }
    },
    readById: async (req, res) => {
        try {
            const { id } = req.params;
            const adminAccount = await AdminAccounts.findByPk(id);
            if (!adminAccount) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'Admin Account Not Found',
                    data: []
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Admin Account Retrieved',
                data: adminAccount
            });

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
                data: []
            })
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const adminAccount = await AdminAccounts.findByPk(id);
            if (!adminAccount) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'Admin Account Not Found',
                    data: []
                });
            }

            const updatedAdminAccount = await adminAccount.update(req.body);
            return res.status(200).json({
                status: 'success',
                message: 'Admin Account Updated',
                data: updatedAdminAccount
            });

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
                data: []
            })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const adminAccount = await AdminAccounts.findByPk(id);
            if (!adminAccount) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'Admin Account Not Found',
                    data: []
                });
            }

            await adminAccount.destroy();
            return res.status(200).json({
                status: 'success',
                message: 'Admin Account Deleted',
                data: []
            });

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
                data: []
            })
        }
    }
}