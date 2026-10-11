import pool from "../config/db";
import { UserDetails, CreateUser, UpdateUser, UserForLogin } from "../types/user";

export async function findAllUsers(): Promise<UserDetails[]> {
    const result = await pool.query(
        "SELECT user_id, name, email, english_level, role, is_active FROM users"
    );

    return result.rows;
}

export async function findUserById(
    userId: string
): Promise<UserDetails | null> {
    const result = await pool.query(
        `SELECT user_id, name, email, english_level, role, is_active
         FROM users
         WHERE user_id = $1`,
        [userId]
    );

    return result.rows[0] ?? null;
}

export async function createUser(
    user: CreateUser
): Promise<UserDetails> {
    const result = await pool.query(
        `INSERT INTO users (
            name,
            email,
            password,
            english_level,
            role
        )
        VALUES ($1, $2, $3, $4, 'student')
        RETURNING user_id, name, email, english_level, role, is_active`,
        [
            user.name,
            user.email,
            user.password,
            user.english_level ?? null
        ]
    );

    return result.rows[0];
}

export async function updateUser(
    userId: string,
    userUpdates: UpdateUser
): Promise<UserDetails | null> {
    const fields: string[] = [];
    const values: unknown[] = [];

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

    const result = await pool.query(
        `UPDATE users
         SET ${fields.join(", ")}
         WHERE user_id = $${values.length}
         RETURNING user_id, name, email, english_level, role, is_active`,
        values
    );

    return result.rows[0] ?? null;
}

export async function deactivateUser(
    userId: string
): Promise<UserDetails | null> {
    const result = await pool.query(
        `UPDATE users
         SET is_active = FALSE
         WHERE user_id = $1
         RETURNING user_id, name, email, english_level, role, is_active`,
        [userId]
    );

    return result.rows[0] ?? null;
}

export async function findUserByEmail(
  email: string
): Promise<UserForLogin | null> {
  const result = await pool.query<UserForLogin>(
    `SELECT user_id, name, email, password, role, is_active
     FROM users
     WHERE email = $1`,
    [email]
  );

  return result.rows[0] ?? null;
}