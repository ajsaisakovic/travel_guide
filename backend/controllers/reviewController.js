import Review from '../models/Review.js';

export const getReviewsForDestination = async (req, res) => {
  try {
    const reviews = await Review.findByDestination(req.params.destinationId);
    res.json({
      status: 'success',
      results: reviews.length,
      data: { reviews }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

export const createReview = async (req, res) => {
  try {
    const { title, content, rating } = req.body;
    const newReview = await Review.create({
      user_id: req.user.id,
      destination_id: req.params.destinationId,
      title,
      content,
      rating
    });

    // Avg ocjena
    const { average } = await Review.getAverageRating(req.params.destinationId);

    res.status(201).json({
      status: 'success',
      data: {
        review: newReview,
        averageRating: average
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    // Provjera da li review pripada korisniku
    if (review.user_id !== req.user.id) {
      return res.status(403).json({
        status: 'fail',
        message: 'You can only update your own reviews'
      });
    }

    await Review.update(req.params.id, req.body);
    const updatedReview = await Review.findById(req.params.id);

    res.json({
      status: 'success',
      data: {
        review: updatedReview
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    // Provjera ko želi obrisati review
    if (review.user_id !== req.user.id && !req.user.is_admin) {
      return res.status(403).json({
        status: 'fail',
        message: 'You can only delete your own reviews'
      });
    }

    await Review.delete(req.params.id);
    
    // Avg ocjena
    const { average } = await Review.getAverageRating(review.destination_id);

    res.status(204).json({
      status: 'success',
      data: null,
      averageRating: average
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};