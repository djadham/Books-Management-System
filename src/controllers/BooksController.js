import Books from "../models/BooksModel.js";
import Joi from "joi";
import bookSchema from "../validators/bookValidator.js";
import { Sequelize } from "sequelize";

export const getBooks = async (req, res) => {
    try{
        const books = await Books.findAll({where: {deletedAt: null}});
        res.send(books);
    }catch(err){
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving books."
        });
    }
}

export const getBookById = async (req, res) => {
    try{
        const book = await Books.findOne({where: {deletedAt: null, id: req.params.id}});
        if(!book) return res.status(404).send({message: "Book not found"});
        res.send(book);
    }catch(err){
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving book."
        });
    }
}

export const createBook = async (req, res) => {
    const { error } = bookSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { title, description, published_date } = req.body;
    const book = { title, description, published_date };
    try {
        const result = await Books.create(book);
        res.send(result);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the book."
        });
    }
}  

export const updateBook = async (req, res) => {
    const { error } = bookSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const { id } = req.params;

    if(!id) {
        return res.status(400).send({
            message: "Book id is required"
        })
    }

    const { title, description, published_date } = req.body;
    const book = { title, description, published_date };
    try{
        const result = await Books.update(book, { where: { id } });
        if(result[0] === 0) return res.status(404).send({message: "Book not found"});
        res.send({message: "Book updated successfully", book});
    }catch (err) {
        res.status(500).send({
            message: 
                err.message || "Some error occured while updating the book."
        })
    }
}

export const softDeleteBook = async (req, res) => {
    const { id } = req.params;
    try{
        const result = await Books.update({deletedAt: new Date()}, { where: { id } });
        if(result[0] === 0) return res.status(404).send({message: "Book not found"});
        res.send({message: "Book Moved to trash successfully"});
    }catch(err){
        res.status(500).send({
            message: 
                err.message || "Some error occured while deleting the book."
        })
    }
}

export const restoreBook = async (req, res) => {
    const { id } = req.params;
    try{
        const result = await Books.update({deletedAt: null}, { where: { id: id, deletedAt: { [Sequelize.Op.ne]: null } } });
        if(result[0] === 0) return res.status(404).send({message: "Book not found in trash"});
        res.send({message: "Book Restored successfully"});
    }catch(err){
        res.status(500).send({
            message: 
                err.message || "Some error occured while restoring the book."
        })
    }
}

export const deleteBook = async (req, res) => {
    const { id } = req.params;
    try{
        const result = await Books.destroy({ where: { id } });
        if(result === 0) return res.status(404).send({message: "Book not found"});
        res.send({message: "Book permanently deleted successfully"});
    }catch(err){
        res.status(500).send({
            message: 
                err.message || "Some error occured while deleting the book."
        })
    }
}