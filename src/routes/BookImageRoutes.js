import { addBookImage, getBookImages, getBookImageById, getImagesByBookId, deleteBookImage } from "../controllers/BookImageController.js";
import { upload } from "../middlewares/uploads.js";
import express from "express";
import { authenticateToken, authorizeAuthorPublisher } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * 
 * @swagger
 *  /api/bookimage/addBookImage:
 *      post:
 *          summary: add book image
 *          tags: [BookImages]
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              file:
 *                                  type: file
 *                                  format: binary
 *                                  description: The image file to upload (only JPEG and PNG allowed)
 *                              bookId:
 *                                  type: string
 *                              description:
 *                                  type: string
 *                          required:
 *                              - file
 *                              - bookId
 *          responses:
 *              201:
 *                  description: add book image
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              500:
 *                  description: server error
 */
router.post('/addBookImage', upload.single('file'), authenticateToken, authorizeAuthorPublisher, addBookImage);

/**
 * 
 * @swagger
 *  /api/bookimage/getBookImages:
 *      get:
 *          summary: get book images
 *          tags: [BookImages]
 *          parameters:
 *              - in: query
 *                name: page
 *                schema:
 *                    type: number
 *                required: false
 *                description: page number
 *              - in: query
 *                name: pageSize
 *                schema:
 *                    type: number
 *                required: false
 *                description: page size
 *          responses:
 *              200:
 *                  description: get book images
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              500:
 *                  description: server error
 */
router.get('/getBookImages', authenticateToken, getBookImages);

/**
 * 
 * @swagger
 *  /api/bookimage/getBookImageById/{id}:
 *      get:
 *          summary: get book image by id
 *          tags: [BookImages]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: book image id
 *          responses:
 *              200:
 *                  description: get book image by id
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              404:
 *                  description: book image not found
 *              500:
 *                  description: server error
 */
router.get('/getBookImageById/:id', authenticateToken, getBookImageById);

/** 
 * 
 * @swagger
 *  /api/bookimage/getImagesByBookId/{id}:
 *      get:
 *          summary: get images by book id
 *          tags: [BookImages]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: book id
 *          responses:
 *              200:
 *                  description: get images by book id
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              404:
 *                  description: book not found
 *              500:
 *                  description: server error
 */
router.get('/getImagesByBookId/:id', authenticateToken, getImagesByBookId);

/**
 * 
 * @swagger
 *  /api/bookimage/deleteBookImage/{id}:
 *      delete:
 *          summary: delete book image
 *          tags: [BookImages]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                    type: string
 *                required: true
 *                description: book image id
 *          responses:
 *              200:
 *                  description: delete book image
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorized
 *              403:
 *                  description: Invalid token
 *              404:
 *                  description: book image not found
 *              500:
 *                  description: server error
 */
router.delete('/deleteBookImage/:id', authenticateToken, authorizeAuthorPublisher, deleteBookImage);

export default router;