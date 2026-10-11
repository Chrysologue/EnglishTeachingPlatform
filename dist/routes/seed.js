"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = seedAll;
const db_1 = __importDefault(require("../config/db"));
async function seedStudentTable() {
    await db_1.default.query(`INSERT INTO students(student_id, name, email, english_level)
        VALUES('4007853a-791f-49f7-a8d5-ec9c7e5cb801', 'Sarah Johnson', 'sarah.johnson@example.com', 'Beginner'),
        ('8bc34d8f-fcd8-4911-af83-eddade0673a1', 'Michael Brown', 'michael.brown@example.com', 'Intermediate')
        ON CONFLICT (student_id) DO NOTHING;
        `);
}
async function seedPackageTable() {
    await db_1.default.query(`INSERT INTO packages(
        package_id, title, description, level, type, duration, price, max_students
        )VALUES
        ('ca2f0b3b-b431-4996-b7db-da9d74440c0a', 'Beginner English Conversation', 
        'Build confidence and improve basic English speaking skills through guided conversation practice.',
        'Beginner', 'group', 60, 10000, 3) ON CONFLICT (package_id) DO NOTHING`);
}
async function seedTeachingSessionTable() {
    await db_1.default.query(`INSERT INTO sessions(
        session_id, package_id, start_time, end_time, max_students, meeting_link, status
        )VALUES(
            '0cc6ff10-439b-40ff-9559-393eeeff2048',
            'ca2f0b3b-b431-4996-b7db-da9d74440c0a',
            '2026-10-10 09:00:00',
            '2026-10-10 10:00:00',
            3,
            'https://meet.example.com/session-001',
            'scheduled'
        ) ON CONFLICT (session_id) DO NOTHING`);
}
async function seedEnrollmentTable() {
    await db_1.default.query(`INSERT INTO enrollments(
        enrollment_id, student_id, session_id, status
        )VALUES
        ('dfed371c-548c-4564-affc-9cc77e272e9c',
        '4007853a-791f-49f7-a8d5-ec9c7e5cb801',
        '0cc6ff10-439b-40ff-9559-393eeeff2048',
        'confirmed'
        ) ON CONFLICT (enrollment_id) DO NOTHING;`);
}
async function seedPaymentTable() {
    await db_1.default.query(`INSERT INTO payments (
            payment_id, enrollment_id, amount, payment_method, transaction_reference, status
        ) VALUES
         ('f46e3d14-4c71-4277-83bb-693982791db5', 'dfed371c-548c-4564-affc-9cc77e272e9c',
         10000, 'mobile-money', 'MM-20260910-002', 'completed'
         ) ON CONFLICT (payment_id) DO NOTHING;`);
}
async function seedAll() {
    await seedStudentTable();
    await seedPackageTable();
    await seedTeachingSessionTable();
    await seedEnrollmentTable();
    await seedPaymentTable();
}
