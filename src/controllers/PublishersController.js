import User from '../models/UsersModel.js';
import {userSchema} from '../validators/validator.js';
import { hashPassword } from '../utils/passwordUtils.js';
import { Op } from 'sequelize';

export const getPublishers = async (req, res) => {
    try {
        const users = await User.findAll({where: {deletedAt: null, roles: 'publisher'}});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createPublisher = async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const { name, email, password, roles } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = { name, email, password:hashedPassword, roles: 'publisher' };

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

export const getPublisherById = async (req, res) => {
    try {
        const user = await User.findOne({where: {id: req.params.id, deletedAt: null, roles: 'publisher'}});
        if (!user) {
            return res.status(404).json({ message: 'Publisher not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updatePublisher = async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const { id } = req.params;
    const { name, email, password, roles } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = { name, email, password: hashedPassword, roles: 'publisher' };
    
    const existingPublisher = await User.findOne({ where: { id: req.params.id, roles: 'publisher', deletedAt: null } });
    if(!existingPublisher) {
        return res.status(404).json({ message: 'Publisher not found' });
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
            return res.status(404).json({ message: 'Publisher not found' });
        }
        res.status(200).json({ message: 'Publisher updated successfully', user: { id, name, email, roles } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const softDeletePublisher = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await User.update({deletedAt: new Date()}, { where: { id: id, roles: 'publisher' } });
        if(result[0] === 0) return res.status(404).send({message: "Publisher not found"});
        res.send({message: "Publisher Moved to trash successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const restorePublisher = async (req, res) => {
    const { id } = req.params;
    try{
        const result = await User.update({deletedAt: null}, { where: { id: id, roles: 'publisher', deletedAt: { [Op.ne]: null } } });
        if(result[0] === 0) return res.status(404).send({message: "Publisher not found in trash"});
        res.send({message: "Publisher Restored successfully"});
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deletePublisher = async (req, res) => {
    const { id } = req.params;
    try{
        const result = await User.destroy({ where: { id: id, roles: 'publisher' } });
        if(result === 0) return res.status(404).send({message: "Publisher not found"});
        res.send({message: "Publisher Deleted successfully"});
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}



