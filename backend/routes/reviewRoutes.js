import express from 'express';
import {
  getReviewsForDestination,
  createReview,
  updateReview,
  deleteReview
} from '../controllers/reviewController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getReviewsForDestination) 
  .post(protect, createReview); 

router
  .route('/:id')
  .patch(protect, updateReview)   
  .delete(protect, deleteReview);

export default router;