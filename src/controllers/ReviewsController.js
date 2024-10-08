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
        res.status(201).json({
            status: 'success',
            message: 'Review Created Successfully',
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export const getReviews = async (req, res, next) => {
    try {
        const { page = 1, pageSize = 10 } = req.query;
        const pageNumber = parseInt(page, 10);
        const pageSizeNumber = parseInt(pageSize, 10);

        const offset = (pageNumber - 1) * pageSizeNumber;

        const { count, rows } = await Reviews.findAndCountAll({
            offset: offset,
            limit: pageSizeNumber
        });

        res.status(200).json({
            status: 'success',
            message: 'Reviews Retrieved Successfully',
            data: rows,
            metadata: {
                totalItems: count,
                totalPages: Math.ceil(count / pageSizeNumber),
                currentPage: pageNumber,
                pageSize: pageSizeNumber
            }
        });
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
        res.status(200).json({
            status: 'success',
            message: 'Review Retrieved Successfully',
            data: review
        });
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
        res.status(200).json({
            status: 'success',
            message: 'Review Updated Successfully',
            data: {id: req.params.id, ...req.body}
        });
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
        res.status(200).json({
            status: 'success',
            message: 'Review Deleted Successfully',
            data: {}
        });
    } catch (error) {   
        next(error);
    }
}