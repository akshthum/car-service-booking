const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'car_service_db',
  password: 'August@17032002',
  port: 5432,
});

async function createUser() {
  try {
    const hashedPassword = await bcrypt.hash('password', 10);
    
    const query = `
      INSERT INTO users (name, email, phone, password)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO UPDATE SET password = $4
      RETURNING id, name, email
    `;
    
    const result = await pool.query(query, ['Admin', 'admin@test.com', '1234567890', hashedPassword]);
    console.log('User created:', result.rows[0]);
    
    pool.end();
  } catch (error) {
    console.error('Error:', error);
    pool.end();
  }
}

createUser();