import { Sequelize,DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Users from "./UsersModel.js";

const Ratings = sequelize.define("ratings", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bookId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Books', 
            key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users', 
            key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
    },
    rating: {
        type: DataTypes.INTEGER
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
    }
})  

Ratings.hasOne(Users, { foreignKey: 'id', sourceKey: 'userId', as: 'user' });

export default Ratings;