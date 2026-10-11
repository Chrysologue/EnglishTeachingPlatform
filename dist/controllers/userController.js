"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userController = {
    getAllUsers: async function (req, res) {
        try {
            const users = await (0, userModel_1.findAllUsers)();
            return res.status(200).json(users);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    getUserById: async function (req, res) {
        try {
            const userId = req.params.id;
            if (typeof userId !== 'string') {
                return res.status(400).json({ error: 'Invalid user ID' });
            }
            const user = await (0, userModel_1.findUserById)(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json(user);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    createUser: async function (req, res) {
        try {
            const user = req.body;
            if (!user ||
                typeof user.name !== 'string' ||
                typeof user.email !== 'string' ||
                typeof user.password !== 'string' ||
                !user.name.trim() ||
                !user.email.trim() ||
                !user.password) {
                return res.status(400).json({ error: 'Invalid registration data' });
            }
            const hashedPassword = await bcrypt_1.default.hash(user.password, 10);
            const newUser = await (0, userModel_1.createUser)({
                ...user,
                email: user.email.trim().toLowerCase(),
                password: hashedPassword,
            });
            return res.status(201).json(newUser);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    loginUser: async function (req, res) {
        try {
            const { email, password } = req.body;
            if (typeof email !== 'string' ||
                typeof password !== 'string' ||
                !email.trim() ||
                !password) {
                return res.status(400).json({
                    error: 'Email and password are required',
                });
            }
            const user = await (0, userModel_1.findUserByEmail)(email.trim().toLowerCase());
            if (!user || !user.is_active) {
                return res.status(401).json({
                    error: 'Invalid email or password',
                });
            }
            const passwordMatches = await bcrypt_1.default.compare(password, user.password);
            if (!passwordMatches) {
                return res.status(401).json({
                    error: 'Invalid email or password',
                });
            }
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                throw new Error('JWT_SECRET is not configured');
            }
            const token = jsonwebtoken_1.default.sign({
                userId: user.user_id,
                email: user.email,
                role: user.role,
            }, jwtSecret, { expiresIn: '1h' });
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
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                error: 'Internal server error',
            });
        }
    },
    updateUser: async function (req, res) {
        try {
            const userId = req.params.id;
            if (typeof userId !== 'string') {
                return res.status(400).json({ error: 'Invalid user ID' });
            }
            const userUpdates = req.body;
            if (!userUpdates || Object.keys(userUpdates).length === 0) {
                return res.status(400).json({ error: 'No update fields provided' });
            }
            const updatedUser = await (0, userModel_1.updateUser)(userId, userUpdates);
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json(updatedUser);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    deactivateUser: async function (req, res) {
        try {
            const userId = req.params.id;
            if (typeof userId !== 'string') {
                return res.status(400).json({ error: 'Invalid user ID' });
            }
            const deactivatedUser = await (0, userModel_1.deactivateUser)(userId);
            if (!deactivatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json({
                message: 'User deactivated successfully',
                user: deactivatedUser,
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
};
exports.default = userController;
