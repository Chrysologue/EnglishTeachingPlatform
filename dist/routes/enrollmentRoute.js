"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enrollmentController_1 = __importDefault(require("../controllers/enrollmentController"));
const router = express_1.default.Router();
router.get('/', enrollmentController_1.default.getAllEnrollments);
router.post('/', enrollmentController_1.default.createEnrollment);
router.get('/:id', enrollmentController_1.default.getEnrollmentById);
router.put('/:id', enrollmentController_1.default.updateEnrollment);
router.delete('/:id', enrollmentController_1.default.deleteEnrollment);
exports.default = router;
