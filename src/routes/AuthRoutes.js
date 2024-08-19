import {registerUser, userLogin, profile} from '../controllers/AuthController.js';
import express from "express";
import { authenticateToken, authorizeProfileAccess } from "../middlewares/authMiddleware.js";

const router = express.Router();

// auth apis
/**
 * 
 * @swagger
 *  /api/auth/registerUser:
 *      post:
 *          summary: register user
 *          tags: [Auth]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Register'
 *          responses:
 *              201:
 *                  description: register user
 *              400:
 *                  description: bad request
 *              500:
 *                  description: server error
 */
router.post('/registerUser', registerUser);
/**
 * 
 * @swagger
 *  /api/auth/userLogin:
 *      post:
 *          summary: user login
 *          tags: [Auth]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Login'
 *          responses:
 *              200:
 *                  description: user login
 *              400:
 *                  description: bad request
 *              500:
 *                  description: server error
 */
router.post('/userLogin', userLogin);
/**
 * 
 * @swagger
 *  /api/auth/profile/{id}:
 *      get:
 *          summary: get user profile
 *          tags: [Auth]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: user id
 *          responses:
 *              200:
 *                  description: get user profile
 *              400:
 *                  description: bad request
 *              401: 
 *                  description: unauthorized
 *              403:
 *                  description: Invalid Token
 *              404:
 *                  description: user not found
 *              500:
 *                  description: server error
 */
router.get('/profile/:id',authenticateToken, authorizeProfileAccess, profile);

export default router;
