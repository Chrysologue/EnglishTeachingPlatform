import pool from "../config/db";
import { Enrollment, CreateEnrollment } from "../types/enrollment";

export async function  createEnrollment(studentId: string, enrollment: CreateEnrollment) : Promise<Enrollment> {
    const result = await pool.query(`
            INSERT INTO enrollments(user_id, session_id)
            VALUES($1, $2) RETURNING *
        `, [studentId, enrollment.session_id])

        return result.rows[0]
}
