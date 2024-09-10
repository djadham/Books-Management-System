import { createBookAuthor, getBookAuthors, getBookAuthorById, updateBookAuthor, deleteBookAuthor } from "../controllers/BookAuthorsController.js";
import express from "express";
import { authenticateToken, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 *  
 * @swagger
 *  /api/bookauthor/createBookAuthor:
 *      post:
 *          summary: create book author
 *          tags: [BookAuthors]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BookAuthors'
 *          responses:
 *              201:
 *                  description: create book author
 *              400:
 *                  description: bad request
 *              500:
 *                  description: server error
 */
router.post('/createBookAuthor', authenticateToken, authorizeAdmin, createBookAuthor);

/**
 * 
 * @swagger
 *  /api/bookauthor/getBookAuthors:
 *      get:
 *          summary: get all book authors
 *          tags: [BookAuthors]
 *          responses:
 *              200:
 *                  description: get all book authors
 *              500:
 *                  description: server error
 */
router.get('/getBookAuthors', authenticateToken, getBookAuthors);

/**
 * 
 * @swagger
 *  /api/bookauthor/getBookAuthorById/{id}:
 *      get:
 *          summary: get book author by id
 *          tags: [BookAuthors]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: book author id
 *          responses:
 *              200:
 *                  description: get book author by id
 *              400:
 *                  description: bad request
 *              404:
 *                  description: book author not found
 *              500:
 *                  description: server error
 */
router.get('/getBookAuthorById/:id', authenticateToken, getBookAuthorById);


/**
 * 
 * @swagger
 *  /api/bookauthor/updateBookAuthor/{id}:
 *      put:
 *          summary: update book author
 *          tags: [BookAuthors]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: book author id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BookAuthors'
 *          responses:
 *              200:
 *                  description: update book author
 *              400:
 *                  description: bad request
 *              404:
 *                  description: book author not found
 *              500:
 *                  description: server error
 */
router.put('/updateBookAuthor/:id', authenticateToken, authorizeAdmin, updateBookAuthor);


/**
 * 
 * @swagger
 *  /api/bookauthor/deleteBookAuthor/{id}:
 *      delete:
 *          summary: delete book author
 *          tags: [BookAuthors]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: book author id
 *          responses:
 *              200:
 *                  description: delete book author
 *              400:
 *                  description: bad request
 *              404:
 *                  description: book author not found
 *              500:
 *                  description: server error
 */
router.delete('/deleteBookAuthor/:id', authenticateToken, authorizeAdmin, deleteBookAuthor);

export default router;