import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import BookImages from "./BookImagesModel.js";
import BookGenres from "./BookGenresModel.js";
import Genres from "./GenresModel.js";
import BookAuthors from "./BookAuthorsModel.js";
import Users from "./UsersModel.js";

const Books = sequelize.define("books", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    published_date: {
        type: DataTypes.DATE
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
        defaultValue: null,
    }

},
{
    timestamps: true
})

Books.hasMany(BookImages, { foreignKey: "book_id", as: "images" });
Books.belongsToMany(Genres, { through: BookGenres, as: "genres" });
// Books.hasOne(BookAuthors, { foreignKey: "bookId", as: "author" });
Books.belongsToMany(Users, { through: BookAuthors, foreignKey: 'bookId', as: 'authors' });
Users.belongsToMany(Books, { through: BookAuthors, foreignKey: 'authorId', as: 'books' });




export default Books;