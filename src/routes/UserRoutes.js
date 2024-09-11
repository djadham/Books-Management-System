import { getUsers, createUser, getUserById, updateUser, softDeleteUser, restoreUser, deleteUser } from "../controllers/UserController.js";
import express from "express";
import { authenticateToken, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// users apis
/**
 * 
 * @swagger
 *  /api/users/getUsers:
 *      get:
 *          summary: get all users
 *          tags: [Users]
 *          responses:
 *              200:
 *                  description: get all users
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              500:
 *                  description: server error
 */
router.get('/getUsers', authenticateToken, getUsers);
/**
 * 
 * @swagger
 *  /api/users/getUserById/{id}:
 *      get:
 *          summary: get user by id
 *          tags: [Users]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: user id
 *          responses:
 *              200:
 *                  description: get user by id
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              404:
 *                  description: user not found
 *              500:
 *                  description: server error
 */
router.get('/getUserById/:id', authenticateToken, getUserById);
/**
 * 
 * @swagger
 *  /api/users/createUser:
 *      post:
 *          summary: create user
 *          tags: [Users]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          responses:
 *              201:
 *                  description: create user
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              500:
 *                  description: server error
 */
router.post('/createUser', authenticateToken, authorizeAdmin, createUser);
/**
 * 
 * @swagger
 *  /api/users/updateUser/{id}:
 *      put:
 *          summary: update user
 *          tags: [Users]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: user id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          responses:
 *              200:
 *                  description: update user
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              404:
 *                  description: user not found
 *              500:
 *                  description: server error
 */
router.put('/updateUser/:id', authenticateToken, authorizeAdmin, updateUser);
/**
 * 
 * @swagger
 *  /api/users/softDeleteUser/{id}:
 *      delete:
 *          summary: soft delete user
 *          tags: [Users]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: user id
 *          responses:
 *              200:
 *                  description: soft delete user
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              404:
 *                  description: user not found
 *              500:
 *                  description: server error
 */
router.delete('/softDeleteUser/:id', authenticateToken, authorizeAdmin, softDeleteUser);
/**
 * 
 * @swagger
 *  /api/users/restoreUser/{id}:
 *      put:
 *          summary: restore user
 *          tags: [Users]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: user id
 *          responses:
 *              200:
 *                  description: restore user
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              404:
 *                  description: user not found
 *              500:
 *                  description: server error
 */
router.put('/restoreUser/:id', authenticateToken, authorizeAdmin, restoreUser);
/**
 * 
 * @swagger
 *  /api/users/deleteUser/{id}:
 *      delete:
 *          summary: delete user
 *          tags: [Users]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: user id
 *          responses:
 *              200:
 *                  description: delete user
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              404:
 *                  description: user not found
 *              500:
 *                  description: server error
 */
router.delete('/deleteUser/:id', authenticateToken, authorizeAdmin, deleteUser);

export default router;