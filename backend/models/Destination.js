import db from '../config/db.js';

class Destination {
  static async getAll({ featured, continent } = {}) {
    let query = `
      SELECT d.*, 
        (SELECT image_url FROM destination_images 
         WHERE destination_id = d.id AND is_primary = 1 LIMIT 1) AS primary_image
      FROM destinations d
    `;
    
    const params = [];
    const conditions = [];
    
    if (featured !== undefined) {
      conditions.push('d.is_featured = ?');
      params.push(featured ? 1 : 0);
    }
    
    if (continent && continent !== 'All') {
      conditions.push('d.continent = ?');
      params.push(continent);
    }
    
    if (conditions.length) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }
    
    query += ' ORDER BY d.created_at DESC';
    
    const [rows] = await db.query(query, params);
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query(`
      SELECT d.*, 
        (SELECT GROUP_CONCAT(image_url) FROM destination_images 
         WHERE destination_id = d.id) AS images
      FROM destinations d
      WHERE d.id = ?
    `, [id]);
    return rows[0];
  }

  static async create(destinationData) {
    const [result] = await db.query('INSERT INTO destinations SET ?', [destinationData]);
    return result.insertId;
  }

  static async getContinents() {
    const [rows] = await db.query('SELECT DISTINCT continent FROM destinations WHERE continent IS NOT NULL');
    return rows.map(row => row.continent);
  }
}

export default Destination;