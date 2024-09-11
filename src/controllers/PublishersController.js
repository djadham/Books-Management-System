import User from '../models/UsersModel.js';
import {userSchema} from '../validators/validator.js';
import { hashPassword } from '../utils/passwordUtils.js';
import { Op } from 'sequelize';
import { NotFoundError, ValidationError } from '../middlewares/errorHandler.js';

export const getPublishers = async (req, res, next) => {
    try {
        const users = await User.findAll({where: {deletedAt: null, roles: 'publisher'}});
        res.status(200).json({
            status: 'success',
            message: 'Publishers Retrieved Successfully',
            data: users
        });
    } catch (error) {
        next(error);
    }
}

export const createPublisher = async (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return next(new ValidationError(error.details[0].message));
    }
    const { name, email, password, roles } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = { name, email, password:hashedPassword, roles: 'publisher' };

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
        next(new ValidationError('The email address is already in use.'));
    }

    try {
        const result = await User.create(user);
        res.status(201).json({
            status: 'success',
            message: 'Publisher Created Successfully',
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export const getPublisherById = async (req, res, next) => {
    try {
        const user = await User.findOne({where: {id: req.params.id, deletedAt: null, roles: 'publisher'}});
        if (!user) {
            return next(new NotFoundError('Publisher not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Publisher Retrieved Successfully',
            data: user
        });
    } catch (error) {
        next(error);
    }
}

export const updatePublisher = async (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return next(new ValidationError(error.details[0].message));
    }
    const { id } = req.params;
    const { name, email, password, roles } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = { name, email, password: hashedPassword, roles: 'publisher' };
    
    const existingPublisher = await User.findOne({ where: { id: req.params.id, roles: 'publisher', deletedAt: null } });
    if(!existingPublisher) {
        return next(new NotFoundError('Publisher not found'));
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser && existingUser.dataValues.id != id) {
        next(new ValidationError('The email address is already in use.'));
    }

    try {
        const result = await User.update(user, { where: { id } });
        if (result[0] === 0) {
            return next(new NotFoundError('Publisher not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Publisher Updated Successfully',
            data: {id, name, email, roles}
        });
    } catch (error) {
        next(error);
    }
}

export const softDeletePublisher = async (req, res, next) => {
    const { id } = req.params;

    try {
        const result = await User.update({deletedAt: new Date()}, { where: { id: id, roles: 'publisher' } });
        if(result[0] === 0) return next(new NotFoundError('Publisher not found'));
        res.status(200).json({
            status: 'success',
            message: 'Publisher Moved to Trash Successfully',
            data: {}
        });
    } catch (error) {
        next(error);
    }
}

export const restorePublisher = async (req, res, next) => {
    const { id } = req.params;
    try{
        const result = await User.update({deletedAt: null}, { where: { id: id, roles: 'publisher', deletedAt: { [Op.ne]: null } } });
        if(result[0] === 0) return next(new NotFoundError('Publisher not found in trash'));
        res.status(200).json({
            status: 'success',
            message: 'Publisher Restored Successfully',
            data: {}
        });
    }
    catch (error) {
        next(error);
    }
}

export const deletePublisher = async (req, res, next) => {
    const { id } = req.params;
    try{
        const result = await User.destroy({ where: { id: id, roles: 'publisher' } });
        if(result === 0) return next(new NotFoundError('Publisher not found'));
        res.status(200).json({
            status: 'success',
            message: 'Publisher Deleted Successfully',
            data: {}
        });
    }
    catch (error) {
        next(error);
    }
}



