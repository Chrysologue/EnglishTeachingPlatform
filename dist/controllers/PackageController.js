"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packageModel_1 = require("../models/packageModel");
const packageController = {
    getAllPackages: async function (req, res) {
        try {
            const results = await (0, packageModel_1.getAllPackages)();
            return res.status(200).json(results);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    getPackageById: async function (req, res) {
        try {
            const id = req.params.id;
            if (typeof id !== 'string') {
                return res.status(400).json({ error: 'Invalid package ID' });
            }
            const result = await (0, packageModel_1.getPackageById)(id);
            if (!result) {
                return res.status(404).json({ error: 'Package not found' });
            }
            return res.status(200).json(result);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    createPackage: async function (req, res) {
        try {
            const lessonPackage = req.body;
            const result = await (0, packageModel_1.createPackage)(lessonPackage);
            return res.status(201).json(result);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    updatePackage: async function (req, res) {
        try {
            const id = req.params.id;
            if (typeof id !== 'string') {
                return res.status(400).json({ error: "Invalid package ID" });
            }
            const updateLessonPackage = req.body;
            const result = await (0, packageModel_1.updatePackage)(id, updateLessonPackage);
            if (!result) {
                return res.status(404).json({ error: 'Package not found' });
            }
            return res.status(200).json(result);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    deletePackage: async function (req, res) {
        try {
            const id = req.params.id;
            if (typeof id !== 'string') {
                return res.status(400).json({ error: "Invalid package ID" });
            }
            const result = await (0, packageModel_1.deleteLessonPackage)(id);
            if (!result) {
                return res.status(404).json({ error: 'Package not found' });
            }
            return res.status(200).json({ message: "Package successfully deleted", result });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
};
exports.default = packageController;
