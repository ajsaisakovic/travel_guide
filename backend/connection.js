import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tourism_db',
  waitForConnections: true,
  connectionLimit: 10, 
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

async function testConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('Successfully connected to MySQL database');
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1); 
  } finally {
    if (connection) connection.release();
  }
}

testConnection();

export default pool;
