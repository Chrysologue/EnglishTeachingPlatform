import { Request, Response } from 'express';
import { enrollments } from '../data/enrollments';
import { students } from '../data/students';
import { teachingSessions } from '../data/teachingSessions';
import {
  Enrollment,
  CreateEnrollment,
} from '../types/enrollment';

interface EnrollmentController {
  getAllEnrollments: (req: Request, res: Response) => Response;
  getEnrollmentById: (req: Request, res: Response) => Response;
  createEnrollment: (
    req: Request,
    res: Response,
  ) => Response;
  updateEnrollment: (req: Request, res: Response) => Response;
  deleteEnrollment: (req: Request, res: Response) => Response;
}

const enrollmentController: EnrollmentController = {
  getAllEnrollments: function (req: Request, res: Response) {
    return res.status(200).json(enrollments);
  },

  getEnrollmentById: function (req: Request, res: Response) {
    const id = req.params.id;

    const enrollment = enrollments.find(
      (enrollment) => enrollment.id === id,
    );

    if (!enrollment) {
      return res.status(404).json({
        error: 'Enrollment not found',
      });
    }

    return res.status(200).json(enrollment);
  },

  createEnrollment: function (
    req: Request<{}, {}, CreateEnrollment>,
    res: Response,
  ) {
    const { studentId, sessionId } = req.body;

    if (!studentId || !sessionId) {
      return res.status(400).json({
        error: 'Student ID and session ID are required',
      });
    }

    const student = students.find(
      (student) => student.id === studentId,
    );

    if (!student) {
      return res.status(404).json({
        error: 'Student not found',
      });
    }

    const session = teachingSessions.find(
      (session) => session.id === sessionId,
    );

    if (!session) {
      return res.status(404).json({
        error: 'Teaching session not found',
      });
    }

    const existingEnrollment = enrollments.find(
      (enrollment) =>
        enrollment.studentId === studentId &&
        enrollment.sessionId === sessionId &&
        enrollment.status !== 'cancelled',
    );

    if (existingEnrollment) {
      return res.status(409).json({
        error: 'Student is already enrolled in this session',
      });
    }

    const enrolledStudents = enrollments.filter(
      (enrollment) =>
        enrollment.sessionId === sessionId &&
        (enrollment.status === 'pending' ||
          enrollment.status === 'confirmed'),
    );

    if (enrolledStudents.length >= session.maxStudents) {
      return res.status(409).json({
        error: 'Teaching session is full',
      });
    }

    const id = `enroll-00${enrollments.length + 1}`;

    const enrollment: Enrollment = {
      id,
      studentId,
      sessionId,
      status: 'pending',
      enrolledAt: new Date().toISOString(),
    };

    enrollments.push(enrollment);

    return res.status(201).json({
      message: 'Enrollment created successfully',
      enrollment,
    });
  },

  updateEnrollment: function (
    req: Request,
    res: Response,
  ) {
    const id = req.params.id;

    const enrollment = enrollments.find(
      (enrollment) => enrollment.id === id,
    );

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

    if (
      req.body.status &&
      !allowedStatuses.includes(req.body.status)
    ) {
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

  deleteEnrollment: function (
    req: Request,
    res: Response,
  ) {
    const id = req.params.id;

    const index = enrollments.findIndex(
      (enrollment) => enrollment.id === id,
    );

    if (index === -1) {
      return res.status(404).json({
        error: 'Enrollment not found',
      });
    }

    enrollments.splice(index, 1);

    return res.status(200).json({
      message: 'Enrollment deleted successfully',
    });
  },
};

export default enrollmentController;