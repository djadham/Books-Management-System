import joiToSwagger from "joi-to-swagger";
import bookSchema from "./bookValidator.js";
import userSchema from "./UserValidator.js";
import {authSchema, loginSchema} from "./AuthValidator.js";

const { swagger: bookSwagger } = joiToSwagger(bookSchema);
const { swagger: userSwagger } = joiToSwagger(userSchema); 
const { swagger: authSwagger } = joiToSwagger(authSchema);
const { swagger: loginSwagger } = joiToSwagger(loginSchema);

export { bookSwagger, userSwagger, authSwagger, loginSwagger };