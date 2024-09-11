import { createBookGenre, getBookGenres, getBookGenreById, updateBookGenre, deleteBookGenre } from "../controllers/BookGenresController.js";
import express from "express";
import { authenticateToken, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * 
 * @swagger
 *  /api/bookgenre/createBookGenre:
 *      post:
 *          summary: create book genre
 *          tags: [BookGenres]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BookGenre'
 *          responses:
 *              201:
 *                  description: create book genre
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              500:
 *                  description: server error
 */
router.post('/createBookGenre', authenticateToken, authorizeAdmin, createBookGenre);

/**
 * 
 * @swagger
 *  /api/bookgenre/getBookGenres:
 *      get:
 *          summary: get book genres
 *          tags: [BookGenres]
 *          responses:
 *              200:
 *                  description: get book genres
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              500:
 *                  description: server error
 */
router.get('/getBookGenres', authenticateToken, getBookGenres);


/**
 * 
 * @swagger
 *  /api/bookgenre/getBookGenreById/{id}:
 *      get:
 *          summary: get book genre by id
 *          tags: [BookGenres]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: book genre id
 *          responses:
 *              200:
 *                  description: get book genre by id
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              404:
 *                  description: book genre not found
 *              500:
 *                  description: server error
 */
router.get('/getBookGenreById/:id', authenticateToken, getBookGenreById);


/**
 * 
 * @swagger
 *  /api/bookgenre/updateBookGenre/{id}:
 *      put:
 *          summary: update book genre
 *          tags: [BookGenres]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: book genre id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BookGenre'
 *          responses:
 *              200:
 *                  description: update book genre
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              404:
 *                  description: book genre not found
 *              500:
 *                  description: server error
 */
router.put('/updateBookGenre/:id', authenticateToken, authorizeAdmin, updateBookGenre);


/**
 * 
 * @swagger
 *  /api/bookgenre/deleteBookGenre/{id}:
 *      delete:
 *          summary: delete book genre
 *          tags: [BookGenres]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: book genre id
 *          responses:
 *              200:
 *                  description: delete book genre
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              404:
 *                  description: book genre not found
 *              500:
 *                  description: server error
 */
router.delete('/deleteBookGenre/:id', authenticateToken, authorizeAdmin, deleteBookGenre);

export default router;