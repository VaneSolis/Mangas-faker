const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'sql5.freesqldatabase.com',
  user: process.env.DB_USER || 'sql5784546',
  password: process.env.DB_PASSWORD || 'NEBq6v4FKw',
  database: process.env.DB_NAME || 'sql5784546',
  port: process.env.DB_PORT || 3306,
});

class Manga {
  static async findAll(page = 1, perPage = 10) {
    const offset = (page - 1) * perPage;
    const [mangas] = await pool.query(`
      SELECT m.*, g.nombre as genero 
      FROM mangas m 
      LEFT JOIN generos g ON m.genero_id = g.id 
      LIMIT ? OFFSET ?
    `, [perPage, offset]);
    return mangas;
  }

  static async findByGenero(generoId, page = 1, perPage = 10) {
    const offset = (page - 1) * perPage;
    const [mangas] = await pool.query(`
      SELECT m.*, g.nombre as genero 
      FROM mangas m 
      LEFT JOIN generos g ON m.genero_id = g.id 
      WHERE m.genero_id = ?
      LIMIT ? OFFSET ?
    `, [generoId, perPage, offset]);
    return mangas;
  }

  static async count() {
    const [result] = await pool.query('SELECT COUNT(*) as total FROM mangas');
    return result[0].total;
  }

  static async findById(id) {
    const [mangas] = await pool.query(`
      SELECT m.*, g.nombre as genero 
      FROM mangas m 
      LEFT JOIN generos g ON m.genero_id = g.id 
      WHERE m.id = ?
    `, [id]);
    return mangas[0];
  }

  static async create(mangaData) {
    const [result] = await pool.query(
      'INSERT INTO mangas (titulo, autor, fecha_publicacion, genero_id) VALUES (?, ?, ?, ?)',
      [mangaData.titulo, mangaData.autor, mangaData.fecha_publicacion, mangaData.genero_id]
    );
    return result.insertId;
  }

  static async update(id, mangaData) {
    const [result] = await pool.query(
      'UPDATE mangas SET titulo = ?, autor = ?, fecha_publicacion = ?, genero_id = ? WHERE id = ?',
      [mangaData.titulo, mangaData.autor, mangaData.fecha_publicacion, mangaData.genero_id, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM mangas WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Manga; 