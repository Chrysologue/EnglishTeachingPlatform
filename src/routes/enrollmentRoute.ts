import express from 'express';
import enrollmentController from '../controllers/enrollmentController';

const router = express.Router();


router.post('/', enrollmentController.createEnrollement);


export default router;
