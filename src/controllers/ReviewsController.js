import Reviews from "../models/ReviewsModel.js";
import {ReviewsSchema} from "../validators/validator.js";
import Books from "../models/BooksModel.js";
import Users from "../models/UsersModel.js";
import { NotFoundError, ValidationError } from "../middlewares/errorHandler.js";

export const createReview = async (req, res, next) => {
    const { bookId, userId, rating, comment } = req.body;
    const { error } = ReviewsSchema.validate( req.body );
    if (error) {
        return next(new ValidationError(error.details[0].message));
    }
    try {
        const checkUser = await Users.findOne({ where: { id: userId } });
        if (!checkUser) {
            return next(new NotFoundError("User not found"));
        }
        const checkBook = await Books.findOne({ where: { id: bookId } });
        if (!checkBook) {
            return next(new NotFoundError("Book not found"));
        }
        const checkReview = await Reviews.findOne({ where: { userId: userId, bookId: bookId } });
        if (checkReview) {
            return next(new ValidationError("Review already exists, You can update it"));
        }
        const result = await Reviews.create({ bookId, userId, rating, comment });
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

export const getReviews = async (req, res, next) => {
    try {
        const reviews = await Reviews.findAll();
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
}

export const getReviewById = async (req, res, next) => {
    try {
        const review = await Reviews.findOne({ where: { id: req.params.id } });
        if (!review) {
            return next(new NotFoundError("Review not found"));
        }
        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
}

export const updateReview = async (req, res, next) => {
    const { error } = ReviewsSchema.validate(req.body);
    if (error) {
        return next(new ValidationError(error.details[0].message));
    }

    const checkUser = await Users.findOne({ where: { id: req.body.userId } });
    if (!checkUser) {
        return next(new NotFoundError("User not found"));
    }

    const checkBook = await Books.findOne({ where: { id: req.body.bookId } });
    if (!checkBook) {
        return next(new NotFoundError("Book not found"));
    }

    const checkExistingReview = await Reviews.findOne({ where: { userId: req.body.userId, bookId: req.body.bookId } });
    if (checkExistingReview && checkExistingReview.dataValues.id != req.params.id) {
        return next(new ValidationError("Review already exists"));
    }

    try {
        const result = await Reviews.update(req.body, { where: { id: req.params.id } });
        if (result[0] === 0) {
            return next(new NotFoundError("Review not found"));
        }
        res.status(200).json(req.body);
    } catch (error) {
        next(error);
    }
}

export const deleteReview = async (req, res, next) => {
    try {
        const review = await Reviews.findOne({ where: { id: req.params.id } });
        if (!review) {
            return next(new NotFoundError("Review not found"));
        }
        await Reviews.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {   
        next(error);
    }
}