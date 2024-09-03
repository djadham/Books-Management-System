import { where } from "sequelize";
import BookGenres from "../models/BookGenresModel.js";
import Books from "../models/BooksModel.js";
import Genres from "../models/GenresModel.js";
import { BookGenresSchema } from "../validators/validator.js";

export const createBookGenre = async (req, res) => {
    const { bookId, genreId } = req.body;
    const bookGenre = {
        bookId: bookId,
        genreId: genreId
    };

    const { error } = BookGenresSchema.validate(bookGenre);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const books = await Books.findOne({where: {id: bookId}});

    if (!books) {
        return res.status(404).json({ message: 'Book not found' });
    }

    const genres = await Genres.findOne({where: {id: genreId}});

    if (!genres) {
        return res.status(404).json({ message: 'Genre not found' });
    }

    const existingBookGenre = await BookGenres.findOne({
        where: {
            bookId: bookId,
            genreId: genreId
        }
    });

    if (existingBookGenre) {
        return res.status(400).json({ message: 'Book genre already exists' });
    }

    try {
        const result = await BookGenres.create(bookGenre);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getBookGenres = async (req, res) => {
    try{
        const bookGenres = await BookGenres.findAll({where: {deletedAt: null}});
        res.status(200).json(bookGenres);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const getBookGenreById = async (req, res) => {
    try{
        const bookGenre = await BookGenres.findOne({where: {id: req.params.id, deletedAt: null}});
        if(!bookGenre){
            return res.status(404).json({message: 'Book genre not found'});
        }
        res.status(200).json(bookGenre);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}


export const updateBookGenre = async (req, res) => {
    const { error } = BookGenresSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        const result = await BookGenres.update(req.body, { where: { id: req.params.id, deletedAt: null } });
        if (result[0] === 0) {
            return res.status(404).json({ message: 'Book genre not found' });
        }
        res.status(200).json(req.body);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteBookGenre = async (req, res) => {
    try {
        const bookGenre = await BookGenres.destroy({ where: { id: req.params.id } });
        if (bookGenre === 0) {
            return res.status(404).json({ message: 'Book genre not found' });
        }
        res.status(200).json({ message: 'Book genre deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}