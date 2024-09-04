import Books from "../models/BooksModel.js";
import Joi from "joi";
import {bookSchema} from "../validators/validator.js";
import { Sequelize } from "sequelize";
import BookImages from "../models/BookImagesModel.js";
import BookGenres from "../models/BookGenresModel.js";
import Genres from "../models/GenresModel.js";
import Users from "../models/UsersModel.js";
import BookAuthors from "../models/BookAuthorsModel.js";
import Ratings from "../models/RatingsModel.js";
import Reviews from "../models/ReviewsModel.js";

export const getBooks = async (req, res) => {
    try{
        const books = await Books.findAll({where: {deletedAt: null},
            include: [
                {
                  model: BookImages,
                  as: 'images',
                  attributes: ['image_url'],
                }
              ] 
        }).then(books => {
            const result = books.map(book => ({
                id: book.id,
                title: book.title,
                description: book.description,
                published_date: book.published_date,
                images: book.images.map(image => image.image_url)
            }));
            res.send(result);
        });
        
    }catch(err){
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving books."
        });
    }
}

export const getBookById = async (req, res) => {
    try{
        const book = await Books.findOne({where: {deletedAt: null, id: req.params.id},
            include: [
                {
                  model: BookImages,
                  as: 'images',
                  attributes: ['image_url'],
                },
                {
                    model: Genres,
                    as: 'genres',
                    attributes: ['id', 'name']
                },
                {
                    model: Users,
                    as: 'authors',
                    attributes: ['id', 'name','email'],
                },
                {
                    model: Ratings,
                    as: 'ratings',
                    attributes: ['id', 'userId', 'rating'],
                    include: [
                        {
                            model: Users,
                            as: 'user',
                            attributes: ['id', 'name','email'],
                        }
                    ]
                },
                {
                    model: Reviews,
                    as: 'reviews',
                    attributes: ['id', 'bookId', 'userId', 'rating', 'comment'],
                    include: [
                        {
                            model: Users,
                            as: 'user',
                            attributes: ['id', 'name','email'],
                        }
                    ]
                }
              ] 
        });
        if(!book) return res.status(404).send({message: "Book not found"});
        const result = {
            id: book.id,
            title: book.title,
            description: book.description,
            published_date: book.published_date,
            images: book.images.map(image => image.image_url),
            genres: book.genres.map(genre => genre.name),
            author: book.authors.map(author=> ({id: author.id, name: author.name, email: author.email})),
            ratings: book.ratings.map(rating => ({rating: rating.rating, user: {id: rating.user.id, name: rating.user.name, email: rating.user.email}})),
            reviews: book.reviews.map(review => ({rating: review.rating, review: review.comment, user: {id: review.user.id, name: review.user.name, email: review.user.email}}))
        }
        res.send(result);
    }catch(err){
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving book."
        });
    }
}

export const createBook = async (req, res) => {
    const { error } = bookSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { title, description, published_date } = req.body;
    const book = { title, description, published_date };
    try {
        const result = await Books.create(book);
        res.send(result);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the book."
        });
    }
}  

export const updateBook = async (req, res) => {
    const { error } = bookSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const { id } = req.params;

    if(!id) {
        return res.status(400).send({
            message: "Book id is required"
        })
    }

    const { title, description, published_date } = req.body;
    const book = { title, description, published_date };
    try{
        const result = await Books.update(book, { where: { id } });
        if(result[0] === 0) return res.status(404).send({message: "Book not found"});
        res.send({message: "Book updated successfully", book});
    }catch (err) {
        res.status(500).send({
            message: 
                err.message || "Some error occured while updating the book."
        })
    }
}

export const softDeleteBook = async (req, res) => {
    const { id } = req.params;
    try{
        const result = await Books.update({deletedAt: new Date()}, { where: { id } });
        if(result[0] === 0) return res.status(404).send({message: "Book not found"});
        res.send({message: "Book Moved to trash successfully"});
    }catch(err){
        res.status(500).send({
            message: 
                err.message || "Some error occured while deleting the book."
        })
    }
}

export const restoreBook = async (req, res) => {
    const { id } = req.params;
    try{
        const result = await Books.update({deletedAt: null}, { where: { id: id, deletedAt: { [Sequelize.Op.ne]: null } } });
        if(result[0] === 0) return res.status(404).send({message: "Book not found in trash"});
        res.send({message: "Book Restored successfully"});
    }catch(err){
        res.status(500).send({
            message: 
                err.message || "Some error occured while restoring the book."
        })
    }
}

export const deleteBook = async (req, res) => {
    const { id } = req.params;
    try{
        const result = await Books.destroy({ where: { id } });
        if(result === 0) return res.status(404).send({message: "Book not found"});
        res.send({message: "Book permanently deleted successfully"});
    }catch(err){
        res.status(500).send({
            message: 
                err.message || "Some error occured while deleting the book."
        })
    }
}