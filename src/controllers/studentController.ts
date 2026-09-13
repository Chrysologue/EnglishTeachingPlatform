import { students } from '../data/students';
import { Student, CreateStudent } from '../types/student';
import { Request, Response } from 'express';

interface StudenController {
  getAllStudents: (req: Request, res: Response) => Response;
  getStudentById: (req: Request, res: Response) => Response;
  createStudent: (req: Request, res: Response) => Response;
  updateStudent: (req: Request, res: Response) => Response;
  deleteStudent: (req: Request, res: Response) => Response;
}

const studentController: StudenController = {
  getAllStudents: function (req: Request, res: Response) {
    return res.status(200).json(students);
  },
  getStudentById: function (req: Request, res: Response) {
    const id = req.params.id;
    const student = students.find((stud) => stud.id === id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    return res.status(200).json(student);
  },
  createStudent: function (req: Request<{}, {}, CreateStudent>, res: Response) {
    const { name, email, englishLevel } = req.body;
    if (!name || !email || !englishLevel) {
      return res.status(400).json({ error: 'All field are required' });
    }
    const id = `stu-00${students.length + 1}`;
    const student: Student = {
      id,
      name,
      email,
      englishLevel,
      isActive: true,
    };

    students.push(student);
    return res
      .status(201)
      .json({ message: 'Student created successfully', student });
  },
  updateStudent: function (req: Request, res: Response) {
    const allowedField = ['name', 'englishLevel'];

    const updatedStudent: { [key: string]: string } = {};

    for (const field of allowedField) {
      if (req.body[field] !== undefined) {
        updatedStudent[field] = req.body[field];
      }
    }

    const id = req.params.id;

    const student = students.find((stud) => stud.id === id);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    console.log(student)

    if (Object.keys(updatedStudent).length === 0) {
      return res.status(400).json({
        error: 'No valid fields provided for update',
      });
    }

    Object.assign(student, updatedStudent);

    return res.status(200).json({
      message: 'Student updated successfully',
      student,
    });
  },
  deleteStudent: function(req:Request, res:Response){
    const id = req.params.id
    const index = students.findIndex(stud => stud.id === id)
    if(index === -1){
        return res.status(404).json({error: "Student not found"});
    }
    students.splice(index, 1)

    return res.status(200).json({message: "Student deleted successfully"})
}
};

export default studentController;
