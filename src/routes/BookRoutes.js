import express from "express";
import { getBooks, getBookById, createBook, updateBook, softDeleteBook, restoreBook, deleteBook } from "../controllers/BooksController.js";

const router = express.Router();

// books apis
router.get('/getBooks', getBooks);
router.get('/getBookById/:id', getBookById);
router.post('/createBook', createBook);
router.put('/updateBook/:id', updateBook);
router.delete('/softDeleteBook/:id', softDeleteBook);
router.put('/restoreBook/:id', restoreBook);
router.delete('/deleteBook/:id', deleteBook);

export default router;