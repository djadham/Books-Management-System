import { getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor, restoreAuthor, softDeleteAuthor } from "../controllers/AuthorsController.js";
import express from "express";
import { authenticateToken, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// authors apis
/**
 * 
 * @swagger
 *  /api/authors/getAuthors:
 *      get:
 *          summary: get all authors
 *          tags: [Authors]
 *          responses:
 *              200:
 *                  description: get all authors
 *              500:
 *                  description: server error
 */
router.get('/getAuthors', authenticateToken, getAuthors);


/**
 *  
 * @swagger
 *  /api/authors/getAuthorById/{id}:
 *      get:
 *          summary: get author by id
 *          tags: [Authors]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: author id
 *          responses:
 *              200:
 *                  description: get author by id
 *              400:
 *                  description: bad request
 *              404:
 *                  description: author not found
 *              500:
 *                  description: server error
 */
router.get('/getAuthorById/:id', authenticateToken, getAuthorById);


/**
 * 
 * @swagger
 *  /api/authors/createAuthor:
 *      post:
 *          summary: create author
 *          tags: [Authors]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          responses:
 *              201:
 *                  description: create author
 *              400:
 *                  description: bad request
 *              500:
 *                  description: server error
 */
router.post('/createAuthor', authenticateToken, authorizeAdmin, createAuthor);

/**
 * 
 * @swagger
 *  /api/authors/updateAuthor/{id}:
 *      put:
 *          summary: update author
 *          tags: [Authors]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: author id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          responses:
 *              200:
 *                  description: update author
 *              400:
 *                  description: bad request
 *              404:
 *                  description: author not found
 *              500:
 *                  description: server error
 */
router.put('/updateAuthor/:id', authenticateToken, authorizeAdmin, updateAuthor);

/**
 * 
 * @swagger
 *  /api/authors/softDeleteAuthor/{id}:
 *      delete:
 *          summary: soft delete author
 *          tags: [Authors]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: author id
 *          responses:
 *              200:
 *                  description: soft delete author
 *              400:
 *                  description: bad request
 *              404:
 *                  description: author not found
 *              500:
 *                  description: server error
 */
router.delete('/softDeleteAuthor/:id', authenticateToken, authorizeAdmin, softDeleteAuthor);

/**
 * 
 * @swagger
 *  /api/authors/restoreAuthor/{id}:
 *      put:
 *          summary: restore author
 *          tags: [Authors]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: author id
 *          responses:
 *              200:
 *                  description: restore author
 *              400:
 *                  description: bad request
 *              404:
 *                  description: author not found
 *              500:
 *                  description: server error
 */
router.put('/restoreAuthor/:id', authenticateToken, authorizeAdmin, restoreAuthor);

/** 
 * 
 * @swagger
 *  /api/authors/deleteAuthor/{id}:
 *      delete:
 *          summary: delete author
 *          tags: [Authors]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: author id
 *          responses:
 *              200:
 *                  description: delete author
 *              400:
 *                  description: bad request
 *              404:
 *                  description: author not found
 *              500:
 *                  description: server error
 */
router.delete('/deleteAuthor/:id', authenticateToken, authorizeAdmin, deleteAuthor);

export default router;