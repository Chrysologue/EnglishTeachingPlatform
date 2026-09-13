"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enrollments_1 = require("../data/enrollments");
const students_1 = require("../data/students");
const teachingSessions_1 = require("../data/teachingSessions");
const enrollmentController = {
    getAllEnrollments: function (req, res) {
        return res.status(200).json(enrollments_1.enrollments);
    },
    getEnrollmentById: function (req, res) {
        const id = req.params.id;
        const enrollment = enrollments_1.enrollments.find((enrollment) => enrollment.id === id);
        if (!enrollment) {
            return res.status(404).json({
                error: 'Enrollment not found',
            });
        }
        return res.status(200).json(enrollment);
    },
    createEnrollment: function (req, res) {
        const { studentId, sessionId } = req.body;
        if (!studentId || !sessionId) {
            return res.status(400).json({
                error: 'Student ID and session ID are required',
            });
        }
        const student = students_1.students.find((student) => student.id === studentId);
        if (!student) {
            return res.status(404).json({
                error: 'Student not found',
            });
        }
        const session = teachingSessions_1.teachingSessions.find((session) => session.id === sessionId);
        if (!session) {
            return res.status(404).json({
                error: 'Teaching session not found',
            });
        }
        const existingEnrollment = enrollments_1.enrollments.find((enrollment) => enrollment.studentId === studentId &&
            enrollment.sessionId === sessionId &&
            enrollment.status !== 'cancelled');
        if (existingEnrollment) {
            return res.status(409).json({
                error: 'Student is already enrolled in this session',
            });
        }
        const enrolledStudents = enrollments_1.enrollments.filter((enrollment) => enrollment.sessionId === sessionId &&
            (enrollment.status === 'pending' ||
                enrollment.status === 'confirmed'));
        if (enrolledStudents.length >= session.maxStudents) {
            return res.status(409).json({
                error: 'Teaching session is full',
            });
        }
        const id = `enroll-00${enrollments_1.enrollments.length + 1}`;
        const enrollment = {
            id,
            studentId,
            sessionId,
            status: 'pending',
            enrolledAt: new Date().toISOString(),
        };
        enrollments_1.enrollments.push(enrollment);
        return res.status(201).json({
            message: 'Enrollment created successfully',
            enrollment,
        });
    },
    updateEnrollment: function (req, res) {
        const id = req.params.id;
        const enrollment = enrollments_1.enrollments.find((enrollment) => enrollment.id === id);
        if (!enrollment) {
            return res.status(404).json({
                error: 'Enrollment not found',
            });
        }
        const allowedStatuses = [
            'pending',
            'confirmed',
            'cancelled',
            'completed',
        ];
        if (req.body.status &&
            !allowedStatuses.includes(req.body.status)) {
            return res.status(400).json({
                error: 'Invalid enrollment status',
            });
        }
        if (!req.body.status) {
            return res.status(400).json({
                error: 'Status is required for update',
            });
        }
        enrollment.status = req.body.status;
        return res.status(200).json({
            message: 'Enrollment updated successfully',
            enrollment,
        });
    },
    deleteEnrollment: function (req, res) {
        const id = req.params.id;
        const index = enrollments_1.enrollments.findIndex((enrollment) => enrollment.id === id);
        if (index === -1) {
            return res.status(404).json({
                error: 'Enrollment not found',
            });
        }
        enrollments_1.enrollments.splice(index, 1);
        return res.status(200).json({
            message: 'Enrollment deleted successfully',
        });
    },
};
exports.default = enrollmentController;
