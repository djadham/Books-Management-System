import Genres from "../models/GenresModel.js";
import GenresModel from "../models/GenresModel.js";
import { GenreSchema } from "../validators/validator.js";

export const getGenres = async (req, res) => {
    try {
        const genres = await GenresModel.findAll({ where: { deletedAt: null } });
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getGenreById = async (req, res) => {
    try {
        const genre = await GenresModel.findOne({ where: { id: req.params.id, deletedAt: null } });
        if (!genre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.status(200).json(genre);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createGenre = async (req, res) => {
    const { error } = GenreSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        const genre = await GenresModel.create(req.body);
        res.status(201).json(genre);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateGenre = async (req, res) => {
    const { error } = GenreSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = {id: req.params.id, name: req.body.name};
    try {
        const result = await GenresModel.update(req.body, { where: { id: req.params.id, deletedAt: null } });
        if (result[0] === 0) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.status(200).json(genre);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const softDeleteGenre = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await GenresModel.update({deletedAt: new Date()}, { where: { id } });
        if(result[0] === 0) return res.status(404).send({message: "Genre not found"});
        res.status(200).json({ message: 'Genre Moved to Trash successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const restoreGenre = async (req, res) => {
    try {
        const genre = await GenresModel.update({ deletedAt: null }, { where: { id: req.params.id } });
        if (genre[0] === 0) {
            return res.status(404).json({ message: 'Genre not found in trash' });
        }
        res.status(200).json({ message: 'Genre restored successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteGenre = async (req, res) => {
    try {
        const genre = await GenresModel.destroy({ where: { id: req.params.id } });
        if (genre === 0) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.status(200).json({ message: 'Genre permanently deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
