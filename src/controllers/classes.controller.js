const Classes = require('../models/classess.model');

module.exports = {
    read: async (req, res) => { 
        try {
            const classes = await Classes.findAll({});
            if(classes.length <= 0) {
                return res.status(404).json({
                    status: "error",
                    message: "Classes not found",
                    data: []
                })
            }

            return res.status(200).json({
                status: "success",
                message: "Classes retrieved successfully",
                data: classes
            })

        }catch(error) {
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
            const classes = await Classes.findByPk(id);
            if(!classes) {
                return res.status(404).json({
                    status: "error",
                    message: "Classes not found",
                    data: []
                })
            }

            return res.status(200).json({
                status: "success",
                message: "Classes retrieved successfully",
                data: classes
            })

        }catch(error) {
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
            const classes = await Classes.create(req.body);
            return res.status(201).json({
                status: "success",
                message: "Classes created successfully",
                data: classes
            })

        }catch(error) {
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
            const classes = await Classes.findByPk(id);
            if(!classes) {
                return res.status(404).json({
                    status: "error",
                    message: "Classes not found",
                    data: []
                })
            }

            const updatedClasses = await classes.update(req.body);
            return res.status(200).json({
                status: "success",
                message: "Classes updated successfully",
                data: updatedClasses
            })

        }catch(error) {
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
            const classes = await Classes.findByPk(id);
            if(!classes) {
                return res.status(404).json({
                    status: "error",
                    message: "Classes not found",
                    data: []
                })
            }

            await classes.destroy();
            return res.status(200).json({
                status: "success",
                message: "Classes deleted successfully",
                data: []
            })

        }catch(error) {
            console.log(error);
            return res.status(500).json({
                status: "error",
                message: "Internal Server Error",
                data: []
            })
        }
    }
}