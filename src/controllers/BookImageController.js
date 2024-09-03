import BookImagesModel from "../models/BookImagesModel.js";
import Books from "../models/BooksModel.js";
import { upload } from "../middlewares/uploads.js";
import { BookImageSchema } from "../validators/validator.js";

export const addBookImage = async (req, res) => {
    const { error } = BookImageSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        const bookId = req.body.bookId;
        const imageUrl = req.file.path;
        
        const book = await Books.findOne({ where: { id: bookId, deletedAt: null } });
        if (!book) {
            return res.status(404).send({
                message: "Book not found",
            });
        }

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
        res.status(500).send({
            message: error.message || "Some error occurred while creating the book image.",
        });
    }
}

export const getBookImages = async (req, res) => {
    try {
        const bookImages = await BookImagesModel.findAll();
        res.send(bookImages);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving book images.",
        });
    }
}

export const getBookImageById = async (req, res) => {
    try {
        const bookImage = await BookImagesModel.findOne({ where: { id: req.params.id } });
        if (!bookImage) {
            return res.status(404).send({
                message: "Book image not found",
            });
        }
        res.send(bookImage);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving book image.",
        });
    }
}

export const deleteBookImage = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await BookImagesModel.destroy({ where: { id } });
        if (result === 0) {
            return res.status(404).send({
                message: "Book image not found",
            });
        }
        res.send({ message: "Book image deleted successfully" });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while deleting the book image.",
        });
    }
}