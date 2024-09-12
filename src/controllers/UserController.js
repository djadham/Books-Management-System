import User from '../models/UsersModel.js';
import {userSchema} from '../validators/validator.js';
import { hashPassword } from '../utils/passwordUtils.js';
import { NotFoundError, ValidationError } from '../middlewares/errorHandler.js';
import { Op } from 'sequelize';

export const getUsers = async (req, res, next) => {
    try{
        const { page = 1, pageSize = 10 } = req.query;
        const pageNumber = parseInt(page, 10);
        const pageSizeNumber = parseInt(pageSize, 10);

        const offset = (pageNumber - 1) * pageSizeNumber;

        const { count, rows } = await User.findAndCountAll({
            where: {deletedAt: null, roles: 'user'},
            limit: pageSizeNumber,
            offset: offset
        });
        res.status(200).json({
            status: 'success',
            message: 'Users Retrieved Successfully',
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

export const createUser = async (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return next(new ValidationError(error.details[0].message));
    }
    const { name, email, password, roles } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = { name, email, password:hashedPassword, roles: 'user' };

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
        next(new ValidationError('The email address is already in use.'));
    }

    try {
        const result = await User.create(user);
        res.status(201).json({
            status: 'success',
            message: 'User Created Successfully',
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findOne({where: {id: req.params.id, deletedAt: null, roles: 'user'}});
        if (!user) {
            return next(new NotFoundError('User not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'User Retrieved Successfully',
            data: user
        });
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return next(new ValidationError(error.details[0].message));
    }
    const { id } = req.params;
    const { name, email, password, roles } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = { name, email, password: hashedPassword, roles: 'user' };

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser && existingUser.dataValues.id != id) {
        next(new ValidationError('The email address is already in use.'));
    }

    try {
        const result = await User.update(user, { where: { id: id, roles: 'user', deletedAt: null } });
        if (result[0] === 0) {
            return next(new NotFoundError('User not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'User Updated Successfully',
            data: {id, name, email, roles}
        });
    } catch (error) {
        next(error);
    }
}

export const softDeleteUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        const result = await User.update({deletedAt: new Date()}, { where: { id: id, roles: 'user', deletedAt: null } });
        if(result[0] === 0) return next(new NotFoundError('User not found'));
        res.status(200).json({
            status: 'success',
            message: 'User Moved to Trash Successfully',
            data: {}
        });
    } catch (error) {
        next(error);
    }
}

export const restoreUser = async (req, res, next) => {
    const { id } = req.params;
    try{
        const result = await User.update({deletedAt: null}, { where: { id: id, deletedAt: { [Op.ne]: null }, roles: 'user' } });
        if(result[0] === 0) return next(new NotFoundError('User not found in trash'));
        res.status(200).json({
            status: 'success',
            message: 'User Restored Successfully',
            data: {}
        });
    }
    catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try{
        const result = await User.destroy({ where: { id } });
        if(result === 0) return next(new NotFoundError('User not found'));
        res.status(200).json({
            status: 'success',
            message: 'User Deleted Successfully',
            data: {}
        });
    }
    catch (error) {
        next(error);
    }
}



