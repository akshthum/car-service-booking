const Booking = require('../models/Booking');
const logger = require('../config/logger');

const createBooking = async (req, res) => {
  try {
    const bookingData = { ...req.body, user_id: req.user.id };
    const booking = await Booking.create(bookingData);
    logger.info(`Booking created for user: ${req.user.email}`);
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    logger.error('Create booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getBookings = async (req, res) => {
  try {
    const filters = {};
    if (req.query.status) filters.status = req.query.status;
    if (req.query.user_id) filters.user_id = req.query.user_id;

    const bookings = await Booking.findAll(filters);
    res.json({ bookings });
  } catch (error) {
    logger.error('Get bookings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({ user_id: req.user.id });
    res.json({ bookings });
  } catch (error) {
    logger.error('Get user bookings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({ booking });
  } catch (error) {
    logger.error('Get booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.update(req.params.id, req.body);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    logger.info(`Booking updated: ${booking.id}`);
    res.json({ message: 'Booking updated successfully', booking });
  } catch (error) {
    logger.error('Update booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.delete(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    logger.info(`Booking deleted: ${booking.id}`);
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    logger.error('Delete booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getUserBookings,
  getBooking,
  updateBooking,
  deleteBooking
};