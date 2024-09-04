import joiToSwagger from "joi-to-swagger";
import { bookSchema, userSchema, authSchema, loginSchema, BookImageSchema, GenreSchema, BookGenresSchema, BookAuthorsSchema, RatingsSchema, ReviewsSchema} from "./validator.js";

const { swagger: bookSwagger } = joiToSwagger(bookSchema);
const { swagger: userSwagger } = joiToSwagger(userSchema); 
const { swagger: authSwagger } = joiToSwagger(authSchema);
const { swagger: loginSwagger } = joiToSwagger(loginSchema);
const { swagger: bookImageSwagger } = joiToSwagger(BookImageSchema);
const { swagger: genreSwagger } = joiToSwagger(GenreSchema);
const { swagger: BookGenresSchemaSwagger } = joiToSwagger(BookGenresSchema);
const { swagger: BookAuthorsSchemaSwagger } = joiToSwagger(BookAuthorsSchema);
const { swagger: RatingsSchemaSwagger } = joiToSwagger(RatingsSchema);
const { swagger: ReviewsSchemaSwagger } = joiToSwagger(ReviewsSchema);

export { bookSwagger, userSwagger, authSwagger, loginSwagger, bookImageSwagger,genreSwagger, BookGenresSchemaSwagger, BookAuthorsSchemaSwagger, RatingsSchemaSwagger, ReviewsSchemaSwagger };