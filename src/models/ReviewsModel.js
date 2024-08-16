import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db";

const Reviews = sequelize.define("reviews", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    book_id: {
        type: DataTypes.INTEGER
    },
    rating: {
        type: DataTypes.INTEGER
    },
    comment: {
        type: DataTypes.STRING
    }
})

export default Reviews;