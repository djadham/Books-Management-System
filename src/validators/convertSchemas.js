import joiToSwagger from "joi-to-swagger";
import { bookSchema, userSchema, authSchema, loginSchema, BookImageSchema, GenreSchema, BookGenresSchema, BookAuthorsSchema} from "./validator.js";

const { swagger: bookSwagger } = joiToSwagger(bookSchema);
const { swagger: userSwagger } = joiToSwagger(userSchema); 
const { swagger: authSwagger } = joiToSwagger(authSchema);
const { swagger: loginSwagger } = joiToSwagger(loginSchema);
const { swagger: bookImageSwagger } = joiToSwagger(BookImageSchema);
const { swagger: genreSwagger } = joiToSwagger(GenreSchema);
const { swagger: BookGenresSchemaSwagger } = joiToSwagger(BookGenresSchema);
const { swagger: BookAuthorsSchemaSwagger } = joiToSwagger(BookAuthorsSchema);

export { bookSwagger, userSwagger, authSwagger, loginSwagger, bookImageSwagger,genreSwagger, BookGenresSchemaSwagger, BookAuthorsSchemaSwagger };