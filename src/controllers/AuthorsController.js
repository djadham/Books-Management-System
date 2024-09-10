import User from '../models/UsersModel.js';
import {userSchema} from '../validators/validator.js';
import { hashPassword } from '../utils/passwordUtils.js';
import { NotFoundError, ValidationError } from '../middlewares/errorHandler.js';
import { Op } from 'sequelize';

export const getAuthors = async (req, res, next) => {
    try {
        const users = await User.findAll({where: {deletedAt: null, roles: 'author'}});
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

export const createAuthor = async (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return next(new ValidationError(error.details[0].message));
    }
    const { name, email, password, roles } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = { name, email, password:hashedPassword, roles: 'author' };

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
        return next(new ValidationError('The email address is already in use.'));
    }

    try {
        const result = await User.create(user);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

export const getAuthorById = async (req, res, next) => {
    try {
        const user = await User.findOne({where: {id: req.params.id, deletedAt: null, roles: 'author'}});
        if (!user) {
            return next(new NotFoundError('Author not found'));
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const updateAuthor = async (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return next(new ValidationError(error.details[0].message));
    }
    const { id } = req.params;
    const { name, email, password, roles } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = { name, email, password: hashedPassword, roles: 'author' };
    
    const existingAuthor = await User.findOne({ where: { id: req.params.id, roles: 'author' } });
    if(!existingAuthor) {
        return next(new NotFoundError('Author not found'));
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser && existingUser.dataValues.id != id) {
        return next(new ValidationError('The email address is already in use.'));
    }

    try {
        const result = await User.update(user, { where: { id } });
        if (result[0] === 0) {
            return next(new NotFoundError('Author not found'));
        }
        res.status(200).json({ message: 'Author updated successfully', user: { id, name, email, roles } });
    } catch (error) {
        next(error);
    }
}

export const softDeleteAuthor = async (req, res, next) => {
    const { id } = req.params;

    try {
        const result = await User.update({deletedAt: new Date()}, { where: { id: id, roles: 'author' } });
        if(result[0] === 0) return next(new NotFoundError('Author not found in trash'));
        res.send({message: "Author Moved to trash successfully"});
    } catch (error) {
        next(error);
    }
}

export const restoreAuthor = async (req, res, next) => {
    const { id } = req.params;
    try{
        const result = await User.update({deletedAt: null}, { where: { id: id, deletedAt: { [Op.ne]: null }, roles: 'author' } });
        if(result[0] === 0) return next(new NotFoundError('Author not found in trash'));
        res.send({message: "Author Restored successfully"});
    }
    catch (error) {
        next(error);
    }
}

export const deleteAuthor = async (req, res, next) => {
    const { id } = req.params;
    try{
        const result = await User.destroy({ where: { id: id, roles: 'author' } });
        if(result === 0) return next(new NotFoundError('Author not found'));
        res.send({message: "Author Deleted successfully"});
    }
    catch (error) {
        next(error);
    }
}



