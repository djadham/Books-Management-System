import Books from "../models/BooksModel.js";
import {bookSchema} from "../validators/validator.js";
import { Sequelize } from "sequelize";
import BookImages from "../models/BookImagesModel.js";
import Genres from "../models/GenresModel.js";
import Users from "../models/UsersModel.js";
import Ratings from "../models/RatingsModel.js";
import Reviews from "../models/ReviewsModel.js";
import { NotFoundError, ValidationError } from "../middlewares/errorHandler.js";

export const getBooks = async (req, res, next) => {
    try{
        const { page=1, pageSize=10 } = req.query;
        const pageNumber = parseInt(page, 10);
        const pageSizeNumber = parseInt(pageSize, 10);

        const offset = (pageNumber - 1) * pageSizeNumber;

        const limit = pageSizeNumber;

        const { count, rows } = await Books.findAndCountAll({
            where: { deletedAt: null },
            include: [
              {
                model: BookImages,
                as: 'images',
                attributes: ['image_url'],
              }
            ],
            offset: offset,
            limit: limit
        });

        const result = rows.map(book => ({
            id: book.id,
            title: book.title,
            description: book.description,
            published_date: book.published_date,
            images: book.images.map(image => image.image_url)
        }));

        res.status(200).json({
            status: 'success',
            message: 'Books Retrieved Successfully',
            data: result,
            metadata: {
                totalItems: count,
                totalPages: Math.ceil(count / pageSizeNumber),
                currentPage: pageNumber,
                pageSize: pageSizeNumber,
            }
        });
        
    }catch(err){
        next(err);
    }
}

export const getBookById = async (req, res, next) => {
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
                },
                {
                    model: Users,
                    as: 'publishers',
                    attributes: ['id', 'name','email'],

                }
              ] 
        });
        if(!book) return next(new NotFoundError('Book not found'));
        const result = {
            id: book.id,
            title: book.title,
            description: book.description,
            published_date: book.published_date,
            images: book.images.map(image => image.image_url),
            genres: book.genres.map(genre => genre.name),
            author: book.authors.map(author=> ({id: author.id, name: author.name, email: author.email})),
            ratings: book.ratings.map(rating => ({rating: rating.rating, user: {id: rating.user.id, name: rating.user.name, email: rating.user.email}})),
            reviews: book.reviews.map(review => ({rating: review.rating, review: review.comment, user: {id: review.user.id, name: review.user.name, email: review.user.email}})),
            publisher: book.publishers.map(publisher => ({id: publisher.id, name: publisher.name, email: publisher.email})),
        }
        res.status(200).json({
            status: 'success',
            message: 'Book Retrieved Successfully',
            data: result
        });
    }catch(err){
        next(err);
    }
}

export const createBook = async (req, res, next) => {
    const { error } = bookSchema.validate(req.body);
    if (error) {
        return next(new ValidationError(error.details[0].message));
    }

    const { title, description, published_date } = req.body;
    const book = { title, description, published_date };
    try {
        const result = await Books.create(book);
        res.status(201).json({
            status: 'success',
            message: 'Book Created Successfully',
            data: result
        });
    } catch (err) {
        next(err);
    }
}  

export const updateBook = async (req, res, next) => {
    const { error } = bookSchema.validate(req.body);
    if (error) {
        return next(new ValidationError(error.details[0].message));
    }
    const { id } = req.params;

    const { title, description, published_date } = req.body;
    const book = { title, description, published_date };
    try{
        const result = await Books.update(book, { where: { id } });
        if(result[0] === 0) return next(new NotFoundError('Book not found'));
        res.status(200).json({
            status: 'success',
            message: 'Book Updated Successfully',
            data: {id: id, ...book}
        });
    }catch (err) {
        next(err);
    }
}

export const softDeleteBook = async (req, res, next) => {
    const { id } = req.params;
    try{
        const result = await Books.update({deletedAt: new Date()}, { where: { id } });
        if(result[0] === 0) return next(new NotFoundError('Book not found'));
        res.status(200).json({
            status: 'success',
            message: 'Book Moved to Trash Successfully',
            data: {}
        });
    }catch(err){
        next(err);
    }
}

export const restoreBook = async (req, res, next) => {
    const { id } = req.params;
    try{
        const result = await Books.update({deletedAt: null}, { where: { id: id, deletedAt: { [Sequelize.Op.ne]: null } } });
        if(result[0] === 0) return next(new NotFoundError('Book not found in trash'));
        res.status(200).json({
            status: 'success',
            message: 'Book Restored Successfully',
            data: {}
        });
    }catch(err){
        next(err);
    }
}

export const deleteBook = async (req, res, next) => {
    const { id } = req.params;
    try{
        const result = await Books.destroy({ where: { id } });
        if(result === 0) return next(new NotFoundError('Book not found'));
        res.status(200).json({
            status: 'success',
            message: 'Book Deleted Successfully',
            data: {}
        });
    }catch(err){
        next(err);
    }
}