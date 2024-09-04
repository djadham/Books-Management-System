import { createReview, getReviews, getReviewById, updateReview, deleteReview } from "../controllers/ReviewsController.js";
import express from "express";


const router = express.Router();

/**
 * 
 * @swagger
 *  /api/reviews/createReview:
 *      post:
 *          summary: create review
 *          tags: [Reviews]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Reviews'
 *          responses:
 *              201:
 *                  description: create review
 *              400:
 *                  description: bad request
 *              500:
 *                  description: server error
 */
router.post('/createReview', createReview);

/**
 * 
 * @swagger
 *  /api/reviews/getReviews:
 *      get:
 *          summary: get reviews
 *          tags: [Reviews]
 *          responses:
 *              200:
 *                  description: get reviews
 *              400:
 *                  description: bad request
 *              500:
 *                  description: server error
 */
router.get('/getReviews', getReviews);

/**
 * 
 * @swagger
 *  /api/reviews/getReviewById/{id}:
 *      get:
 *          summary: get review by id
 *          tags: [Reviews]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: review id
 *          responses:
 *              200:
 *                  description: get review by id
 *              400:
 *                  description: bad request
 *              404:
 *                  description: review not found
 *              500:
 *                  description: server error
 */
router.get('/getReviewById/:id', getReviewById);

/**
 * 
 * @swagger
 *  /api/reviews/updateReview/{id}:
 *      put:
 *          summary: update review
 *          tags: [Reviews]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: review id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Reviews'
 *          responses:
 *              200:
 *                  description: update review
 *              400:
 *                  description: bad request
 *              500:
 *                  description: server error
 */
router.put('/updateReview/:id', updateReview);

/**
 * 
 * @swagger
 *  /api/reviews/deleteReview/{id}:
 *      delete:
 *          summary: delete review
 *          tags: [Reviews]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: review id
 *          responses:
 *              200:
 *                  description: delete review
 *              400:
 *                  description: bad request
 *              404:
 *                  description: review not found
 *              500:
 *                  description: server error
 */
router.delete('/deleteReview/:id', deleteReview);


export default router;