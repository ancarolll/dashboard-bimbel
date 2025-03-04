const StudentsHistory = require('../models/students_history.model');

module.exports = {
    read: async (req, res) => {
        try {
            const studentHistory = await StudentsHistory.findAll({});
            if (studentHistory.length <= 0) {
                return res.status(404).json({
                    status: "error",
                    message: "Data not found",
                    data: []
                })
            }

            return res.status(200).json({
                status: "success",
                message: "Data retrieved successfully",
                data: studentHistory
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
            const studentHistory = await StudentsHistory.findByPk(id);
            if (!studentHistory) {
                return res.status(404).json({
                    status: "error",
                    message: "Data not found",
                    data: []
                })
            }

            return res.status(200).json({
                status: "success",
                message: "Data retrieved successfully",
                data: studentHistory
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
    create: async (req, res) => {
        try {
            const studentHistory = await StudentsHistory.create(req.body);
            return res.status(201).json({
                status: "success",
                message: "Data created successfully",
                data: studentHistory
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
            const studentHistory = await StudentsHistory.findByPk(id);
            if (!studentHistory) {
                return res.status(404).json({
                    status: "error",
                    message: "Data not found",
                    data: []
                })
            }

            const updatedStudentHistory = await studentHistory.update(req.body);
            return res.status(200).json({
                status: "success",
                message: "Data updated successfully",
                data: updatedStudentHistory
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
            const studentHistory = await StudentsHistory.findByPk(id);
            if (!studentHistory) {
                return res.status(404).json({
                    status: "error",
                    message: "Data not found",
                    data: []
                })
            }

            await studentHistory.destroy();
            return res.status(204).json({
                status: "success",
                message: "Data deleted successfully",
                data: []
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