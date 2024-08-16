import User from '../models/UsersModel.js';
import userSchema from '../validators/UserValidator.js';
import { hashPassword } from '../utils/passwordUtils.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({where: {deletedAt: null}});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createUser = async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const { name, email, password, roles } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = { name, email, password:hashedPassword, roles };

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

export const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({where: {id: req.params.id, deletedAt: null}});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const { id } = req.params;
    const { name, email, password, roles } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = { name, email, password: hashedPassword, roles };

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser && existingUser.dataValues.id != id) {
        console.log(id);
        return res.status(400).json({
            errors: [
            { field: 'email', message: 'The email address is already in use.' }
            ]
        });
    }

    try {
        const result = await User.update(user, { where: { id } });
        if (result[0] === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user: { id, name, email, roles } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const softDeleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await User.update({deletedAt: new Date()}, { where: { id } });
        if(result[0] === 0) return res.status(404).send({message: "User not found"});
        res.send({message: "User Moved to trash successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const restoreUser = async (req, res) => {
    const { id } = req.params;
    try{
        const result = await User.update({deletedAt: null}, { where: { id } });
        if(result[0] === 0) return res.status(404).send({message: "User not found in trash"});
        res.send({message: "User Restored successfully"});
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try{
        const result = await User.destroy({ where: { id } });
        if(result === 0) return res.status(404).send({message: "User not found"});
        res.send({message: "User Deleted successfully"});
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}



