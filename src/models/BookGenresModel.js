import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db";

const BookGenres = sequelize.define("book_genres", {
    book_id: {
        type: DataTypes.INTEGER,
    },
    genre_id: {
        type: DataTypes.STRING
    }
})  

export default BookGenres;