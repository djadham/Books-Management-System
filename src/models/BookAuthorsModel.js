import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Books from "./BooksModel.js";
import Users from "./UsersModel.js";

const BookAuthors = sequelize.define("book_authors", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bookId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Books', 
            key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
    },
    authorId: {
        type: DataTypes.STRING,
        references: {
            model: 'Users',
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
        defaultValue: null
    }

})


export default BookAuthors;