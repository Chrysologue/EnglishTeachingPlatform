import { teachingSessions } from '../data/teachingSessions';
import { packages } from '../data/packages';
import {
  TeachingSession,
  CreateTeachingSession,
} from '../types/teachingSession';
import { Request, Response } from 'express';

interface TeachingSessionController {
  getAllTeachingSessions: (req: Request, res: Response) => Response;
  getTeachingSessionById: (req: Request, res: Response) => Response;
  createTeachingSession: (
    req: Request,
    res: Response,
  ) => Response;
  updateTeachingSession: (req: Request, res: Response) => Response;
  deleteTeachingSession: (req: Request, res: Response) => Response;
}

const teachingSessionController: TeachingSessionController = {
  getAllTeachingSessions: function (req: Request, res: Response) {
    return res.status(200).json(teachingSessions);
  },

  getTeachingSessionById: function (req: Request, res: Response) {
    const id = req.params.id;

    const session = teachingSessions.find(
      (session) => session.id === id,
    );

    if (!session) {
      return res.status(404).json({
        error: 'Teaching session not found',
      });
    }

    return res.status(200).json(session);
  },

  createTeachingSession: function (
    req: Request<{}, {}, CreateTeachingSession>,
    res: Response,
  ) {
    const {
      packageId,
      date,
      startTime,
      endTime,
      maxStudents,
      meetingLink,
    } = req.body;

    if (
      !packageId ||
      !date ||
      !startTime ||
      !endTime ||
      !maxStudents ||
      !meetingLink
    ) {
      return res.status(400).json({
        error: 'All fields are required',
      });
    }

    const lessonPackage = packages.find(
      (pack) => pack.id === packageId,
    );

    if (!lessonPackage) {
      return res.status(404).json({
        error: 'Package not found',
      });
    }

    const id = `session-00${teachingSessions.length + 1}`;

    const teachingSession: TeachingSession = {
      id,
      packageId,
      date,
      startTime,
      endTime,
      maxStudents,
      meetingLink,
      status: 'scheduled',
    };

    teachingSessions.push(teachingSession);

    return res.status(201).json({
      message: 'Teaching session created successfully',
      session: teachingSession,
    });
  },

  updateTeachingSession: function (
    req: Request,
    res: Response,
  ) {
    const allowedFields = [
      'date',
      'startTime',
      'endTime',
      'maxStudents',
      'meetingLink',
      'status',
    ];

    const updatedSession: {
      [key: string]: string | number;
    } = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updatedSession[field] = req.body[field];
      }
    }

    const id = req.params.id;

    const session = teachingSessions.find(
      (session) => session.id === id,
    );

    if (!session) {
      return res.status(404).json({
        error: 'Teaching session not found',
      });
    }

    if (Object.keys(updatedSession).length === 0) {
      return res.status(400).json({
        error: 'No valid fields provided for update',
      });
    }

    Object.assign(session, updatedSession);

    return res.status(200).json({
      message: 'Teaching session updated successfully',
      session,
    });
  },

  deleteTeachingSession: function (
    req: Request,
    res: Response,
  ) {
    const id = req.params.id;

    const index = teachingSessions.findIndex(
      (session) => session.id === id,
    );

    if (index === -1) {
      return res.status(404).json({
        error: 'Teaching session not found',
      });
    }

    teachingSessions.splice(index, 1);

    return res.status(200).json({
      message: 'Teaching session deleted successfully',
    });
  },
};

export default teachingSessionController;