import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Genres from "./GenresModel.js";
import Books from "./BooksModel.js";

const BookGenres = sequelize.define("book_genres", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bookId: {
        type: DataTypes.STRING,
        references: {
            model: 'Books', 
            key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
    },
    genreId: {
        type: DataTypes.STRING,
        references: {
            model: 'Genres',
            key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    }
})  

export default BookGenres;