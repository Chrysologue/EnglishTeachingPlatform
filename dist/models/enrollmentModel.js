"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEnrollment = createEnrollment;
const db_1 = __importDefault(require("../config/db"));
async function createEnrollment(studentId, enrollment) {
    const result = await db_1.default.query(`
            INSERT INTO enrollments(user_id, session_id)
            VALUES($1, $2) RETURNING *
        `, [studentId, enrollment.session_id]);
    return result.rows[0];
}
