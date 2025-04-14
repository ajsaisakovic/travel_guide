import express from 'express';
import {
  getAllDestinations,
  getDestination,
  createDestination
} from '../controllers/destinationController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(getAllDestinations)
  .post(protect, restrictTo('admin'), createDestination);

router.route('/:id').get(getDestination);

export default router;