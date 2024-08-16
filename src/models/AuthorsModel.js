import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db";

const Authors = sequelize.define("authors", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    },

},
    {
        timestamps: true
})

export default Authors;