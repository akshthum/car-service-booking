const pool = require('../config/database');

class Service {
  static async create(serviceData) {
    const { name, description, price, duration } = serviceData;
    const query = `
      INSERT INTO services (name, description, price, duration)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await pool.query(query, [name, description, price, duration]);
    return result.rows[0];
  }

  static async findAll() {
    const query = 'SELECT * FROM services ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM services WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async update(id, serviceData) {
    const { name, description, price, duration } = serviceData;
    const query = `
      UPDATE services 
      SET name = $1, description = $2, price = $3, duration = $4, updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING *
    `;
    const result = await pool.query(query, [name, description, price, duration, id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM services WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = Service;