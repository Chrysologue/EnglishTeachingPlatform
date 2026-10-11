import { createEnrollment } from "../models/enrollmentModel";
import { Request, Response } from "express";
import { CreateEnrollment,  } from "../types/enrollment";

interface EnrollmentController {
    createEnrollement: (req:Request, res: Response) => Promise<Response>
}


const enrollmentController: EnrollmentController = {
    createEnrollement: async function(req: Request, res: Response){
        try{
            if(!req.user){
                return res.status(401).json({error: "Unauthorized"})
            }
            const studentId = req.user.user_id
            const enrollment : CreateEnrollment = req.body
            const result = await createEnrollment(studentId, enrollment)
            return res.status(201).json(result)

        }catch(err){
            console.error(err)
            return res.status(500).json({error: "Internal server error"})
        }
    }
}

export default enrollmentController