"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const students_1 = require("../data/students");
const studentController = {
    getAllStudents: function (req, res) {
        return res.status(200).json(students_1.students);
    },
    getStudentById: function (req, res) {
        const id = req.params.id;
        const student = students_1.students.find((stud) => stud.id === id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        return res.status(200).json(student);
    },
    createStudent: function (req, res) {
        const { name, email, englishLevel } = req.body;
        if (!name || !email || !englishLevel) {
            return res.status(400).json({ error: 'All field are required' });
        }
        const id = `stu-00${students_1.students.length + 1}`;
        const student = {
            id,
            name,
            email,
            englishLevel,
            isActive: true,
        };
        students_1.students.push(student);
        return res
            .status(201)
            .json({ message: 'Student created successfully', student });
    },
    updateStudent: function (req, res) {
        const allowedField = ['name', 'englishLevel'];
        const updatedStudent = {};
        for (const field of allowedField) {
            if (req.body[field] !== undefined) {
                updatedStudent[field] = req.body[field];
            }
        }
        const id = req.params.id;
        const student = students_1.students.find((stud) => stud.id === id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        console.log(student);
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
    deleteStudent: function (req, res) {
        const id = req.params.id;
        const index = students_1.students.findIndex(stud => stud.id === id);
        if (index === -1) {
            return res.status(404).json({ error: "Student not found" });
        }
        students_1.students.splice(index, 1);
        return res.status(200).json({ message: "Student deleted successfully" });
    }
};
exports.default = studentController;
