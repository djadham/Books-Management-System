import User from '../models/UsersModel.js';
import {userSchema} from '../validators/validator.js';
import { hashPassword } from '../utils/passwordUtils.js';

export const getAuthors = async (req, res) => {
    try {
        const users = await User.findAll({where: {deletedAt: null, roles: 'author'}});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createAuthor = async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const { name, email, password, roles } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = { name, email, password:hashedPassword, roles: 'author' };

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
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAuthorById = async (req, res) => {
    try {
        const user = await User.findOne({where: {id: req.params.id, deletedAt: null, roles: 'author'}});
        if (!user) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateAuthor = async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const { id } = req.params;
    const { name, email, password, roles } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = { name, email, password: hashedPassword, roles: 'author' };
    
    const existingAuthor = await User.findOne({ where: { id: req.params.id, roles: 'author' } });
    if(!existingAuthor) {
        return res.status(404).json({ message: 'Author not found' });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser && existingUser.dataValues.id != id) {
        return res.status(400).json({
            errors: [
            { field: 'email', message: 'The email address is already in use.' }
            ]
        });
    }

    try {
        const result = await User.update(user, { where: { id } });
        if (result[0] === 0) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.status(200).json({ message: 'Author updated successfully', user: { id, name, email, roles } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const softDeleteAuthor = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await User.update({deletedAt: new Date()}, { where: { id: id, roles: 'author' } });
        if(result[0] === 0) return res.status(404).send({message: "Author not found"});
        res.send({message: "Author Moved to trash successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const restoreAuthor = async (req, res) => {
    const { id } = req.params;
    try{
        const result = await User.update({deletedAt: null}, { where: { id: id, roles: 'author' } });
        if(result[0] === 0) return res.status(404).send({message: "Author not found in trash"});
        res.send({message: "Author Restored successfully"});
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteAuthor = async (req, res) => {
    const { id } = req.params;
    try{
        const result = await User.destroy({ where: { id: id, roles: 'author' } });
        if(result === 0) return res.status(404).send({message: "Author not found"});
        res.send({message: "Author Deleted successfully"});
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}



