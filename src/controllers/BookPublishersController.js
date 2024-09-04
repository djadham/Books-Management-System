import BookPublishers from "../models/BookPublishersModel.js";
import { BookPublisherSchema } from "../validators/validator.js";
import Books from "../models/BooksModel.js";
import Users from "../models/UsersModel.js";

export const createBookPublisher = async (req, res) => {
    const { error } = BookPublisherSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const checkBook = await Books.findOne({ where: { id: req.body.bookId } });
    if (!checkBook) {
        return res.status(404).send({ message: "Book not found" });
    }

    const checkUser = await Users.findOne({ where: { id: req.body.publisherId, roles: "publisher" } });
    if (!checkUser) {
        return res.status(404).send({ message: "User not found" });
    }

    const checkBookPublisher = await BookPublishers.findOne({ where: { bookId: req.body.bookId, publisherId: req.body.publisherId } });
    if (checkBookPublisher) {
        return res.status(409).send({ message: "Book publisher already exists" });
    }

    try {
        const bookPublisher = await BookPublishers.create(req.body);
        res.status(201).json(bookPublisher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getBookPublishers = async (req, res) => {
    try {
        const bookPublisher = await BookPublishers.findAll();
        if (!bookPublisher) {
            return res.status(404).json({ message: "Book publisher not found" });
        }
        res.status(200).json(bookPublisher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getBookPublishersById = async (req, res) => {
    try{
        const bookPublishers = await BookPublishers.findOne({ where: { id: req.params.id }});
        res.status(200).json(bookPublishers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const updateBookPublisher = async (req, res) => {
    const { error } = BookPublisherSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const checkBook = await Books.findOne({ where: { id: req.body.bookId } });
    if (!checkBook) {
        return res.status(404).send({ message: "Book not found" });
    }

    const checkUser = await Users.findOne({ where: { id: req.body.publisherId, roles: "publisher" } });
    if (!checkUser) {
        return res.status(404).send({ message: "User not found" });
    }

    try {
        const result = await BookPublishers.update(req.body, { where: { id: req.params.id } });
        if (result[0] === 0) {
            return res.status(404).json({ message: "Book publisher not found" });
        }
        res.status(200).json(req.body);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteBookPublisher = async ( req, res ) => {
    try {
        const result = await BookPublishers.update({ deletedAt: new Date() }, { where: { id: req.params.id } });
        if (result[0] === 0) {
            return res.status(404).json({ message: "Book publisher not found" });
        }
        res.status(200).json({ message: "Book publisher deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}