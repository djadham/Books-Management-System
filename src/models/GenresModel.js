import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db";

const Genres = sequelize.define("genres", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    }
})  

export default Genres;