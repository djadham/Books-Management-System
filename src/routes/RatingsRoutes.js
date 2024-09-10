import { createRatings, getRatings, updateRatings, deleteRatings, getRatingsById } from "../controllers/RatingsController.js";
import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * 
 * @swagger
 *  /api/ratings/createRatings:
 *      post:
 *          summary: create ratings
 *          tags: [Ratings]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Ratings'
 *          responses:
 *              201:
 *                  description: create ratings
 *              400:
 *                  description: bad request
 *              500:
 *                  description: server error
 */
router.post('/createRatings', authenticateToken, createRatings);


/**
 * 
 * @swagger
 *  /api/ratings/getRatings:    
 *      get:
 *          summary: get ratings
 *          tags: [Ratings]
 *          responses:
 *              200:
 *                  description: get ratings
 *              400:
 *                  description: bad request
 *              500:
 *                  description: server error
 */
router.get('/getRatings', getRatings);


/**
 *  
 * @swagger
 *  /api/ratings/updateRatings/{id}:
 *      put:
 *          summary: update ratings
 *          tags: [Ratings]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: ratings id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Ratings'
 *          responses:
 *              200:
 *                  description: update ratings
 *              400:
 *                  description: bad request
 *              500:
 *                  description: server error
 */
router.put('/updateRatings/:id', authenticateToken, updateRatings);


/**
 *  
 * @swagger
 *  /api/ratings/getRatingsById/{id}:
 *      get:
 *          summary: get ratings by id
 *          tags: [Ratings]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: ratings id
 *          responses:
 *              200:
 *                  description: get ratings by id
 *              400:
 *                  description: bad request
 *              404:
 *                  description: ratings not found
 *              500:
 *                  description: server error
 */
router.get('/getRatingsById/:id', getRatingsById);

/**
 * 
 * @swagger
 *  /api/ratings/deleteRatings/{id}:
 *      delete:
 *          summary: delete ratings
 *          tags: [Ratings]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: ratings id
 *          responses:
 *              200:
 *                  description: delete ratings
 *              400:
 *                  description: bad request
 *              500:
 *                  description: server error
 */
router.delete('/deleteRatings/:id', authenticateToken, deleteRatings);

export default router;