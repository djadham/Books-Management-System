import { authSchema, loginSchema, userSchema } from "../validators/validator.js";
import User from "../models/UsersModel.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { NotFoundError, ValidationError } from "../middlewares/errorHandler.js";

dotenv.config();

export const registerUser = async (req, res, next) => {

    const { error } = authSchema.validate(req.body);
    if (error) {
        return next(new ValidationError(error.details[0].message));
    }

    const { name, email, password, confirmPassword, roles } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = { name, email, password: hashedPassword, roles };
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
        next(new ValidationError('The email address is already in use.'));
    }

    try {
        const result = await User.create(user);
        res.status(201).json({
            message: 'User Registered Successfully', user: { id: result.id, name, email, roles }
        });
    } catch (error) {
        next(error);
    }
}

export const userLogin = async (req, res, next) => {

    const { error } = loginSchema.validate(req.body);
    if (error) {
        return next(new ValidationError(error.details[0].message));
    }

    const { email, password } = req.body;
    try{
        const user = await User.scope('withPassword').findOne({ where: { email } });
        if (!user) {
            return next(new NotFoundError('The email address is not registered.'));
        }

        const validPassword = await comparePassword(password, user.dataValues.password);
        if (!validPassword) {
            return next(new ValidationError('The password is incorrect.'));
        }

        const token = jwt.sign({id:user.dataValues.id, email:user.dataValues.email, roles:user.dataValues.roles}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN || '1h'});

        res.status(200).json({ message: 'User logged in successfully', user: { id: user.id, name: user.name, email: user.email, roles: user.roles, token: token } });
    } catch (error) {
        next(error);
    }
    
    
}

export const profile = async (req, res, next) => {
    try{
        const user = await User.findOne({ where: { id: req.params.id, deletedAt: null } });
        if (!user) {
            return next(new NotFoundError('User not found'));
        }
        res.status(200).json({ user: { id: user.id, name: user.name, email: user.email, roles: user.roles } });
    }catch (error) {
        next(error);
    }
}

export const logout = async (req, res, next) => {
    try{
        res.status(200).json({ message: 'User logged out successfully' });
    }catch (error) {
        next(error);
    }
}

export const updateProfile = async (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return next(new ValidationError(error.details[0].message));
    }
    const { id } = req.params;
    const { name, email, password, roles } = req.body;
    try {
        const result = await User.update({ name, email, password, roles }, { where: { id } });
        if (result[0] === 0) return next(new NotFoundError('User not found'));
        res.send({ message: "Profile Updated successfully" });
    } catch (error) {
        next(error);
    }   
}


export const deleteProfile = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await User.destroy({ where: { id } });
        if (result === 0) return next(new NotFoundError('User not found'));
        res.send({ message: "Profile Deleted successfully" });
    } catch (error) {
        next(error);
    }   
}