import { getPublishers, getPublisherById, createPublisher, updatePublisher, softDeletePublisher, restorePublisher, deletePublisher } from "../controllers/PublishersController.js";
import express from "express";

const router = express.Router();

// publishers apis

/**
 * 
 * @swagger
 *  /api/publishers/createPublisher:
 *      post:
 *          summary: create publisher
 *          tags: [Publishers]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          responses:
 *              201:
 *                  description: create publisher
 *              400:
 *                  description: bad request
 *              500:
 *                  description: server error 
 */
router.post('/createPublisher', createPublisher);

/**
 * 
 * @swagger
 *  /api/publishers/getPublishers:
 *      get:
 *          summary: get all publishers
 *          tags: [Publishers]
 *          responses:
 *              200:
 *                  description: get all publishers
 *              500:
 *                  description: server error
 */
router.get('/getPublishers', getPublishers);


/**
 * 
 * @swagger
 *  /api/publishers/getPublisherById/{id}:
 *      get:
 *          summary: get publisher by id
 *          tags: [Publishers]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: publisher id
 *          responses:
 *              200:
 *                  description: get publisher by id
 *              400:
 *                  description: bad request
 *              404:
 *                  description: publisher not found
 *              500:
 *                  description: server error
 */
router.get('/getPublisherById/:id', getPublisherById);

/** 
 * 
 * @swagger
 *  /api/publishers/updatePublisher/{id}:
 *      put:
 *          summary: update publisher
 *          tags: [Publishers]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: publisher id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          responses:
 *              200:
 *                  description: update publisher
 *              400:
 *                  description: bad request
 *              404:
 *                  description: publisher not found
 *              500:
 *                  description: server error
 */
router.put('/updatePublisher/:id', updatePublisher);


/**
 * 
 * @swagger
 *  /api/publishers/softDeletePublisher/{id}:
 *      delete:
 *          summary: soft delete publisher
 *          tags: [Publishers]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: publisher id
 *          responses:
 *              200:
 *                  description: soft delete publisher
 *              400:
 *                  description: bad request
 *              404:
 *                  description: publisher not found
 *              500:
 *                  description: server error
 */
router.delete('/softDeletePublisher/:id', softDeletePublisher);

/**
 * 
 * @swagger
 *  /api/publishers/restorePublisher/{id}:
 *      put:
 *          summary: restore publisher
 *          tags: [Publishers]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: publisher id
 *          responses:
 *              200:
 *                  description: restore publisher
 *              400:
 *                  description: bad request
 *              404:
 *                  description: publisher not found
 *              500:
 *                  description: server error
 */
router.put('/restorePublisher/:id', restorePublisher);

/**
 * 
 * @swagger
 *  /api/publishers/deletePublisher/{id}:
 *      delete:
 *          summary: delete publisher
 *          tags: [Publishers]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: publisher id
 *          responses:
 *              200:
 *                  description: delete publisher
 *              400:
 *                  description: bad request
 *              404:
 *                  description: publisher not found
 *              500:
 *                  description: server error
 */
router.delete('/deletePublisher/:id', deletePublisher);


export default router;