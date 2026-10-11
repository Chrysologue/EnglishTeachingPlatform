import express from 'express';

import teachingSessionController from '../controllers/teachingSessionController';

const router = express.Router();

router.get('/', teachingSessionController.getAllTeachingSessions);

router.post('/', teachingSessionController.createTeachingSession);

router.get('/:id', teachingSessionController.getTeachingSessionById);

router.put('/:id', teachingSessionController.updateTeachingSession);

router.delete('/:id', teachingSessionController.cancelTeachingSession);

export default router;
