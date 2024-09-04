import Reviews from "../models/ReviewsModel.js";
import {ReviewsSchema} from "../validators/validator.js";
import Books from "../models/BooksModel.js";
import Users from "../models/UsersModel.js";

export const createReview = async (req, res) => {
    const { bookId, userId, rating, comment } = req.body;
    const { error } = ReviewsSchema.validate( req.body );
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        const checkUser = await Users.findOne({ where: { id: userId } });
        if (!checkUser) {
            return res.status(404).send({ message: "User not found" });
        }
        const checkBook = await Books.findOne({ where: { id: bookId } });
        if (!checkBook) {
            return res.status(404).send({ message: "Book not found" });
        }
        const checkReview = await Reviews.findOne({ where: { userId: userId, bookId: bookId } });
        if (checkReview) {
            return res.status(409).send({ message: "Review already exists, You can update it" });
        }
        const result = await Reviews.create({ bookId, userId, rating, comment });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getReviews = async (req, res) => {
    try {
        const reviews = await Reviews.findAll();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getReviewById = async (req, res) => {
    try {
        const review = await Reviews.findOne({ where: { id: req.params.id } });
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateReview = async (req, res) => {
    const { error } = ReviewsSchema.validate(req.body);
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
        const result = await Reviews.update(req.body, { where: { id: req.params.id } });
        if (result[0] === 0) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json(req.body);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteReview = async (req, res) => {
    try {
        const review = await Reviews.findOne({ where: { id: req.params.id } });
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        await Reviews.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {   
        res.status(500).json({ message: error.message });
    }
}