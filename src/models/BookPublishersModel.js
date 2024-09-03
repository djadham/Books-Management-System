import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const BookPublishers = sequelize.define("book_publishers", {
    book_id: {
        type: DataTypes.INTEGER,
    },
    publisher_id: {
        type: DataTypes.STRING
    }
})

export default BookPublishers;