import Books from "../models/BooksModel.js";
import Users from "../models/UsersModel.js";
import BookAuthors from "./BookAuthorsModel.js";
import BookGenres from "./BookGenresModel.js";
import Genres from "./GenresModel.js";
import BookPublishers from "./BookPublishersModel.js";

const defineAssociations = () => {
    Books.hasMany(BookAuthors, { foreignKey: "bookId", sourceKey: "id" });
    BookAuthors.belongsTo(Books, { foreignKey: "bookId", targetKey: "id" });
    Users.hasMany(BookAuthors, { foreignKey: "authorId", sourceKey: "id" });
    BookAuthors.belongsTo(Users, { foreignKey: "authorId", targetKey: "id", as: "author" });

    BookGenres.belongsTo(Books, { foreignKey: "bookId", sourceKey: "id" });
    BookGenres.belongsTo(Genres, { foreignKey: "genreId", sourceKey: "id" });

    BookPublishers.belongsTo(Books, { foreignKey: "bookId", sourceKey: "id" });
    BookPublishers.belongsTo(Users, { foreignKey: "publisherId", sourceKey: "id", as: "publisher" });
};

export default defineAssociations;