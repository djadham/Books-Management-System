import GenresModel from "../models/GenresModel.js";
import { GenreSchema } from "../validators/validator.js";
import { Op } from 'sequelize';
import { NotFoundError, ValidationError } from "../middlewares/errorHandler.js";

export const getGenres = async (req, res, next) => {
    try {
        const genres = await GenresModel.findAll({ where: { deletedAt: null } });
        res.status(200).json({
            status: 'success',
            message: 'Genres Retrieved Successfully',
            data: genres
        });
    } catch (error) {
        next(error);
    }
}

export const getGenreById = async (req, res, next) => {
    try {
        const genre = await GenresModel.findOne({ where: { id: req.params.id, deletedAt: null } });
        if (!genre) {
            return next(new NotFoundError('Genre not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Genre Retrieved Successfully',
            data: genre
        });
    } catch (error) {
        next(error);
    }
}

export const createGenre = async (req, res, next) => {
    const { error } = GenreSchema.validate(req.body);
    if (error) {
        return next(new ValidationError(error.details[0].message));
    }
    const existingGenre = await GenresModel.findOne({ where: { name: req.body.name } });
    if (existingGenre) {
        return next(new ValidationError('Genre already exists'));
    }
    try {
        const genre = await GenresModel.create(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Genre Created Successfully',
            data: genre
        });
    } catch (error) {
        next(error);
    }
}

export const updateGenre = async (req, res, next) => {
    const { error } = GenreSchema.validate(req.body);
    if (error) {
        return next(new ValidationError(error.details[0].message));
    }
    const existingGenre = await GenresModel.findOne({ where: { name: req.body.name } });
    if (existingGenre && existingGenre.dataValues.id != req.params.id) {
        return next(new ValidationError('Genre already exists'));
    }
    const genre = {id: req.params.id, name: req.body.name};
    try {
        const result = await GenresModel.update(req.body, { where: { id: req.params.id, deletedAt: null } });
        if (result[0] === 0) {
            return next(new NotFoundError('Genre not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Genre Updated Successfully',
            data: {id: req.params.id, ...genre}
        });
    } catch (error) {
        next(error);
    }
}

export const softDeleteGenre = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await GenresModel.update({deletedAt: new Date()}, { where: { id } });
        if(result[0] === 0) return next(new NotFoundError('Genre not found'));
        res.status(200).json({
            status: 'success',
            message: 'Genre Moved to Trash Successfully',
            data: {}
        });
    } catch (error) {
        next(error);
    }
}

export const restoreGenre = async (req, res, next) => {
    try {
        const genre = await GenresModel.update({ deletedAt: null }, { where: { id: req.params.id, deletedAt: { [Op.ne]: null } }});
        if (genre[0] === 0) {
            return next(new NotFoundError('Genre not found in trash'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Genre Restored Successfully',
            data: {}
        });
    } catch (error) {
        next(error);
    }
}

export const deleteGenre = async (req, res, next) => {
    try {
        const genre = await GenresModel.destroy({ where: { id: req.params.id } });
        if (genre === 0) {
            return next(new NotFoundError('Genre not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Genre Deleted Successfully',
            data: {}
        });
    } catch (error) {
        next(error);
    }
}
