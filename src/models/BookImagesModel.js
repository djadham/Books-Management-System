import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";   

const BookImages = sequelize.define("book_images", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    book_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Books', 
            key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
    },
    image_url: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    file_type: {
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
        defaultValue: null,
    }
})

BookImages.associate = (models) => {
    BookImages.belongsTo(models.Books, {
        foreignKey: 'book_id',
        as: 'book'
    })
}

export default BookImages;