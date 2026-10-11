"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPackages = getAllPackages;
exports.getPackageById = getPackageById;
exports.createPackage = createPackage;
exports.updatePackage = updatePackage;
exports.deleteLessonPackage = deleteLessonPackage;
const db_1 = __importDefault(require("../config/db"));
async function getAllPackages() {
    const results = await db_1.default.query(`SELECT * FROM packages;`);
    return results.rows;
}
async function getPackageById(id) {
    const result = await db_1.default.query(`SELECT * FROM packages WHERE package_id=$1`, [id]);
    return result.rows[0];
}
async function createPackage(lessonPackage) {
    const result = await db_1.default.query(`
        INSERT INTO packages(
            title,
            description,
            level,
            type,
            duration,
            price,
        )VALUES($1, $2, $3, $4, $5, $6) RETURNING *
        `, [lessonPackage.title, lessonPackage.description, lessonPackage.level, lessonPackage.type, lessonPackage.duration, lessonPackage.price]);
    return result.rows[0];
}
async function updatePackage(id, lessonPackage) {
    const fields = [];
    const values = [];
    if (lessonPackage.title !== undefined) {
        values.push(lessonPackage.title);
        fields.push(`title=$${values.length}`);
    }
    if (lessonPackage.description !== undefined) {
        values.push(lessonPackage.description);
        fields.push(`description=$${values.length}`);
    }
    if (lessonPackage.level !== undefined) {
        values.push(lessonPackage.level);
        fields.push(`level=$${values.length}`);
    }
    if (lessonPackage.type !== undefined) {
        values.push(lessonPackage.type);
        fields.push(`type=$${values.length}`);
    }
    if (lessonPackage.duration !== undefined) {
        values.push(lessonPackage.duration);
        fields.push(`duration=$${values.length}`);
    }
    if (lessonPackage.price !== undefined) {
        values.push(lessonPackage.price);
        fields.push(`price=$${values.length}`);
    }
    if (fields.length === 0) {
        return null;
    }
    values.push(id);
    const result = await db_1.default.query(`
        UPDATE packages
        SET ${fields.join(", ")}
        WHERE package_id =$${values.length}
        RETURNING *
         `, values);
    return result.rows[0];
}
async function deleteLessonPackage(id) {
    const result = await db_1.default.query(`
            DELETE FROM packages
            WHERE package_id=$1
            RETURNING *
        `, [id]);
    return result.rows[0];
}
