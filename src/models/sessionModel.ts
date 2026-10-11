import pool from "../config/db";
import { CreateTeachingSession, TeachingSession, UpdateTeachingSession, SessionWithPackage } from "../types/teachingSession";

export async function getAllTeachingSession(): Promise<SessionWithPackage[]> {
  const results = await pool.query<SessionWithPackage>(`
    SELECT
      s.session_id,
      s.date,
      s.start_time,
      s.end_time,
      s.max_students,
      s.meeting_link,
      s.status,
      p.title,
      p.description,
      p.level,
      p.type,
      p.duration,
      p.price
    FROM sessions AS s
    INNER JOIN packages AS p
      ON s.package_id = p.package_id
  `);

  return results.rows;
}

export async function getSessionById(id: string): Promise<SessionWithPackage | null> {
    const result = await pool.query<SessionWithPackage>(`
           SELECT
      s.session_id,
      s.date,
      s.start_time,
      s.end_time,
      s.max_students,
      s.meeting_link,
      s.status,
      p.title,
      p.description,
      p.level,
      p.type,
      p.duration,
      p.price
    FROM sessions AS s
    INNER JOIN packages AS p
      ON s.package_id = p.package_id
            WHERE session_id=$1
        `, [id])
        return result.rows[0]
}

export async function createSession( session: CreateTeachingSession) : Promise<TeachingSession> {
    const result = await pool.query(`
            INSERT INTO sessions(
                package_id,
                date,
                start_time,
                end_time,
                max_students,
                meeting_link
            )VALUES($1, $2, $3, $4, $5, $6) RETURNING *
        `, [session.package_id,
            session.date,
            session.start_time,
            session.end_time,
            session.max_students,
            session.meeting_link
        ])

        return result.rows[0]
}

export async function updateSession(id: string, session: UpdateTeachingSession) : Promise<TeachingSession | null> {
    const fields : string[] = []
    const values : unknown[] = []
    if(session.date !== undefined){
        values.push(session.date)
        fields.push(`date=$${values.length}`)
    }
    if(session.start_time !== undefined){
        values.push(session.start_time)
        fields.push(`start_time=$${values.length}`)
    }
    if(session.end_time !== undefined){
        values.push(session.end_time)
        fields.push(`end_time=$${values.length}`)
    }
    if(session.max_students !== undefined){
        values.push(session.max_students)
        fields.push(`max_students=$${values.length}`)
    }
    if(session.meeting_link !== undefined){
        values.push(session.meeting_link)
        fields.push(`meeting_link=$${values.length}`)
    }
    if(session.status !== undefined){
        values.push(session.status)
        fields.push(`status=$${values.length}`)
    }

    if(fields.length === 0){
        return null
    }
    values.push(id)

    const result = await pool.query(`
            UPDATE sessions
            SET ${fields.join(", ")} 
            WHERE session_id = $${values.length} RETURNING *
        `, values)

    return result.rows[0]
}

export async function cancelSession(id: string) : Promise<TeachingSession | null> {
    const result = await pool.query<TeachingSession>(`
            UPDATE sessions
            SET status=$1
            WHERE session_id=$2 RETURNING *
        `, ['cancelled', id])

    return result.rows[0] ?? null
}