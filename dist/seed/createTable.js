"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
async function createUsersTable() {
    await db_1.default.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
    await db_1.default.query(`CREATE TABLE IF NOT EXISTS users(
        user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name CHARACTER VARYING(100) NOT NULL,
        email CHARACTER VARYING(100) UNIQUE NOT NULL,
        password VARCHAR NOT NULL,
        english_level VARCHAR(50),
        role VARCHAR(50) NOT NULL DEFAULT 'student',
        is_active BOOLEAN NOT NULL DEFAULT TRUE
        );`);
}
async function createPackageTable() {
    await db_1.default.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
    await db_1.default.query(`CREATE TABLE IF NOT EXISTS packages(
        package_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(100) NOT NULL,
        description VARCHAR NOT NULL,
        level VARCHAR(50) NOT NULL,
        type VARCHAR(50) NOT NULL ,
        duration INT NOT NULL CHECK (duration > 0),
        price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
        is_active BOOLEAN NOT NULL DEFAULT TRUE
        );`);
}
async function createTeachingSessionTable() {
    await db_1.default.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
    await db_1.default.query(`CREATE TABLE IF NOT EXISTS sessions(
        session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        package_id UUID NOT NULL,
        date DATE NOT NULL,
        start_time TIME NOT NULL,
        end_time TIME NOT NULL CHECK (end_time > start_time),
        max_students INT NOT NULL,
        meeting_link VARCHAR,
        status VARCHAR(50) NOT NULL DEFAULT 'scheduled',
        CONSTRAINT pk_fk FOREIGN KEY(package_id) REFERENCES packages(package_id)
        );`);
}
async function createEnrollementTable() {
    await db_1.default.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
    await db_1.default.query(`CREATE TABLE IF NOT EXISTS enrollments(
            enrollment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL,
            session_id UUID NOT NULL,
            status VARCHAR(50) NOT NULL DEFAULT 'pending',
            enrolled_at TIMESTAMP DEFAULT NOW(),
            CONSTRAINT stud_fk FOREIGN KEY (user_id) REFERENCES users(user_id),
            CONSTRAINT sess_fk FOREIGN KEY (session_id) REFERENCES sessions(session_id)
        );`);
}
// async function createPaymentTable(): Promise<void> {
//   await pool.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
//   await pool.query(`CREATE TABLE IF NOT EXISTS payments(
//             payment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//             enrollment_id UUID NOT NULL,
//             amount NUMERIC(10, 2) NOT NULL,
//             payment_method VARCHAR(100) NOT NULL,
//             transaction_reference VARCHAR(100) NOT NULL,
//             status VARCHAR(50) NOT NULL,
//             paid_at TIMESTAMP NOT NULL DEFAULT NOW(),
//             CONSTRAINT enr_fk FOREIGN KEY(enrollment_id) REFERENCES enrollments(enrollment_id)
//         );`);
// }
async function createTable() {
    await createUsersTable();
    await createPackageTable();
    await createTeachingSessionTable();
    await createEnrollementTable();
    // await createPaymentTable();
}
exports.default = createTable;
