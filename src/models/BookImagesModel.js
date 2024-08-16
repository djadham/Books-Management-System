import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db";   

const BookImages = sequelize.define("book_images", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    book_id: {
        type: DataTypes.INTEGER
    },
    image_url: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    file_type: {
        type: DataTypes.STRING
    }
})

export default BookImages;