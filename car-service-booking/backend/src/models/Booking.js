const pool = require('../config/database');

class Booking {
  static async create(bookingData) {
    const { user_id, service_id, booking_date, status = 'pending' } = bookingData;
    const query = `
      INSERT INTO bookings (user_id, service_id, booking_date, status)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await pool.query(query, [user_id, service_id, booking_date, status]);
    return result.rows[0];
  }

  static async findAll(filters = {}) {
    let query = `
      SELECT b.*, u.name as user_name, u.email, s.name as service_name, s.price
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN services s ON b.service_id = s.id
    `;
    const params = [];
    const conditions = [];

    if (filters.status) {
      conditions.push(`b.status = $${params.length + 1}`);
      params.push(filters.status);
    }

    if (filters.user_id) {
      conditions.push(`b.user_id = $${params.length + 1}`);
      params.push(filters.user_id);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY b.created_at DESC';

    const result = await pool.query(query, params);
    return result.rows;
  }

  static async findById(id) {
    const query = `
      SELECT b.*, u.name as user_name, u.email, s.name as service_name, s.price
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN services s ON b.service_id = s.id
      WHERE b.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async update(id, bookingData) {
    const { service_id, booking_date, status } = bookingData;
    const query = `
      UPDATE bookings 
      SET service_id = $1, booking_date = $2, status = $3, updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *
    `;
    const result = await pool.query(query, [service_id, booking_date, status, id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM bookings WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = Booking;