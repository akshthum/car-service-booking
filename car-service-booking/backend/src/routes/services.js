const express = require('express');
const {
  createService,
  getServices,
  getService,
  updateService,
  deleteService
} = require('../controllers/serviceController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', getServices);
router.get('/:id', getService);
router.post('/', authenticateToken, createService);
router.put('/:id', authenticateToken, updateService);
router.delete('/:id', authenticateToken, deleteService);

module.exports = router;