
import { Request, Response } from 'express';
import {
  getAllTeachingSession,
  getSessionById,
  createSession,
  updateSession,
  cancelSession,
} from '../models/sessionModel';
import {
  CreateTeachingSession,
  UpdateTeachingSession,
} from '../types/teachingSession';

interface TeachingSessionController {
  getAllTeachingSessions: (req: Request, res: Response) => Promise<Response>;
  getTeachingSessionById: (req: Request, res: Response) => Promise<Response>;
  createTeachingSession: (req: Request, res: Response) => Promise<Response>;
  updateTeachingSession: (req: Request, res: Response) => Promise<Response>;
  cancelTeachingSession: (req: Request, res: Response) => Promise<Response>;
}

const sessionController: TeachingSessionController = {
  getAllTeachingSessions: async function (req: Request, res: Response) {
    try {
      const result = await getAllTeachingSession();
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  getTeachingSessionById: async function (req: Request, res: Response) {
    try {
      const id = req.params.id;

      if (typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid session ID' });
      }

      const session = await getSessionById(id);

      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }

      return res.status(200).json(session);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  createTeachingSession: async function (req: Request, res: Response) {
    try {
      const session: CreateTeachingSession = req.body;

      const result = await createSession(session);

      return res.status(201).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  updateTeachingSession: async function (req: Request, res: Response) {
    try {
      const id = req.params.id;

      if (typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid session ID' });
      }

      const session: UpdateTeachingSession = req.body;

      const result = await updateSession(id, session);

      if (!result) {
        return res.status(404).json({
          error: 'Session not found or no fields provided to update',
        });
      }

      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  cancelTeachingSession: async function (req: Request, res: Response) {
    try {
      const id = req.params.id;

      if (typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid session ID' });
      }

      const result = await cancelSession(id);

      if (!result) {
        return res.status(404).json({ error: 'Session not found' });
      }

      return res.status(200).json({
        message: 'Session cancelled successfully',
        session: result,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};

export default sessionController;
