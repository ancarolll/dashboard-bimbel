const Filters = require('../models/filters.model');

module.exports = {
    read: async (req, res) => {
        try {
            const filters = await Filters.findAll({});
            if (filters.length <= 0) {
                return res.status(404).json({
                    status: "error",
                    message: "Data not found",
                    data: []
                })
            }

            return res.status(200).json({
                status: "success",
                message: "Data retrieved successfully",
                data: filters
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
            const filter = await Filters.findByPk(id);
            if (!filter) {
                return res.status(404).json({
                    status: "error",
                    message: "Data not found",
                    data: []
                })
            }

            return res.status(200).json({
                status: "success",
                message: "Data retrieved successfully",
                data: filter
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
            const filters = await Filters.create(req.body);
            return res.status(201).json({
                status: "success",
                message: "Data created successfully",
                data: filters
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
            const filter = await Filters.findByPk(id);
            if (!filter) {
                return res.status(404).json({
                    status: "error",
                    message: "Data not found",
                    data: []
                })
            }

            const updatedFilter = await filter.update(req.body);
            return res.status(200).json({
                status: "success",
                message: "Data updated successfully",
                data: updatedFilter
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
            const filter = await Filters.findByPk(id);
            if (!filter) {
                return res.status(404).json({
                    status: "error",
                    message: "Data not found",
                    data: []
                })
            }

            await filter.destroy();
            return res.status(200).json({
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