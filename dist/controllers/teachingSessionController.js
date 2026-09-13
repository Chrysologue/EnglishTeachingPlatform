"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const teachingSessions_1 = require("../data/teachingSessions");
const packages_1 = require("../data/packages");
const teachingSessionController = {
    getAllTeachingSessions: function (req, res) {
        return res.status(200).json(teachingSessions_1.teachingSessions);
    },
    getTeachingSessionById: function (req, res) {
        const id = req.params.id;
        const session = teachingSessions_1.teachingSessions.find((session) => session.id === id);
        if (!session) {
            return res.status(404).json({
                error: 'Teaching session not found',
            });
        }
        return res.status(200).json(session);
    },
    createTeachingSession: function (req, res) {
        const { packageId, date, startTime, endTime, maxStudents, meetingLink, } = req.body;
        if (!packageId ||
            !date ||
            !startTime ||
            !endTime ||
            !maxStudents ||
            !meetingLink) {
            return res.status(400).json({
                error: 'All fields are required',
            });
        }
        const lessonPackage = packages_1.packages.find((pack) => pack.id === packageId);
        if (!lessonPackage) {
            return res.status(404).json({
                error: 'Package not found',
            });
        }
        const id = `session-00${teachingSessions_1.teachingSessions.length + 1}`;
        const teachingSession = {
            id,
            packageId,
            date,
            startTime,
            endTime,
            maxStudents,
            meetingLink,
            status: 'scheduled',
        };
        teachingSessions_1.teachingSessions.push(teachingSession);
        return res.status(201).json({
            message: 'Teaching session created successfully',
            session: teachingSession,
        });
    },
    updateTeachingSession: function (req, res) {
        const allowedFields = [
            'date',
            'startTime',
            'endTime',
            'maxStudents',
            'meetingLink',
            'status',
        ];
        const updatedSession = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updatedSession[field] = req.body[field];
            }
        }
        const id = req.params.id;
        const session = teachingSessions_1.teachingSessions.find((session) => session.id === id);
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
    deleteTeachingSession: function (req, res) {
        const id = req.params.id;
        const index = teachingSessions_1.teachingSessions.findIndex((session) => session.id === id);
        if (index === -1) {
            return res.status(404).json({
                error: 'Teaching session not found',
            });
        }
        teachingSessions_1.teachingSessions.splice(index, 1);
        return res.status(200).json({
            message: 'Teaching session deleted successfully',
        });
    },
};
exports.default = teachingSessionController;
