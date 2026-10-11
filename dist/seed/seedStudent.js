"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
async function createStudentsTable() {
    await db_1.default.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
    await db_1.default.query(`CREATE TABLE IF NOT EXISTS students(
        student_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name CHARACTER VARYING(100) NOT NULL,
        email CHARACTER VARYING(100) UNIQUE NOT NULL,
        english_level VARCHAR(50) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE
        );`);
}
async function createPackageTable() {
    await db_1.default.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
    await db_1.default.query(`CREATE TABLE IF NOT EXISTS packages(
        package_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(100) NOT NULL,
        description VARCHAR NOT NULL,
        level VARCHAR(50) NOT NULL,
        type VARCHAR(50) NOT NULL,
        duration INT NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        max_students INT NOT NULL,
        is_active BOOLEAN DEFAULT TRUE
        );`);
}
async function createTeachingSessionTable() {
    await db_1.default.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
    await db_1.default.query(`CREATE TABLE IF NOT EXISTS sessions(
        session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        package_id UUID NOT NULL,
        date DATE NOT NULL DEFAULT CURRENT_DATE,
        start_time TIMESTAMP NOT NULL,
        end_time TIMESTAMP NOT NULL,
        max_students INT NOT NULL,
        meeting_link VARCHAR,
        status CHARACTER VARYING(50),
        CONSTRAINT pk_fk FOREIGN KEY(package_id) REFERENCES packages(package_id)
        );`);
}
async function createEnrollementTable() {
    await db_1.default.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
    await db_1.default.query(`CREATE TABLE IF NOT EXISTS enrollments(
            enrollment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            student_id UUID NOT NULL,
            session_id UUID NOT NULL,
            status VARCHAR(50),
            enrolled_at TIMESTAMP DEFAULT NOW(),
            CONSTRAINT stud_fk FOREIGN KEY (student_id) REFERENCES students(student_id),
            CONSTRAINT sess_fk FOREIGN KEY (session_id) REFERENCES sessions(session_id)
        );`);
}
async function createPaymentTable() {
    await db_1.default.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
    await db_1.default.query(`CREATE TABLE IF NOT EXISTS payments(
            payment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            enrollment_id UUID NOT NULL,
            amount NUMERIC(10, 2) NOT NULL,
            payment_method VARCHAR(100) NOT NULL,
            transaction_reference VARCHAR(100) NOT NULL,
            status VARCHAR(50) NOT NULL,
            paid_at TIMESTAMP NOT NULL DEFAULT NOW(),
            CONSTRAINT enr_fk FOREIGN KEY(enrollment_id) REFERENCES enrollments(enrollment_id)
        );`);
}
async function createTable() {
    await createStudentsTable();
    await createPackageTable();
    await createTeachingSessionTable();
    await createEnrollementTable();
    await createPaymentTable();
}
exports.default = createTable;
