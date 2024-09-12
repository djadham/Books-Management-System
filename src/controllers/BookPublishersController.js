import BookPublishers from "../models/BookPublishersModel.js";
import { BookPublisherSchema } from "../validators/validator.js";
import Books from "../models/BooksModel.js";
import Users from "../models/UsersModel.js";
import { NotFoundError, ValidationError } from "../middlewares/errorHandler.js";

export const createBookPublisher = async (req, res, next) => {
    const { error } = BookPublisherSchema.validate(req.body);
    if (error) {
        return next(new ValidationError(error.details[0].message));
    }

    const checkBook = await Books.findOne({ where: { id: req.body.bookId } });
    if (!checkBook) {
        return next(new NotFoundError("Book not found"));
    }

    const checkUser = await Users.findOne({ where: { id: req.body.publisherId, roles: "publisher" } });
    if (!checkUser) {
        return next(new NotFoundError("Publisher not found"));
    }

    const checkBookPublisher = await BookPublishers.findOne({ where: { bookId: req.body.bookId, publisherId: req.body.publisherId } });
    if (checkBookPublisher) {
        return next(new ValidationError("Book publisher already exists"));
    }

    try {
        const bookPublisher = await BookPublishers.create(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Book Publisher Created Successfully',
            data: bookPublisher
        });
    } catch (error) {
        next(error);
    }
}

export const getBookPublishers = async (req, res, next) => {
    try {
        const { page=1, pageSize=10 } = req.query;
        const pageNumber = parseInt(page, 10);
        const pageSizeNumber = parseInt(pageSize, 10);

        const offset = (pageNumber - 1) * pageSizeNumber;

        const limit = pageSizeNumber;

        const {count, rows} = await BookPublishers.findAndCountAll({where: {deletedAt: null},
            include: [
                {
                    model: Books,
                    attributes: ['title']
                },
                {
                    model: Users,
                    as: 'publisher',
                    attributes: ['name']
                },
            ],
            attributes: ['id', 'bookId', 'publisherId'],
            offset: offset,
            limit: limit
        });

        res.status(200).json({
            status: 'success',
            message: 'Book Publishers Retrieved Successfully',
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

export const getBookPublishersById = async (req, res, next) => {
    try{
        const bookPublishers = await BookPublishers.findOne({ where: { id: req.params.id },
            include: [
                {
                    model: Books,
                    attributes: ['id','title']
                },
                {
                    model: Users,
                    as: 'publisher',
                    attributes: ['id','name','email']
                },
            ],
            attributes: ['id', 'bookId', 'publisherId']
        });
        if (!bookPublishers) {
            return next(new NotFoundError("Book publisher not found"));
        }
        res.status(200).json({
            status: 'success',
            message: 'Book Publisher Retrieved Successfully',
            data: bookPublishers
        });
    } catch (error) {
        next(error);
    }
}


export const updateBookPublisher = async (req, res, next) => {
    const { error } = BookPublisherSchema.validate(req.body);
    if (error) {
        return next(new ValidationError(error.details[0].message));
    }

    const checkBook = await Books.findOne({ where: { id: req.body.bookId } });
    if (!checkBook) {
        return next(new NotFoundError("Book not found"));
    }

    const checkUser = await Users.findOne({ where: { id: req.body.publisherId, roles: "publisher" } });
    if (!checkUser) {
        return next(new NotFoundError("Publisher not found"));
    }

    const checkBookPublisher = await BookPublishers.findOne({ where: { bookId: req.body.bookId, publisherId: req.body.publisherId } });
    if (checkBookPublisher && checkBookPublisher.dataValues.id != req.params.id) {
        return next(new ValidationError("Book publisher already exists"));
    }

    try {
        const result = await BookPublishers.update(req.body, { where: { id: req.params.id } });
        if (result[0] === 0) {
            return next(new NotFoundError("Book publisher not found"));
        }
        res.status(200).json({
            status: 'success',
            message: 'Book Publisher Updated Successfully',
            data: {id: req.params.id, ...req.body}
        });
    } catch (error) {
        next(error);
    }
}

export const deleteBookPublisher = async ( req, res, next ) => {
    try {
        const result = await BookPublishers.destroy({ where: { id: req.params.id } });
        if (result[0] === 0) {
            return next(new NotFoundError("Book publisher not found"));
        }
        res.status(200).json({
            status: 'success',
            message: 'Book Publisher Deleted Successfully',
            data: {}
        });
    } catch (error) {
        next(error);
    }
}