import BookGenres from "../models/BookGenresModel.js";
import Books from "../models/BooksModel.js";
import Genres from "../models/GenresModel.js";
import { BookGenresSchema } from "../validators/validator.js";
import { NotFoundError, ValidationError } from "../middlewares/errorHandler.js";

export const createBookGenre = async (req, res, next) => {
    const { bookId, genreId } = req.body;
    const bookGenre = {
        bookId: bookId,
        genreId: genreId
    };
    const { error } = BookGenresSchema.validate(bookGenre);
    if (error) {
        return next(new ValidationError(error.details[0].message));
    }
    const books = await Books.findOne({where: {id: bookId}});
    if (!books) {
        return next(new NotFoundError('Book not found'));
    }
    const genres = await Genres.findOne({where: {id: genreId}});
    if (!genres) {
        return next(new NotFoundError('Genre not found'));
    }
    const existingBookGenre = await BookGenres.findOne({
        where: {
            bookId: bookId,
            genreId: genreId
        }
    });
    if (existingBookGenre) {
        return next(new ValidationError('Book and genre already exist'));
    }
    try {
        const result = await BookGenres.create(bookGenre);
        res.status(201).json({
            status: 'success',
            message: 'Book Genre created Successfully',
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export const getBookGenres = async (req, res, next) => {
    try{
        const bookGenres = await BookGenres.findAll({where: {deletedAt: null}, 
            include: 
            [
                {
                    model: Books,
                    attributes: ['title']
                },
                {
                    model: Genres,
                    attributes: ['name']
                }
            ],
            attributes: ['id', 'bookId', 'genreId']
        });
        res.status(200).json({
            status: 'success',
            message: 'Book Genres Retrieved Successfully',
            data: bookGenres
        });
    }
    catch(error){
        next(error);
    }
}

export const getBookGenreById = async (req, res, next) => {
    try{
        const bookGenre = await BookGenres.findOne({where: {id: req.params.id, deletedAt: null},
            include: 
            [
                {
                    model: Books,
                    attributes: ['id', 'title']
                },
                {
                    model: Genres,
                    attributes: ['id', 'name']
                }
            ],
            attributes: ['id', 'bookId', 'genreId']
        });
        if(!bookGenre){
            return next(new NotFoundError('Book genre not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Book Genre Retrieved Successfully',
            data: bookGenre
        });
    }
    catch(error){
        next(error);
    }
}


export const updateBookGenre = async (req, res, next) => {
    const { error } = BookGenresSchema.validate(req.body);
    if (error) {
        return next(new ValidationError(error.details[0].message));
    }
    const { bookId, genreId } = req.body;
    const books = await Books.findOne({where: {id: bookId}});
    if (!books) {
        return next(new NotFoundError('Book not found'));
    }
    const genres = await Genres.findOne({where: {id: genreId}});
    if (!genres) {
        return next(new NotFoundError('Genre not found'));
    }
    const existingBookGenre = await BookGenres.findOne({
        where: {
            bookId: bookId,
            genreId: genreId
        }
    });
    if (existingBookGenre && existingBookGenre.dataValues.id != req.params.id) {
        return next(new ValidationError('Book and genre already exist'));
    }
    try {
        const result = await BookGenres.update(req.body, { where: { id: req.params.id, deletedAt: null } });
        if (result[0] === 0) {
            return next(new NotFoundError('Book genre not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Book Genre Updated Successfully',
            data: {id: req.params.id, ...req.body}
        });
    } catch (error) {
        next(error);
    }
}

export const deleteBookGenre = async (req, res, next) => {
    try {
        const bookGenre = await BookGenres.destroy({ where: { id: req.params.id } });
        if (bookGenre === 0) {
            return next(new NotFoundError('Book genre not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Book Genre Deleted Successfully',
            data: {}
        });
    } catch (error) {
        next(error);
    }
}