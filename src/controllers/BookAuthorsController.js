import BookAuthors from "../models/BookAuthorsModel.js";
import Books from "../models/BooksModel.js";
import Users from "../models/UsersModel.js";
import { BookAuthorsSchema } from "../validators/validator.js";
import defineAssociations from "../models/Associations.js";
import { NotFoundError, ValidationError } from "../middlewares/errorHandler.js";

defineAssociations();

export const createBookAuthor = async (req, res, next) => {

    const { error } = BookAuthorsSchema.validate(req.body);
    if (error) {
        return next(new ValidationError(error.details[0].message));
    }
    try {
        const book = await Books.findOne({ where: { id: req.body.bookId, deletedAt: null } });
        if (!book) return next(new NotFoundError("Book not found"));
        const author = await Users.findOne({ where: { id: req.body.authorId, deletedAt: null, roles: "author" } });
        if (!author) return next(new NotFoundError("Author not found"));
        const existingBookAuthor = await BookAuthors.findOne({ where: { bookId: req.body.bookId } });
        if (existingBookAuthor) return next(new ValidationError("Book author already exists"));

        const bookAuthor = await BookAuthors.create(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Book Author Created Successfully',
            data: bookAuthor
        });
    } catch (error) {
        next(error);
    }
}

export const getBookAuthors = async (req, res, next) => {

    try {
        const bookAuthors = await BookAuthors.findAll({ where: { deletedAt: null}, 
            include: [
                { 
                    model: Users, 
                    as: 'author',
                    attributes: ['name'],
                },
                { 
                    model: Books, 
                    as: 'book',
                    attributes: ['title'],
                }
            ],
            attributes: ['id', 'bookId', 'authorId'], 
        });
        res.status(200).json({
            status: 'success',
            message: 'Book Authors Retrieved Successfully',
            data: bookAuthors
        });
    } catch (error) {
        next(error);
    }
}

export const getBookAuthorById = async (req, res, next) => {

    try {
        const bookAuthor = await BookAuthors.findOne({ where: { id: req.params.id, deletedAt: null },
            include: [
                { 
                    model: Users, 
                    as: 'author',
                    attributes: ['id', 'name','email'],
                },
                { 
                    model: Books, 
                    as: 'book',
                    attributes: ['id', 'title'],
                }
            ],
            attributes: ['id', 'bookId', 'authorId'], 
         });
        if (!bookAuthor) return next(new NotFoundError("Book author not found"));
        res.status(200).json({
            status: 'success',
            message: 'Book Author Retrieved Successfully',
            data: bookAuthor
        });
    } catch (error) {
        next(error);
    }
}

export const updateBookAuthor = async (req, res, next) => {
    const { error } = BookAuthorsSchema.validate(req.body);
    if (error) {
        return next(new ValidationError(error.details[0].message));
    }

    const book = await Books.findOne({ where: { id: req.body.bookId, deletedAt: null } });
    if (!book) return next(new NotFoundError("Book with given id not found"));

    const author = await Users.findOne({ where: { id: req.body.authorId, deletedAt: null, roles: "author" } });
    if (!author) return next(new NotFoundError("Author with given id not found"));

    const existingBookAuthor = await BookAuthors.findOne({ where: { bookId: req.body.bookId } });
    if (existingBookAuthor && existingBookAuthor.dataValues.id != req.params.id) return next(new ValidationError("Book author already exists"));

    try {
        const result = await BookAuthors.update(req.body, { where: { id: req.params.id, deletedAt: null } });
        if (result[0] === 0) {
            return next(new NotFoundError("Book author not found"));
        }    
        res.status(200).json({
            status: 'success',
            message: 'Book Author Updated Successfully',
            data: {id: req.params.id, ...req.body}
        });
    } catch (error) {
        next(error);
    }
}

export const deleteBookAuthor = async (req, res, next) => {
    try {
        const result = await BookAuthors.destroy({ where: { id: req.params.id } }); 
        res.status(200).json({
            status: 'success',
            message: 'Book Author Deleted Successfully',
            data: {}
        });
    } catch (error) {
        next(error);
    }
}