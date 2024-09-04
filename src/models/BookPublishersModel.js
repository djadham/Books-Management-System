import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Books from "./BooksModel.js";
import Users from "./UsersModel.js";

const BookPublishers = sequelize.define("book_publishers", {
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
    publisherId: {
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

// BookPublishers.hasOne(Books, { foreignKey: "id", sourceKey: "bookId", as: "book" });
// BookPublishers.hasOne(Users, { foreignKey: "id", sourceKey: "publisherId", as: "publisher" });

export default BookPublishers;