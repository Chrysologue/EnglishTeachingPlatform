import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/usertRoutes';
import packageRouter from './routes/packageRoute';
import teachingSessionRouter from './routes/teachingSessionRoute';
import enrollmentRouter from './routes/enrollmentRoute';
// import paymentRouter from './routes/paymentRoutes';
import router from './routes/seedRoute'

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/packages', packageRouter);
app.use('/api/teaching-sessions', teachingSessionRouter);
app.use('/api/enrollments', enrollmentRouter);
// app.use('/api/payments', paymentRouter);
app.use("/", router)

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.json({ messge: 'English Teaching Platform API is running' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
