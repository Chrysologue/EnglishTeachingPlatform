import { CreateUser, UpdateUser } from '../types/user';
import { Request, Response } from 'express';
import {
  findAllUsers,
  findUserById,
  findUserByEmail,
  createUser,
  updateUser,
  deactivateUser,
} from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface UserController {
  getAllUsers: (req: Request, res: Response) => Promise<Response>;
  getUserById: (req: Request, res: Response) => Promise<Response>;
  createUser: (req: Request, res: Response) => Promise<Response>;
  loginUser: (req: Request, res: Response) => Promise<Response>;
  updateUser: (req: Request, res: Response) => Promise<Response>;
  deactivateUser: (req: Request, res: Response) => Promise<Response>;
}

const userController: UserController = {
  getAllUsers: async function (req: Request, res: Response) {
    try {
      const users = await findAllUsers();
      return res.status(200).json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  getUserById: async function (req: Request, res: Response) {
    try {
      const userId = req.params.id;

      if (typeof userId !== 'string') {
        return res.status(400).json({ error: 'Invalid user ID' });
      }

      const user = await findUserById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  createUser: async function (req: Request, res: Response) {
    try {
      const user: CreateUser = req.body;

      if (
        !user ||
        typeof user.name !== 'string' ||
        typeof user.email !== 'string' ||
        typeof user.password !== 'string' ||
        !user.name.trim() ||
        !user.email.trim() ||
        !user.password
      ) {
        return res.status(400).json({ error: 'Invalid registration data' });
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);

      const newUser = await createUser({
        ...user,
        email: user.email.trim().toLowerCase(),
        password: hashedPassword,
      });

      return res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  loginUser: async function (req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (
        typeof email !== 'string' ||
        typeof password !== 'string' ||
        !email.trim() ||
        !password
      ) {
        return res.status(400).json({
          error: 'Email and password are required',
        });
      }

      const user = await findUserByEmail(email.trim().toLowerCase());

      if (!user || !user.is_active) {
        return res.status(401).json({
          error: 'Invalid email or password',
        });
      }

      const passwordMatches = await bcrypt.compare(password, user.password);

      if (!passwordMatches) {
        return res.status(401).json({
          error: 'Invalid email or password',
        });
      }

      const jwtSecret = process.env.JWT_SECRET;

      if (!jwtSecret) {
        throw new Error('JWT_SECRET is not configured');
      }

      const token = jwt.sign(
        {
          userId: user.user_id,
          email: user.email,
          role: user.role,
        },
        jwtSecret,
        { expiresIn: '1h' },
      );

      return res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          user_id: user.user_id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  },

  updateUser: async function (req: Request, res: Response) {
    try {
      const userId = req.params.id;

      if (typeof userId !== 'string') {
        return res.status(400).json({ error: 'Invalid user ID' });
      }

      const userUpdates: UpdateUser = req.body;

      if (!userUpdates || Object.keys(userUpdates).length === 0) {
        return res.status(400).json({ error: 'No update fields provided' });
      }

      const updatedUser = await updateUser(userId, userUpdates);

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(updatedUser);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  deactivateUser: async function (req: Request, res: Response) {
    try {
      const userId = req.params.id;

      if (typeof userId !== 'string') {
        return res.status(400).json({ error: 'Invalid user ID' });
      }

      const deactivatedUser = await deactivateUser(userId);

      if (!deactivatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json({
        message: 'User deactivated successfully',
        user: deactivatedUser,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};

export default userController;
