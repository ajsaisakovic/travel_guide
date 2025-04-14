import db from '../config/db.js';

class User {
  static async create({ first_name, last_name, email, password }) {
    const [result] = await db.query(
      'INSERT INTO users (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)',
      [first_name, last_name, email, password]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }
}

export default User;