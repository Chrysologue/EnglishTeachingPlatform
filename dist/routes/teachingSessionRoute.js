"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teachingSessionController_1 = __importDefault(require("../controllers/teachingSessionController"));
const router = express_1.default.Router();
router.get('/', teachingSessionController_1.default.getAllTeachingSessions);
router.post('/', teachingSessionController_1.default.createTeachingSession);
router.get('/:id', teachingSessionController_1.default.getTeachingSessionById);
router.put('/:id', teachingSessionController_1.default.updateTeachingSession);
router.delete('/:id', teachingSessionController_1.default.deleteTeachingSession);
exports.default = router;
