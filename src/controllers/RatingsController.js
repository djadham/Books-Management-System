import Ratings from "../models/RatingsModel.js";
import {RatingsSchema} from "../validators/validator.js";
import Users from "../models/UsersModel.js";
import Books from "../models/BooksModel.js";
import { NotFoundError, ValidationError } from "../middlewares/errorHandler.js";

export const createRatings = async (req, res, next) => {
    const { error } = RatingsSchema.validate(req.body);
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

    const checkRatings = await Ratings.findOne({ where: { userId: req.body.userId, bookId: req.body.bookId } });
    if (checkRatings) {
        return next(new ValidationError("Ratings already exists"));
    }

    try {
        const ratings = await Ratings.create(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Ratings Created Successfully',
            data: ratings
        });
    } catch (error) {
        next(error);
    }
}

export const getRatings = async (req, res, next) => {
    try {
        const ratings = await Ratings.findAll();
        res.status(200).json({
            status: 'success',
            message: 'Ratings Retrieved Successfully',
            data: ratings
        });
    } catch (error) {
        next(error);
    }
}

export const updateRatings = async (req, res, next) => {
    const { error } = RatingsSchema.validate(req.body);
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

    const checkRatings = await Ratings.findOne({ where: { userId: req.body.userId, bookId: req.body.bookId } });
    if (checkRatings && checkRatings.dataValues.id != req.params.id) {
        return next(new ValidationError("Ratings already exists"));
    }

    try {
        const result = await Ratings.update(req.body, { where: { id: req.params.id } });
        if (result[0] === 0) {
            return next(new NotFoundError("Ratings not found"));
        }
        res.status(200).json({
            status: 'success',
            message: 'Ratings Updated Successfully',
            data: {id: req.params.id, ...req.body}
        });
    } catch (error) {
        next(error);
    }
}

export const getRatingsById = async (req, res, next) => {
    try {
        const ratings = await Ratings.findOne({ where: { id: req.params.id } });
        if (!ratings) {
            return next(new NotFoundError("Ratings not found"));
        }
        res.status(200).json({
            status: 'success',
            message: 'Ratings Retrieved Successfully',
            data: ratings
        });
    } catch (error) {
        next(error);
    }
}

export const deleteRatings = async (req, res, next) => {
    try {
        const result = await Ratings.destroy({ where: { id: req.params.id } });
        if (result === 0) {
            return next(new NotFoundError("Ratings not found"));
        }
        res.status(200).json({
            status: 'success',
            message: 'Ratings Deleted Successfully',
            data: {}
        });
    } catch (error) {
        next(error);
    }
}