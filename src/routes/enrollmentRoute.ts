import express from 'express';
import enrollmentController from '../controllers/enrollmentController';

const router = express.Router();

router.get('/', enrollmentController.getAllEnrollments);
router.post('/', enrollmentController.createEnrollment);
router.get('/:id', enrollmentController.getEnrollmentById);
router.put('/:id', enrollmentController.updateEnrollment);
router.delete('/:id', enrollmentController.deleteEnrollment);

export default router;