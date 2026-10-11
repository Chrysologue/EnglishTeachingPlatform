import pool from "../config/db";
import { CreateLessonPackage, UpdatePackage, LessonPackage } from "../types/package";

export async function getAllPackages() : Promise<LessonPackage []> {
    const results = await pool.query(`SELECT * FROM packages;`)
    return results.rows
}

export async function getPackageById(id: string) : Promise<LessonPackage> {
    const result = await pool.query(`SELECT * FROM packages WHERE package_id=$1`, [id])
    return result.rows[0]
}

export async function createPackage(lessonPackage: CreateLessonPackage): Promise<LessonPackage> {
    const result = await pool.query(`
        INSERT INTO packages(
            title,
            description,
            level,
            type,
            duration,
            price
        )VALUES($1, $2, $3, $4, $5, $6) RETURNING *
        `, [lessonPackage.title, lessonPackage.description, lessonPackage.level, lessonPackage.type, lessonPackage.duration, lessonPackage.price])
        return result.rows[0]
}

export async function updatePackage(id: string, lessonPackage: UpdatePackage) : Promise<LessonPackage | null> {
    const fields : string [] = []
    const values: unknown [] = []

    if(lessonPackage.title !== undefined){
        values.push(lessonPackage.title)
        fields.push(`title=$${values.length}`)
    }
    if(lessonPackage.description !== undefined){
        values.push(lessonPackage.description)
        fields.push(`description=$${values.length}`)
    }
    if(lessonPackage.level !== undefined){
        values.push(lessonPackage.level)
        fields.push(`level=$${values.length}`)
    }
    if(lessonPackage.type !== undefined){
        values.push(lessonPackage.type)
        fields.push(`type=$${values.length}`)
    }
    if(lessonPackage.duration !== undefined){
        values.push(lessonPackage.duration)
        fields.push(`duration=$${values.length}`)
    }
    if(lessonPackage.price !== undefined){
        values.push(lessonPackage.price)
        fields.push(`price=$${values.length}`)
    }

    if(fields.length === 0){
        return null
    }
    values.push(id)

    const result = await pool.query(`
        UPDATE packages
        SET ${fields.join(", ")}
        WHERE package_id =$${values.length}
        RETURNING *
         `, values)
         return result.rows[0]
}

export async function deleteLessonPackage(id: string) : Promise<LessonPackage | null> {
    const result = await pool.query(`
            DELETE FROM packages
            WHERE package_id=$1
            RETURNING *
        `, [id])
        return result.rows[0]
}