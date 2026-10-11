"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enrollmentModel_1 = require("../models/enrollmentModel");
const enrollmentController = {
    createEnrollement: async function (req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            const studentId = req.user.user_id;
            const enrollment = req.body;
            const result = await (0, enrollmentModel_1.createEnrollment)(studentId, enrollment);
            return res.status(201).json(result);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
};
exports.default = enrollmentController;
