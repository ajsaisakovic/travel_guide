import express from 'express';
import {
  addImage,
  setPrimaryImage,
  deleteImage
} from '../controllers/destinationImageController.js';
import { protect, restrictTo } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect, restrictTo('admin'));

router.post('/:destinationId/images', addImage);
router.patch('/images/:imageId/primary', setPrimaryImage);
router.delete('/images/:imageId', deleteImage);

export default router;