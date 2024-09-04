import { createBookPublisher, getBookPublishers, getBookPublishersById, updateBookPublisher, deleteBookPublisher } from "../controllers/BookPublishersController.js";
import express from "express";

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
 *              500:
 *                  description: server error
 */
router.post('/createBookPublisher', createBookPublisher);

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
 *              500:
 *                  description: server error
 */
router.get('/getBookPublishers', getBookPublishers);


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
 *              404:
 *                  description: book publisher not found
 *              500:
 *                  description: server error
 */
router.get('/getBookPublishersById/:id', getBookPublishersById);


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
 *              404:
 *                  description: book publisher not found
 *              500:
 *                  description: server error
 */
router.put('/updateBookPublisher/:id', updateBookPublisher);


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
 *              404:
 *                  description: book publisher not found
 *              500:
 *                  description: server error
 */
router.delete('/deleteBookPublisher/:id', deleteBookPublisher);




export default router;