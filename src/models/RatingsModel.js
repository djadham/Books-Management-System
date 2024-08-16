import { Sequelize,DataTypes } from "sequelize";
import sequelize from "../config/db";

const Ratings = sequelize.define("ratings", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    book_id: {
        type: DataTypes.INTEGER
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    rating: {
        type: DataTypes.INTEGER
    }
})  

export default Ratings;