import Destination from '../models/Destination.js';

export const getAllDestinations = async (req, res) => {
  try {
    const { featured, continent } = req.query;
    
    const destinations = await Destination.getAll({ 
      featured: featured ? featured === 'true' : undefined,
      continent
    });
    
    res.status(200).json({
      status: 'success',
      results: destinations.length,
      data: {
        destinations
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

export const getDestination = async (req, res) => {
  try {
    const destination = await Destination.getById(req.params.id);
    
    if (!destination) {
      return res.status(404).json({
        status: 'fail',
        message: 'No destination found with that ID'
      });
    }

    if (destination.images) {
      destination.images = destination.images.split(',');
    } else {
      destination.images = [];
    }

    res.status(200).json({
      status: 'success',
      data: {
        destination
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

export const createDestination = async (req, res) => {
  try {
    const newDestinationId = await Destination.create(req.body);
    const newDestination = await Destination.getById(newDestinationId);
    
    res.status(201).json({
      status: 'success',
      data: {
        destination: newDestination
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

export const getContinents = async (req, res) => {
  try {
    const continents = await Destination.getContinents();
    
    res.status(200).json({
      status: 'success',
      data: {
        continents
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};