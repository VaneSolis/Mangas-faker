const Manga = require('../models/Manga');

class MangaController {
  static async getMangas(req, res) {
    try {
      const page = parseInt(req.query.pagina) || 1;
      const perPage = parseInt(req.query.porPagina) || 10;
      const mangas = await Manga.findAll(page, perPage);
      res.json({ mangas });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getMangaById(req, res) {
    try {
      const manga = await Manga.findById(req.params.id);
      if (!manga) {
        return res.status(404).json({ error: 'Manga no encontrado' });
      }
      res.json({ manga });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getMangasByGenero(req, res) {
    try {
      const page = parseInt(req.query.pagina) || 1;
      const perPage = parseInt(req.query.porPagina) || 10;
      const mangas = await Manga.findByGenero(req.params.generoId, page, perPage);
      res.json({ mangas });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getTotalMangas(req, res) {
    try {
      const total = await Manga.count();
      res.json({ total });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createManga(req, res) {
    try {
      const mangaId = await Manga.create(req.body);
      res.status(201).json({ id: mangaId, message: 'Manga creado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateManga(req, res) {
    try {
      const success = await Manga.update(req.params.id, req.body);
      if (!success) {
        return res.status(404).json({ error: 'Manga no encontrado' });
      }
      res.json({ message: 'Manga actualizado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteManga(req, res) {
    try {
      const success = await Manga.delete(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Manga no encontrado' });
      }
      res.json({ message: 'Manga eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = MangaController; 