import db from '../config/db.js';

class Review {
  static async create({ user_id, title, content, rating }) {
    const [result] = await db.query(
      'INSERT INTO reviews (user_id, title, content, rating) VALUES (?, ?, ?, ?, ?)',
      [user_id, title, content, rating]
    );
    return result.insertId;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM reviews WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, { title, content, rating }) {
    await db.query(
      'UPDATE reviews SET title = ?, content = ?, rating = ? WHERE id = ?',
      [title, content, rating, id]
    );
  }

  static async delete(id) {
    await db.query('DELETE FROM reviews WHERE id = ?', [id]);
  }

  static async getAverageRating(destination_id) {
    const [rows] = await db.query(
      'SELECT AVG(rating) AS average, COUNT(*) AS count FROM reviews WHERE destination_id = ?',
      [destination_id]
    );
    return rows[0];
  }
}

export default Review;