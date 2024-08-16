import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Users = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    roles: {
        type: DataTypes.STRING,
        defaultValue: "user"
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
        defaultValue: null,
    },
},
    {
        // Ensure the password is not included when serializing instances
        defaultScope: {
          attributes: { exclude: ['password'] }
        },
        scopes: {
          withPassword: { attributes: {} }
        }
        
})

export default Users;