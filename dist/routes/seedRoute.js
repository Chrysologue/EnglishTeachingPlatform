"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createTable_1 = __importDefault(require("../seed/createTable"));
const router = express_1.default.Router();
const seed_1 = __importDefault(require("./seed"));
router.get("/seed", async (req, res) => {
    try {
        await (0, createTable_1.default)();
        return res.status(201).json({ message: "Tables are successfully created" });
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
router.get("/seed-all", async (req, res) => {
    try {
        await (0, seed_1.default)();
        return res.status(201).json({ message: "Table seeded" });
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.default = router;
