import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db";

const Publishers = sequelize.define("publishers", { 
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    }
})

export default Publishers;