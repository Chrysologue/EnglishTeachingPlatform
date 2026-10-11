import express from 'express';
import userController from '../controllers/userController';
const router = express.Router()

router.post("/", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/", userController.getAllUsers);

export default router