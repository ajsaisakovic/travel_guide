import db from '../config/db.js';

class DestinationImage {
  static async create(destinationId, imageUrl, isPrimary = false) {
    const [result] = await db.query(
      'INSERT INTO destination_images (destination_id, image_url, is_primary) VALUES (?, ?, ?)',
      [destinationId, imageUrl, isPrimary]
    );
    return result.insertId;
  }

  static async setAsPrimary(imageId) {
    await db.query(
      'UPDATE destination_images SET is_primary = CASE WHEN id = ? THEN 1 ELSE 0 END WHERE destination_id = (SELECT destination_id FROM destination_images WHERE id = ?)',
      [imageId, imageId]
    );
  }

  static async delete(imageId) {
    await db.query('DELETE FROM destination_images WHERE id = ?', [imageId]);
  }
}

export default DestinationImage;