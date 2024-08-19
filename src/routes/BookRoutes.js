import express from "express";
import { getBooks, getBookById, createBook, updateBook, softDeleteBook, restoreBook, deleteBook } from "../controllers/BooksController.js";

const router = express.Router();

// books apis
/**
 * @swagger
 * /api/books/getBooks:
 *  get:
 *      summary: get all books
 *      tags: [Books]
 *      responses:
 *          200:
 *              description: get all books
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
 *              500:
 *                  description: server error
 */
router.post('/createBook', createBook);
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
 *              404:
 *                  description: book not found
 *              500:
 *                  description: server error
 */
router.put('/updateBook/:id', updateBook);
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
 *              404:
 *                  description: book not found
 *              500:
 *                  description: server error
 */
router.delete('/softDeleteBook/:id', softDeleteBook);
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
 *              404:
 *                  description: book not found
 *              500:
 *                  description: server error
 */
router.put('/restoreBook/:id', restoreBook);
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
 *              404:
 *                  description: book not found
 *              500:
 *                  description: server error
 */
router.delete('/deleteBook/:id', deleteBook);

export default router;