const Service = require('../models/Service');
const logger = require('../config/logger');

const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    logger.info(`Service created: ${service.name}`);
    res.status(201).json({ message: 'Service created successfully', service });
  } catch (error) {
    logger.error('Create service error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json({ services });
  } catch (error) {
    logger.error('Get services error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json({ service });
  } catch (error) {
    logger.error('Get service error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateService = async (req, res) => {
  try {
    const service = await Service.update(req.params.id, req.body);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    logger.info(`Service updated: ${service.name}`);
    res.json({ message: 'Service updated successfully', service });
  } catch (error) {
    logger.error('Update service error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Service.delete(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    logger.info(`Service deleted: ${service.name}`);
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    logger.error('Delete service error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createService,
  getServices,
  getService,
  updateService,
  deleteService
};