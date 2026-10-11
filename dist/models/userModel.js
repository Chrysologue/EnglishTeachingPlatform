"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllUsers = findAllUsers;
exports.findUserById = findUserById;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deactivateUser = deactivateUser;
exports.findUserByEmail = findUserByEmail;
const db_1 = __importDefault(require("../config/db"));
async function findAllUsers() {
    const result = await db_1.default.query("SELECT user_id, name, email, english_level, role, is_active FROM users");
    return result.rows;
}
async function findUserById(userId) {
    const result = await db_1.default.query(`SELECT user_id, name, email, english_level, role, is_active
         FROM users
         WHERE user_id = $1`, [userId]);
    return result.rows[0] ?? null;
}
async function createUser(user) {
    const result = await db_1.default.query(`INSERT INTO users (
            name,
            email,
            password,
            english_level,
            role
        )
        VALUES ($1, $2, $3, $4, 'student')
        RETURNING user_id, name, email, english_level, role, is_active`, [
        user.name,
        user.email,
        user.password,
        user.english_level ?? null
    ]);
    return result.rows[0];
}
async function updateUser(userId, userUpdates) {
    const fields = [];
    const values = [];
    if (userUpdates.name !== undefined) {
        values.push(userUpdates.name);
        fields.push(`name = $${values.length}`);
    }
    if (userUpdates.email !== undefined) {
        values.push(userUpdates.email);
        fields.push(`email = $${values.length}`);
    }
    if (userUpdates.english_level !== undefined) {
        values.push(userUpdates.english_level);
        fields.push(`english_level = $${values.length}`);
    }
    if (fields.length === 0) {
        return null;
    }
    values.push(userId);
    const result = await db_1.default.query(`UPDATE users
         SET ${fields.join(", ")}
         WHERE user_id = $${values.length}
         RETURNING user_id, name, email, english_level, role, is_active`, values);
    return result.rows[0] ?? null;
}
async function deactivateUser(userId) {
    const result = await db_1.default.query(`UPDATE users
         SET is_active = FALSE
         WHERE user_id = $1
         RETURNING user_id, name, email, english_level, role, is_active`, [userId]);
    return result.rows[0] ?? null;
}
async function findUserByEmail(email) {
    const result = await db_1.default.query(`SELECT user_id, name, email, password, role, is_active
     FROM users
     WHERE email = $1`, [email]);
    return result.rows[0] ?? null;
}
