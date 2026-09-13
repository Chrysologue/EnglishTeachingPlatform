import { packages } from '../data/packages';
import {
  LessonPackage,
  CreateLessonPackage,
} from '../types/package';
import { Request, Response } from 'express';

interface PackageController {
  getAllPackages: (req: Request, res: Response) => Response;
  getPackageById: (req: Request, res: Response) => Response;
  createPackage: (req: Request, res: Response) => Response;
  updatePackage: (req: Request, res: Response) => Response;
  deletePackage: (req: Request, res: Response) => Response;
}

const packageController: PackageController = {
  getAllPackages: function (req: Request, res: Response) {
    return res.status(200).json(packages);
  },

  getPackageById: function (req: Request, res: Response) {
    const id = req.params.id;

    const lessonPackage = packages.find((pack) => pack.id === id);

    if (!lessonPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }

    return res.status(200).json(lessonPackage);
  },

  createPackage: function (
    req: Request<{}, {}, CreateLessonPackage>,
    res: Response,
  ) {
    const {
      title,
      description,
      level,
      type,
      duration,
      price,
      maxStudents,
    } = req.body;

    if (
      !title ||
      !description ||
      !level ||
      !type ||
      !duration ||
      !price ||
      !maxStudents
    ) {
      return res.status(400).json({
        error: 'All fields are required',
      });
    }

    const id = `pkg-00${packages.length + 1}`;

    const lessonPackage: LessonPackage = {
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

    packages.push(lessonPackage);

    return res.status(201).json({
      message: 'Package created successfully',
      package: lessonPackage,
    });
  },

  updatePackage: function (req: Request, res: Response) {
    const allowedFields = [
      'title',
      'description',
      'level',
      'type',
      'duration',
      'price',
      'maxStudents',
    ];

    const updatedPackage: { [key: string]: string | number } = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updatedPackage[field] = req.body[field];
      }
    }

    const id = req.params.id;

    const lessonPackage = packages.find((pack) => pack.id === id);

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

  deletePackage: function (req: Request, res: Response) {
    const id = req.params.id;

    const index = packages.findIndex((pack) => pack.id === id);

    if (index === -1) {
      return res.status(404).json({
        error: 'Package not found',
      });
    }

    packages.splice(index, 1);

    return res.status(200).json({
      message: 'Package deleted successfully',
    });
  },
};

export default packageController;