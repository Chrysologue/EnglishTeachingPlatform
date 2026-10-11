import {CreateLessonPackage, UpdatePackage } from '../types/package';
import { Request, Response } from 'express';
import {
  getAllPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deleteLessonPackage,
} from '../models/packageModel';

interface PackageController {
  getAllPackages: (req: Request, res: Response) => Promise<Response>;
  getPackageById: (req: Request, res: Response) => Promise<Response>;
  createPackage: (req: Request, res: Response) => Promise<Response>;
  updatePackage: (req: Request, res: Response) => Promise<Response>;
  deletePackage: (req: Request, res: Response) => Promise<Response>;
}

const packageController: PackageController = {
  getAllPackages: async function (req: Request, res: Response) {
    try {
      const results = await getAllPackages();
      return res.status(200).json(results);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  getPackageById: async function (req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid package ID' });
      }
      const result = await getPackageById(id);
      if (!result) {
        return res.status(404).json({ error: 'Package not found' });
      }
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  createPackage: async function (req: Request,res: Response,) {
    try{
      const lessonPackage: CreateLessonPackage = req.body
      const result = await createPackage(lessonPackage)
      return res.status(201).json(result)
    }catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  updatePackage: async function (req: Request, res: Response) {
    try{
      const id = req.params.id
      if(typeof id !== 'string'){
        return res.status(400).json({error: "Invalid package ID"})
      }
      const updateLessonPackage :UpdatePackage  = req.body
      const result = await updatePackage(id, updateLessonPackage)
      if(!result){
        return res.status(404).json({ error: 'Package not found' });
      }
      return res.status(200).json(result)
    }catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  deletePackage: async function (req: Request, res: Response) {
    try{
      const id = req.params.id
      if(typeof id !== 'string'){
        return res.status(400).json({error: "Invalid package ID"})
      }
      const result = await deleteLessonPackage(id)
      if(!result){
        return res.status(404).json({ error: 'Package not found' });
      }
      return res.status(200).json({message: "Package successfully deleted", result})
    }
   catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};

export default packageController;
