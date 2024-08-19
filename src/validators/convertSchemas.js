import joiToSwagger from "joi-to-swagger";
import bookSchema from "./bookValidator.js";
import userSchema from "./UserValidator.js";

const { swagger: bookSwagger } = joiToSwagger(bookSchema);
const { swagger: userSwagger } = joiToSwagger(userSchema); 

export { bookSwagger, userSwagger };