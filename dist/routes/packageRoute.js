"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PackageController_1 = __importDefault(require("../controllers/PackageController"));
const router = express_1.default.Router();
router.get("/", PackageController_1.default.getAllPackages);
router.post("/", PackageController_1.default.createPackage);
router.get("/:id", PackageController_1.default.getPackageById);
router.put("/:id", PackageController_1.default.updatePackage);
router.delete("/:id", PackageController_1.default.deletePackage);
exports.default = router;
