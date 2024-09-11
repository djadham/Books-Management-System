import { createBookPublisher, getBookPublishers, getBookPublishersById, updateBookPublisher, deleteBookPublisher } from "../controllers/BookPublishersController.js";
import express from "express";
import { authenticateToken, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * 
 * @swagger
 *  /api/bookpublisher/createBookPublisher:
 *      post:
 *          summary: create book publisher
 *          tags: [BookPublishers]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BookPublisher'
 *          responses:
 *              201:
 *                  description: create book publisher
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              500:
 *                  description: server error
 */
router.post('/createBookPublisher', authenticateToken, authorizeAdmin, createBookPublisher);

/**
 * 
 * @swagger
 *  /api/bookpublisher/getBookPublishers:
 *      get:
 *          summary: get all book publishers
 *          tags: [BookPublishers]
 *          responses:
 *              200:
 *                  description: get all book publishers
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              500:
 *                  description: server error
 */
router.get('/getBookPublishers', authenticateToken, getBookPublishers);


/**
 * 
 * @swagger
 *  /api/bookpublisher/getBookPublishersById/{id}:
 *      get:
 *          summary: get book publisher by id
 *          tags: [BookPublishers]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: book publisher id
 *          responses:
 *              200:
 *                  description: get book publisher by id
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              404:
 *                  description: book publisher not found
 *              500:
 *                  description: server error
 */
router.get('/getBookPublishersById/:id', authenticateToken, getBookPublishersById);


/**
 * 
 * @swagger
 *  /api/bookpublisher/updateBookPublisher/{id}:
 *      put:
 *          summary: update book publisher
 *          tags: [BookPublishers]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: book publisher id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/BookPublisher'
 *          responses:
 *              200:
 *                  description: update book publisher
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              404:
 *                  description: book publisher not found
 *              500:
 *                  description: server error
 */
router.put('/updateBookPublisher/:id', authenticateToken, authorizeAdmin, updateBookPublisher);


/**
 * 
 * @swagger
 *  /api/bookpublisher/deleteBookPublisher/{id}:
 *      delete:
 *          summary: delete book publisher
 *          tags: [BookPublishers]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: book publisher id
 *          responses:
 *              200:
 *                  description: delete book publisher
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              404:
 *                  description: book publisher not found
 *              500:
 *                  description: server error
 */
router.delete('/deleteBookPublisher/:id', authenticateToken, authorizeAdmin, deleteBookPublisher);

export default router;