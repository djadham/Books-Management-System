import express from "express";
import { getBooks, getBookById, createBook, updateBook, softDeleteBook, restoreBook, deleteBook } from "../controllers/BooksController.js";
import { authenticateToken, authorizeAuthorPublisher } from "../middlewares/authMiddleware.js";

const router = express.Router();

// books apis
/**
 * @swagger
 * /api/books/getBooks:
 *  get:
 *      summary: get all books
 *      tags: [Books]
 *      parameters:
 *          - in: query
 *            name: page
 *            schema:
 *                type: number
 *            required: false
 *            description: page number
 *          - in: query
 *            name: pageSize
 *            schema:
 *                type: number
 *            required: false
 *            description: page size
 *      responses:
 *          200:
 *              description: get all books
 *          400:
 *              description: bad request
 *          500:
 *              description: server error
 */
router.get('/getBooks', getBooks);
/**
 * 
 * @swagger
 *  /api/books/getBookById/{id}:
 *      get:
 *          summary: get book by id
 *          tags: [Books]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: book id
 *          responses:
 *              200:
 *                  description: get book by id
 *              400:
 *                  description: bad request
 *              404:
 *                  description: book not found
 *              500:
 *                  description: server error
 */ 
router.get('/getBookById/:id', getBookById);
/**
 * 
 * @swagger
 *  /api/books/createBook:
 *      post:
 *          summary: create book
 *          tags: [Books]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Book'
 *          responses:
 *              200:
 *                  description: create book
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              500:
 *                  description: server error
 */
router.post('/createBook', authenticateToken, authorizeAuthorPublisher, createBook);
/**
 * 
 * @swagger
 *  /api/books/updateBook/{id}:
 *      put:
 *          summary: update book
 *          tags: [Books]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: book id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Book'
 *          responses:
 *              200:
 *                  description: update book
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              404:
 *                  description: book not found
 *              500:
 *                  description: server error
 */
router.put('/updateBook/:id', authenticateToken, authorizeAuthorPublisher, updateBook);
/**
 * 
 * @swagger
 *  /api/books/softDeleteBook/{id}:
 *      delete:
 *          summary: soft delete book
 *          tags: [Books]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: book id
 *          responses:
 *              200:
 *                  description: soft delete book
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              404:
 *                  description: book not found
 *              500:
 *                  description: server error
 */
router.delete('/softDeleteBook/:id', authenticateToken, authorizeAuthorPublisher, softDeleteBook);
/**
 * 
 * @swagger
 *  /api/books/restoreBook/{id}:
 *      put:
 *          summary: restore book
 *          tags: [Books]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: book id
 *          responses:
 *              200:
 *                  description: restore book
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              404:
 *                  description: book not found
 *              500:
 *                  description: server error
 */
router.put('/restoreBook/:id', authenticateToken, authorizeAuthorPublisher, restoreBook);
/**
 * 
 * @swagger
 *  /api/books/deleteBook/{id}:
 *      delete:
 *          summary: delete book
 *          tags: [Books]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: book id
 *          responses:
 *              200:
 *                  description: delete book
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              404:
 *                  description: book not found
 *              500:
 *                  description: server error
 */
router.delete('/deleteBook/:id', authenticateToken, authorizeAuthorPublisher, deleteBook);

export default router;