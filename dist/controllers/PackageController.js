"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packages_1 = require("../data/packages");
const packageController = {
    getAllPackages: function (req, res) {
        return res.status(200).json(packages_1.packages);
    },
    getPackageById: function (req, res) {
        const id = req.params.id;
        const lessonPackage = packages_1.packages.find((pack) => pack.id === id);
        if (!lessonPackage) {
            return res.status(404).json({ error: 'Package not found' });
        }
        return res.status(200).json(lessonPackage);
    },
    createPackage: function (req, res) {
        const { title, description, level, type, duration, price, maxStudents, } = req.body;
        if (!title ||
            !description ||
            !level ||
            !type ||
            !duration ||
            !price ||
            !maxStudents) {
            return res.status(400).json({
                error: 'All fields are required',
            });
        }
        const id = `pkg-00${packages_1.packages.length + 1}`;
        const lessonPackage = {
            id,
            title,
            description,
            level,
            type,
            duration,
            price,
            maxStudents,
            isActive: true,
        };
        packages_1.packages.push(lessonPackage);
        return res.status(201).json({
            message: 'Package created successfully',
            package: lessonPackage,
        });
    },
    updatePackage: function (req, res) {
        const allowedFields = [
            'title',
            'description',
            'level',
            'type',
            'duration',
            'price',
            'maxStudents',
        ];
        const updatedPackage = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updatedPackage[field] = req.body[field];
            }
        }
        const id = req.params.id;
        const lessonPackage = packages_1.packages.find((pack) => pack.id === id);
        if (!lessonPackage) {
            return res.status(404).json({
                error: 'Package not found',
            });
        }
        if (Object.keys(updatedPackage).length === 0) {
            return res.status(400).json({
                error: 'No valid fields provided for update',
            });
        }
        Object.assign(lessonPackage, updatedPackage);
        return res.status(200).json({
            message: 'Package updated successfully',
            package: lessonPackage,
        });
    },
    deletePackage: function (req, res) {
        const id = req.params.id;
        const index = packages_1.packages.findIndex((pack) => pack.id === id);
        if (index === -1) {
            return res.status(404).json({
                error: 'Package not found',
            });
        }
        packages_1.packages.splice(index, 1);
        return res.status(200).json({
            message: 'Package deleted successfully',
        });
    },
};
exports.default = packageController;
