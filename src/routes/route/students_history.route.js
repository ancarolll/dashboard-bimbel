const express = require("express");
const router = express.Router();
const studentHistoryController = require("../../controllers/students_history.controller");


router.post('/', studentHistoryController.create);
router.get("/", studentHistoryController.read);
router.get("/:id", studentHistoryController.readById);
router.put("/:id", studentHistoryController.update);
router.delete("/:id", studentHistoryController.delete);

module.exports = router;
