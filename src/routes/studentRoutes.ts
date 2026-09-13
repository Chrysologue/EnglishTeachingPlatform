import express from 'express'
import studentController from '../controllers/studentController'

const router = express.Router()

router.get("/", studentController.getAllStudents)
router.post("/", studentController.createStudent)
router.get("/:id", studentController.getStudentById)
router.put("/:id", studentController.updateStudent)
router.delete("/:id", studentController.deleteStudent)

export default router