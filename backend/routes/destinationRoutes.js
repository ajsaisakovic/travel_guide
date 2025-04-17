import express from 'express';
import {
  getAllDestinations,
  getDestination,
  createDestination
} from '../controllers/destinationController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAllDestinations);
router.get('/:id', getDestination);

router.use(protect, restrictTo('admin'));
router.post('/', createDestination);

export default router;