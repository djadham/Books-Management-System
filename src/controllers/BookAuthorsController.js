import BookAuthors from "../models/BookAuthorsModel.js";
import Books from "../models/BooksModel.js";
import Users from "../models/UsersModel.js";
import { BookAuthorsSchema } from "../validators/validator.js";

export const createBookAuthor = async (req, res) => {

    const { error } = BookAuthorsSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        const book = await Books.findOne({ where: { id: req.body.bookId, deletedAt: null } });
        if (!book) {
            return res.status(404).send({
                message: "Book not found",
            });
        }
        const author = await Users.findOne({ where: { id: req.body.authorId, deletedAt: null } });
        if (!author) {
            return res.status(404).send({
                message: "Author not found",
            });
        }
        const existingBookAuthor = await BookAuthors.findOne({ where: { bookId: req.body.bookId } });
        if (existingBookAuthor) {
            return res.status(409).send({
                message: "Book author already exists",
            });
        }

        const bookAuthor = await BookAuthors.create(req.body);
        res.status(201).json(bookAuthor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getBookAuthors = async (req, res) => {

    try {
        const book = await Books.findAll({ where: { deletedAt: null } });
        if (!book) {
            return res.status(404).send({
                message: "Book not found",
            });
        }
        const bookAuthors = await BookAuthors.findAll({ where: { deletedAt: null} });
        res.status(200).json(bookAuthors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getBookAuthorById = async (req, res) => {

    try {
        const bookAuthor = await BookAuthors.findOne({ where: { id: req.params.id, deletedAt: null } });
        if (!bookAuthor) {
            return res.status(404).send({
                message: "Book author not found",
            });
        }
        res.status(200).json(bookAuthor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateBookAuthor = async (req, res) => {
    const { error } = BookAuthorsSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const book = await Books.findOne({ where: { id: req.body.bookId, deletedAt: null } });
    if (!book) {
        return res.status(404).send({
            message: "Book with given id is not found",
        });
    }

    const author = await Users.findOne({ where: { id: req.body.authorId, deletedAt: null } });
    if (!author) {
        return res.status(404).send({
            message: "Author with given id is not found",
        });
    }

    try {
        const result = await BookAuthors.update(req.body, { where: { id: req.params.id, deletedAt: null } });
        if (result[0] === 0) {
            return res.status(404).json({ message: "Book author not found" });
        }    
        res.status(200).json(req.body);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteBookAuthor = async (req, res) => {
    try {
        const result = await BookAuthors.update({ deletedAt: new Date() }, { where: { id: req.params.id, deletedAt: null } });
        if (result[0] === 0) {
            return res.status(404).json({ message: "Book author not found" });
        }    
        res.status(200).json({ message: "Book author deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}