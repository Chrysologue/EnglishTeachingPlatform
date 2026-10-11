"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const usertRoutes_1 = __importDefault(require("./routes/usertRoutes"));
const packageRoute_1 = __importDefault(require("./routes/packageRoute"));
const teachingSessionRoute_1 = __importDefault(require("./routes/teachingSessionRoute"));
const enrollmentRoute_1 = __importDefault(require("./routes/enrollmentRoute"));
// import paymentRouter from './routes/paymentRoutes';
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/users', usertRoutes_1.default);
app.use('/api/packages', packageRoute_1.default);
app.use('/api/teaching-sessions', teachingSessionRoute_1.default);
app.use('/api/enrollments', enrollmentRoute_1.default);
// app.use('/api/payments', paymentRouter);
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.json({ messge: 'English Teaching Platform API is running' });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
