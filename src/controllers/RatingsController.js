import Ratings from "../models/RatingsModel.js";
import {RatingsSchema} from "../validators/validator.js";
import Users from "../models/UsersModel.js";
import Books from "../models/BooksModel.js";

export const createRatings = async (req, res) => {
    const { error } = RatingsSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const checkUser = await Users.findOne({ where: { id: req.body.userId } });
    if (!checkUser) {
        return res.status(404).send({ message: "User not found" });
    }
    const checkBook = await Books.findOne({ where: { id: req.body.bookId } });
    if (!checkBook) {
        return res.status(404).send({ message: "Book not found" });
    }

    const checkRatings = await Ratings.findOne({ where: { userId: req.body.userId, bookId: req.body.bookId } });
    if (checkRatings) {
        return res.status(409).send({ message: "Ratings already exists" });
    }

    try {
        const ratings = await Ratings.create(req.body);
        res.status(201).json(ratings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getRatings = async (req, res) => {
    try {
        const ratings = await Ratings.findAll();
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateRatings = async (req, res) => {
    const { error } = RatingsSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const checkUser = await Users.findOne({ where: { id: req.body.userId } });
    if (!checkUser) {
        return res.status(404).send({ message: "User not found" });
    }

    const checkBook = await Books.findOne({ where: { id: req.body.bookId } });
    if (!checkBook) {
        return res.status(404).send({ message: "Book not found" });
    }

    try {
        const result = await Ratings.update(req.body, { where: { id: req.params.id } });
        if (result[0] === 0) {
            return res.status(404).json({ message: "Ratings not found" });
        }
        res.status(200).json(req.body);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getRatingsById = async (req, res) => {
    try {
        const ratings = await Ratings.findOne({ where: { id: req.params.id } });
        if (!ratings) {
            return res.status(404).json({ message: "Ratings not found" });
        }
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteRatings = async (req, res) => {
    try {
        const result = await Ratings.destroy({ where: { id: req.params.id } });
        if (result === 0) {
            return res.status(404).json({ message: "Ratings not found" });
        }
        res.status(200).json({ message: "Ratings deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}