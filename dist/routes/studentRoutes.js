"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = __importDefault(require("../controllers/studentController"));
const router = express_1.default.Router();
router.get("/", studentController_1.default.getAllStudents);
router.post("/", studentController_1.default.createStudent);
router.get("/:id", studentController_1.default.getStudentById);
router.put("/:id", studentController_1.default.updateStudent);
router.delete("/:id", studentController_1.default.deleteStudent);
exports.default = router;
