import {getGenres, getGenreById, createGenre, updateGenre, softDeleteGenre, restoreGenre, deleteGenre } from '../controllers/GenresController.js';
import express from 'express';

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
 *              500:
 *                  description: server error
 */
router.get('/getGenres', getGenres);


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
 *              404:
 *                  description: genre not found
 *              500:
 *                  description: server error
 */
router.get('/getGenreById/:id', getGenreById);


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
 *              500:
 *                  description: server error
 */
router.post('/createGenre', createGenre);


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
 *              404:
 *                  description: genre not found
 *              500:
 *                  description: server error
 */
router.put('/updateGenre/:id', updateGenre);


/**
 *  
 * @swagger
 *  /api/genres/softDeleteGenre/{id}:
 *      put:
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
 *              404:
 *                  description: genre not found
 *              500:
 *                  description: server error
 */
router.put('/softDeleteGenre/:id', softDeleteGenre);


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
 *              404:
 *                  description: genre not found
 *              500:
 *                  description: server error
 */
router.put('/restoreGenre/:id', restoreGenre);

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
 *              404:
 *                  description: genre not found
 *              500:
 *                  description: server error
 */
router.delete('/deleteGenre/:id', deleteGenre);

export default router;