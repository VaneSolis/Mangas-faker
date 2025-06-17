const express = require('express');
const router = express.Router();
const MangaController = require('../controllers/mangaController');

/**
 * @swagger
 * /api/mangas:
 *   get:
 *     summary: Obtiene una lista paginada de mangas
 *     parameters:
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: porPagina
 *         schema:
 *           type: integer
 *         description: Cantidad de mangas por página
 *     responses:
 *       200:
 *         description: Lista de mangas
 */
router.get('/', MangaController.getMangas);

/**
 * @swagger
 * /api/mangas/{id}:
 *   get:
 *     summary: Obtiene un manga por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Manga encontrado
 *       404:
 *         description: Manga no encontrado
 */
router.get('/:id', MangaController.getMangaById);

/**
 * @swagger
 * /api/mangas/genero/{generoId}:
 *   get:
 *     summary: Obtiene mangas por género
 *     parameters:
 *       - in: path
 *         name: generoId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *       - in: query
 *         name: porPagina
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de mangas del género
 */
router.get('/genero/:generoId', MangaController.getMangasByGenero);

/**
 * @swagger
 * /api/mangas/total:
 *   get:
 *     summary: Obtiene el total de mangas
 *     responses:
 *       200:
 *         description: Total de mangas
 */
router.get('/total', MangaController.getTotalMangas);

/**
 * @swagger
 * /api/mangas:
 *   post:
 *     summary: Crea un nuevo manga
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               autor:
 *                 type: string
 *               fecha_publicacion:
 *                 type: string
 *                 format: date
 *               genero_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Manga creado exitosamente
 */
router.post('/', MangaController.createManga);

/**
 * @swagger
 * /api/mangas/{id}:
 *   put:
 *     summary: Actualiza un manga existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               autor:
 *                 type: string
 *               fecha_publicacion:
 *                 type: string
 *                 format: date
 *               genero_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Manga actualizado exitosamente
 *       404:
 *         description: Manga no encontrado
 */
router.put('/:id', MangaController.updateManga);

/**
 * @swagger
 * /api/mangas/{id}:
 *   delete:
 *     summary: Elimina un manga
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Manga eliminado exitosamente
 *       404:
 *         description: Manga no encontrado
 */
router.delete('/:id', MangaController.deleteManga);

module.exports = router; 