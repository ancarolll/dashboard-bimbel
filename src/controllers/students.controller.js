const Students = require('../models/students.model');
const Op = require('sequelize').Op;
const xlxs = require('xlsx');

module.exports = {
    create: async (req, res) => {
        try {
            const student = await Students.create(req.body);
            return res.status(201).json({
                status: "success",
                message: "Student created successfully",
                data: student
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
    import: async (req, res) => {
        try {
            console.log(req.file)
            const file = req.file;
            const data = await new Promise((resolve, reject) => {
                const workbook = xlxs.readFile(file.path);
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = xlxs.utils.sheet_to_json(sheet);
                resolve(jsonData);
            });
            const students = data.map(student => {
                return {
                    name: student.name,
                    class_id: student.class_id,
                    no_id: student.no_id,
                    start_date: student.start_date,
                    end_date: student.end_date,
                    status: student.status
                }
            });
            const createdStudents = await Students.bulkCreate(students);
            return res.status(201).json({
                status: "success",
                message: "Students imported successfully",
                data: createdStudents
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
            const {
                page,
                limit,
                sort,
                order,
                search
            } = req.query;
            const options = {
                page: parseInt(page) || 1,
                limit: parseInt(limit) || 10,
                order: [
                    [sort, order]
                ]
            };
            if (search) {
                options.where = {
                    name: {
                        [Op.like]: `%${search}%`
                    }
                };
            }
            const students = await Students.findAndCountAll(options);
            
            // const student = await Students.findAll({where: {is_active: true}});
            if (students.length <= 0) {
                return res.status(404).json({
                    status: "error",
                    message: "Student not found",
                    data: []
                });
            }

            return res.status(200).json({
                status: "success",
                message: "Student retrieved successfully",
                data: students
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
            const {
                id
            } = req.params;
            const student = await Students.findByPk(id);
            if (!student) {
                return res.status(404).json({
                    status: "error",
                    message: "Student not found",
                    data: []
                });
            }
            return res.status(200).json({
                status: "success",
                message: "Student retrieved successfully",
                data: student
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
            const {
                id
            } = req.params;
            const student = await Students.findByPk(id);
            if (!student) {
                return res.status(404).json({
                    status: "error",
                    message: "Student not found",
                    data: []
                });
            }
            const updatedStudent = await student.update(req.body);
            return res.status(200).json({
                status: "success",
                message: "Student updated successfully",
                data: updatedStudent
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
            const {
                id
            } = req.params;
            const student = await Students.findByPk(id);
            if (!student) {
                return res.status(404).json({
                    status: "error",
                    message: "Student not found",
                    data: []
                });
            }
            await student.update({is_active: false});
            return res.status(200).json({
                status: "success",
                message: "Student deleted successfully",
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
    }
}