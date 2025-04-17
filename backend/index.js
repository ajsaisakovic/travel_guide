import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes.js';
import destinationRouter from './routes/destinationRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
import destinationImageRouter from './routes/destinationImageRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/destinations', destinationRouter);
app.use('/api/v1/destinations', destinationImageRouter);
app.use('/api/v1/destinations/:destinationId/reviews', reviewRouter);
app.use('/api/v1/reviews', reviewRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Travel Guide API is running'
  });
});

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});