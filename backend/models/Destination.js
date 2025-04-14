import db from '../config/db.js';

class Destination {
  static async getAll() {
    const [rows] = await db.query(`
      SELECT d.*, 
        (SELECT image_url FROM destination_images WHERE destination_id = d.id AND is_primary = 1 LIMIT 1) AS primary_image,
        (SELECT AVG(rating) FROM reviews WHERE destination_id = d.id) AS average_rating
      FROM destinations d
    `);
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM destinations WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(destinationData) {
    const [result] = await db.query('INSERT INTO destinations SET ?', [destinationData]);
    return result.insertId;
  }
}

export default Destination;