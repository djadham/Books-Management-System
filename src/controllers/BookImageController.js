import BookImagesModel from "../models/BookImagesModel.js";
import Books from "../models/BooksModel.js";
import { BookImageSchema } from "../validators/validator.js";
import { NotFoundError, ValidationError } from "../middlewares/errorHandler.js";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();

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
        res.status(201).json({
            status: 'success',
            message: 'Book Image Added Successfully',
            data: bookImage
        });
        
    } catch (error) {
        next(error);
    }
}

export const getBookImages = async (req, res, next) => {
    try {
        const { page=1, pageSize=10 } = req.query;
        const pageNumber = parseInt(page, 10);
        const pageSizeNumber = parseInt(pageSize, 10);

        const offset = (pageNumber - 1) * pageSizeNumber;

        const limit = pageSizeNumber;

        const {count, rows} = await BookImagesModel.findAndCountAll({where: {deletedAt: null},
            offset: offset,
            limit: limit
        });

        res.status(200).json({
            status: 'success',
            message: 'Book Images Retrieved Successfully',
            data: rows,
            metadata: {
                totalItems: count,
                totalPages: Math.ceil(count / pageSizeNumber),
                currentPage: pageNumber,
                pageSize: pageSizeNumber,
            }
        });
    } catch (error) {
        next(error);
    }
}

export const getBookImageById = async (req, res, next) => {
    try {
        const bookImage = await BookImagesModel.findOne({ where: { id: req.params.id } });
        if (!bookImage) return next(new NotFoundError("Book image not found"));
        res.status(200).json({
            status: 'success',
            message: 'Book Image Retrieved Successfully',
            data: bookImage
        });
    } catch (error) {
        next(error);
    }
}

export const getImagesByBookId = async (req, res, next) => {
    try {
        const bookImages = await BookImagesModel.findAll({ where: { book_id: req.params.id }, attributes: ['id', 'image_url'] });
        if (!bookImages) return next(new NotFoundError("Book image not found"));
        res.status(200).json({
            status: 'success',
            message: 'Book Images Retrieved Successfully',
            data: bookImages
        });
    } catch (error) {
        next(error);
    }
}

export const deleteBookImage = async (req, res, next) => {
    const { id } = req.params;
    try {
        const image = await BookImagesModel.findByPk(id);
        if (!image) return next(new NotFoundError("Book image not found"));

        const filePath = path.join(__dirname, 'uploads', path.basename(image.image_url));
        fs.unlinkSync(filePath);

        const result = await BookImagesModel.destroy({ where: { id } });
        
        res.status(200).json({
            status: 'success',
            message: 'Book Image Deleted Successfully',
            data: {}
        });
    } catch (error) {
        next(error);
    }
}