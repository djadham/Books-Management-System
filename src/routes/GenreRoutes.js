import {getGenres, getGenreById, createGenre, updateGenre, softDeleteGenre, restoreGenre, deleteGenre } from '../controllers/GenresController.js';
import express from 'express';
import { authenticateToken, authorizeAuthorPublisher } from '../middlewares/authMiddleware.js';

const router = express.Router();

// genres apis
/**
 * 
 * @swagger
 *  /api/genres/getGenres:
 *      get:
 *          summary: get all genres
 *          tags: [Genres]
 *          responses:
 *              200:
 *                  description: get all genres
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              500:
 *                  description: server error
 */
router.get('/getGenres', authenticateToken, getGenres);


/**
 * 
 * @swagger
 *  /api/genres/getGenreById/{id}:
 *      get:
 *          summary: get genre by id
 *          tags: [Genres]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: genre id
 *          responses:
 *              200:
 *                  description: get genre by id
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              404:
 *                  description: genre not found
 *              500:
 *                  description: server error
 */
router.get('/getGenreById/:id', authenticateToken, getGenreById);


/**
 * 
 * @swagger
 *  /api/genres/createGenre:
 *      post:
 *          summary: create genre
 *          tags: [Genres]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Genre'
 *          responses:
 *              201:
 *                  description: create genre
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              500:
 *                  description: server error
 */
router.post('/createGenre', authenticateToken, authorizeAuthorPublisher, createGenre);


/**
 * 
 * @swagger
 *  /api/genres/updateGenre/{id}:
 *      put:
 *          summary: update genre
 *          tags: [Genres]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: genre id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Genre'
 *          responses:
 *              200:
 *                  description: update genre
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              404:
 *                  description: genre not found
 *              500:
 *                  description: server error
 */
router.put('/updateGenre/:id', authenticateToken, authorizeAuthorPublisher, updateGenre);


/**
 *  
 * @swagger
 *  /api/genres/softDeleteGenre/{id}:
 *      delete:
 *          summary: soft delete genre
 *          tags: [Genres]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: genre id
 *          responses:
 *              200:
 *                  description: soft delete genre
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              404:
 *                  description: genre not found
 *              500:
 *                  description: server error
 */
router.delete('/softDeleteGenre/:id', authenticateToken, authorizeAuthorPublisher, softDeleteGenre);


/**
 * 
 * @swagger
 *  /api/genres/restoreGenre/{id}:
 *      put:
 *          summary: restore genre
 *          tags: [Genres]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: genre id
 *          responses:
 *              200:
 *                  description: restore genre
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              404:
 *                  description: genre not found
 *              500:
 *                  description: server error
 */
router.put('/restoreGenre/:id', authenticateToken, authorizeAuthorPublisher, restoreGenre);

/**
 * 
 * @swagger
 *  /api/genres/deleteGenre/{id}:
 *      delete:
 *          summary: delete genre
 *          tags: [Genres]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: genre id
 *          responses:
 *              200:
 *                  description: delete genre
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              404:
 *                  description: genre not found
 *              500:
 *                  description: server error
 */
router.delete('/deleteGenre/:id', authenticateToken, authorizeAuthorPublisher, deleteGenre);

export default router;