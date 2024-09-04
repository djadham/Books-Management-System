import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Users from "./UsersModel.js";

const Reviews = sequelize.define("reviews", {
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
    comment: {
        type: DataTypes.STRING
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

Reviews.hasOne(Users, { foreignKey: "id", sourceKey: "userId", as: 'user' });

export default Reviews;