const express = require('express');
const router = express.Router();
const MangaController = require('../controllers/mangaController');
const { auth, adminAuth } = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/mangas:
 *   get:
 *     summary: Obtiene una lista paginada de mangas (requiere autenticación)
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: No autorizado
 */
router.get('/', auth, MangaController.getMangas);

/**
 * @swagger
 * /api/mangas/{id}:
 *   get:
 *     summary: Obtiene un manga por su ID (requiere autenticación)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Manga encontrado
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Manga no encontrado
 */
router.get('/:id', auth, MangaController.getMangaById);

/**
 * @swagger
 * /api/mangas/genero/{generoId}:
 *   get:
 *     summary: Obtiene mangas por género (requiere autenticación)
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: No autorizado
 */
router.get('/genero/:generoId', auth, MangaController.getMangasByGenero);

/**
 * @swagger
 * /api/mangas/total:
 *   get:
 *     summary: Obtiene el total de mangas (requiere autenticación)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total de mangas
 *       401:
 *         description: No autorizado
 */
router.get('/total', auth, MangaController.getTotalMangas);

/**
 * @swagger
 * /api/mangas:
 *   post:
 *     summary: Crea un nuevo manga (requiere autenticación)
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: No autorizado
 */
router.post('/', auth, MangaController.createManga);

/**
 * @swagger
 * /api/mangas/{id}:
 *   put:
 *     summary: Actualiza un manga existente (requiere autenticación)
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Manga no encontrado
 */
router.put('/:id', auth, MangaController.updateManga);

/**
 * @swagger
 * /api/mangas/{id}:
 *   delete:
 *     summary: Elimina un manga (requiere permisos de administrador)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Manga eliminado exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado
 *       404:
 *         description: Manga no encontrado
 */
router.delete('/:id', adminAuth, MangaController.deleteManga);

module.exports = router; 