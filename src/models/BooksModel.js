import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import BookImages from "./BookImagesModel.js";
import BookGenres from "./BookGenresModel.js";
import Genres from "./GenresModel.js";
import BookAuthors from "./BookAuthorsModel.js";
import Users from "./UsersModel.js";
import Ratings from "./RatingsModel.js";
import Reviews from "./ReviewsModel.js";
import BookPublishers from "./BookPublishersModel.js";

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
Books.belongsToMany(Users, { through: BookAuthors, foreignKey: 'bookId', as: 'authors' });
Users.belongsToMany(Books, { through: BookAuthors, foreignKey: 'authorId', as: 'books' });
Books.hasMany(Ratings, { foreignKey: "bookId", as: "ratings" });
Books.hasMany(Reviews, { foreignKey: "bookId", as: "reviews" });
Books.belongsToMany(Users, { through: BookPublishers, foreignKey: 'bookId', as: 'publishers' });
Users.belongsToMany(Books, { through: BookPublishers, foreignKey: 'publisherId', as: 'book' });




export default Books;