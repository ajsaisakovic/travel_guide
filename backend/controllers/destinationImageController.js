import DestinationImage from '../models/DestinationImage.js';

export const addImage = async (req, res) => {
  try {
    const { destinationId } = req.params;
    const { imageUrl, isPrimary } = req.body;
    
    const imageId = await DestinationImage.create(destinationId, imageUrl, isPrimary);
    
    if (isPrimary) {
      await DestinationImage.setAsPrimary(imageId);
    }
    
    res.status(201).json({
      status: 'success',
      data: {
        imageId
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

export const setPrimaryImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    await DestinationImage.setAsPrimary(imageId);
    
    res.status(200).json({
      status: 'success',
      message: 'Image set as primary'
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    await DestinationImage.delete(imageId);
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};