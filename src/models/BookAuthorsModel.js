import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db";

const BookAuthors = sequelize.define("book_authors", {
    book_id: {
        type: DataTypes.INTEGER,
    },
    author_id: {
        type: DataTypes.STRING
    }
})

export default BookAuthors;