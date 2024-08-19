import { authSchema, loginSchema } from "../validators/AuthValidator.js";
import User from "../models/UsersModel.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const registerUser = async (req, res) => {

    const { error } = authSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { name, email, password, confirmPassword, roles } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = { name, email, password: hashedPassword, roles };
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
        return res.status(400).json({
            errors: [
                { field: 'email', message: 'The email address is already in use.' }
            ]
        });
    }

    try {
        const result = await User.create(user);
        res.status(201).json({
            message: 'User Registered Successfully', user: { id: result.id, name, email, roles }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const userLogin = async (req, res) => {

    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { email, password } = req.body;
    const user = await User.scope('withPassword').findOne({ where: { email } });
    if (!user) {
        return res.status(400).json({
            errors: [
                { field: 'email', message: 'The email address is not registered.' }
            ]
        });
    }

    const validPassword = await comparePassword(password, user.dataValues.password);
    if (!validPassword) {
        return res.status(400).json({
            errors: [
                { field: 'password', message: 'The password is incorrect.' }
            ]
        });
    }

    const token = jwt.sign({id:user.dataValues.id, email:user.dataValues.email, roles:user.dataValues.roles}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN || '1h'});

    res.status(200).json({ message: 'User logged in successfully', user: { id: user.id, name: user.name, email: user.email, roles: user.roles, token: token } });
    
}

export const profile = async (req, res) => {

    const user = await User.findOne({ where: { id: req.params.id, deletedAt: null } });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user: { id: user.id, name: user.name, email: user.email, roles: user.roles } });
}

export const logout = async (req, res) => {
    res.status(200).json({ message: 'User logged out successfully' });
}
