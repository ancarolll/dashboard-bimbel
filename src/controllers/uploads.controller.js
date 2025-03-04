const Uploads = require('../models/uploads.model');
const path = require('path');
const fs = require('fs'); 

module.exports = {
    create: async (req, res) => {
        try {
            const file = req.file;
            console.log(file)
            if (!file) {
                return res.status(400).json({
                    status: "error",
                    message: "File tidak ditemukan",
                    data: []
                })
            }

            // check if jpeg jpg or png
            if (!file.mimetype.startsWith('image/')) {
                return res.status(400).json({
                    status: "error",
                    message: "File harus berformat jpeg, jpg, atau png",
                    data: []
                })
            }

            // check size di bawah 3 mb
            if (file.size > 3 * 1024 * 1024) {
                return res.status(400).json({
                    status: "error",
                    message: "Ukuran file maksimal 3 mb",
                    data: []
                }) 
            }

            const fileExt = path.extname(file.filename);
            const fileName = `${Date.now()}${fileExt}`;
            const filePath = path.join(__dirname, `../../public/uploads/${fileName}`);
            fs.renameSync(file.path, filePath);
            req.body.image_path = `uploads/${fileName}`;
            const uploads = await Uploads.create(req.body);
            return res.status(201).json({
                status: "success",
                message: "Upload Berhasil",
                data: uploads
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
            const uploads = await Uploads.findAll({});
            return res.status(200).json({
                status: "success",
                message: "Upload Berhasil",
                data: uploads
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
            const uploads = await Uploads.findByPk(id);
            if (!uploads) {
                return res.status(404).json({
                    status: "error",
                    message: "Upload tidak ditemukan",
                    data: []
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Upload Berhasil",
                data: uploads
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
            const { file } = req.files;
            const uploads = await Uploads.findByPk(id);
            if (!uploads) {
                return res.status(404).json({
                    status: "error",
                    message: "Upload tidak ditemukan",
                    data: []
                })
            }
            const updatedUploads = await uploads.update(req.body, {
                where: { id },
                returning: true,
                plain: true
            });
            return res.status(200).json({
                status: "success",
                message: "Upload Berhasil Diupdate",
                data: updatedUploads[1]
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
            const uploads = await Uploads.findByPk(id);
            if (!uploads) {
                return res.status(404).json({
                    status: "error",
                    message: "Upload tidak ditemukan",
                    data: []
                })
            }
            await uploads.destroy();
            return res.status(200).json({
                status: "success",
                message: "Upload Berhasil Dihapus",
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