import { addBookImage, getBookImages, getBookImageById, deleteBookImage } from "../controllers/BookImageController.js";
import { upload } from "../middlewares/uploads.js";
import express from "express";


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
 *                          $ref: '#/components/schemas/BookImage'
 *          responses:
 *              201:
 *                  description: add book image
 *              400:
 *                  description: bad request
 *              500:
 *                  description: server error
 */
router.post('/addBookImage', upload.single('file'), addBookImage);

/**
 * 
 * @swagger
 *  /api/bookimage/getBookImages:
 *      get:
 *          summary: get book images
 *          tags: [BookImages]
 *          responses:
 *              200:
 *                  description: get book images
 *              500:
 *                  description: server error
 */
router.get('/getBookImages', getBookImages);

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
 *              404:
 *                  description: book image not found
 *              500:
 *                  description: server error
 */
router.get('/getBookImageById/:id', getBookImageById);

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
 *              404:
 *                  description: book image not found
 *              500:
 *                  description: server error
 */
router.delete('/deleteBookImage/:id', deleteBookImage);

export default router;