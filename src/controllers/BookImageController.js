import BookImagesModel from "../models/BookImagesModel.js";
import Books from "../models/BooksModel.js";
import { BookImageSchema } from "../validators/validator.js";
import { NotFoundError, ValidationError } from "../middlewares/errorHandler.js";

export const addBookImage = async (req, res, next) => {
    const { error } = BookImageSchema.validate(req.body);
    if (error) {
        return next(new ValidationError(error.details[0].message));
    }
    try {
        const bookId = req.body.bookId;
        const imageUrl = req.file.path;
        
        const book = await Books.findOne({ where: { id: bookId, deletedAt: null } });
        if (!book) return next(new NotFoundError("Book not found"));

        const bookImage = await BookImagesModel.create({
            book_id: bookId,
            image_url: imageUrl,
            description: req.body.description,
            file_type: req.file.mimetype,
        });
        res.status(201).send({
            message: "Book image created successfully",
            bookImage,
        })
        
    } catch (error) {
        next(error);
    }
}

export const getBookImages = async (req, res, next) => {
    try {
        const bookImages = await BookImagesModel.findAll();
        res.send(bookImages);
    } catch (error) {
        next(error);
    }
}

export const getBookImageById = async (req, res, next) => {
    try {
        const bookImage = await BookImagesModel.findOne({ where: { id: req.params.id } });
        if (!bookImage) return next(new NotFoundError("Book image not found"));
        res.send(bookImage);
    } catch (error) {
        next(error);
    }
}

export const getImagesByBookId = async (req, res, next) => {
    try {
        const bookImages = await BookImagesModel.findAll({ where: { book_id: req.params.id }, attributes: ['id', 'image_url'] });
        if (!bookImages) return next(new NotFoundError("Book image not found"));
        res.send(bookImages);
    } catch (error) {
        next(error);
    }
}

export const deleteBookImage = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await BookImagesModel.destroy({ where: { id } });
        if (result === 0) return next(new NotFoundError("Book image not found"));
        res.send({ message: "Book image deleted successfully" });
    } catch (error) {
        next(error);
    }
}