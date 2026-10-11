import express from 'express';
import packageController from '../controllers/PackageController';

const router = express.Router();

router.get('/', packageController.getAllPackages);
router.post('/', packageController.createPackage);
router.get('/:id', packageController.getPackageById);
router.put('/:id', packageController.updatePackage);
router.delete('/:id', packageController.deletePackage);

export default router;
