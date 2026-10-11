"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sessionModel_1 = require("../models/sessionModel");
const sessionController = {
    getAllTeachingSessions: async function (req, res) {
        try {
            const result = await (0, sessionModel_1.getAllTeachingSession)();
            return res.status(200).json(result);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    getTeachingSessionById: async function (req, res) {
        try {
            const id = req.params.id;
            if (typeof id !== 'string') {
                return res.status(400).json({ error: 'Invalid session ID' });
            }
            const session = await (0, sessionModel_1.getSessionById)(id);
            if (!session) {
                return res.status(404).json({ error: 'Session not found' });
            }
            return res.status(200).json(session);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    createTeachingSession: async function (req, res) {
        try {
            const session = req.body;
            const result = await (0, sessionModel_1.createSession)(session);
            return res.status(201).json(result);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    updateTeachingSession: async function (req, res) {
        try {
            const id = req.params.id;
            if (typeof id !== 'string') {
                return res.status(400).json({ error: 'Invalid session ID' });
            }
            const session = req.body;
            const result = await (0, sessionModel_1.updateSession)(id, session);
            if (!result) {
                return res.status(404).json({
                    error: 'Session not found or no fields provided to update',
                });
            }
            return res.status(200).json(result);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    cancelTeachingSession: async function (req, res) {
        try {
            const id = req.params.id;
            if (typeof id !== 'string') {
                return res.status(400).json({ error: 'Invalid session ID' });
            }
            const result = await (0, sessionModel_1.cancelSession)(id);
            if (!result) {
                return res.status(404).json({ error: 'Session not found' });
            }
            return res.status(200).json({
                message: 'Session cancelled successfully',
                session: result,
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
};
exports.default = sessionController;
