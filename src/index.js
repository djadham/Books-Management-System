import express from "express";
import axios from "axios";
import dotenv from 'dotenv';
import BookRoutes from "./routes/BookRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import AuthorsRoutes from "./routes/AuthorsRoutes.js";
import BookImageRoutes from "./routes/BookImageRoutes.js";
import GenresRoutes from "./routes/GenreRoutes.js";
import BookGenreRoutes from "./routes/BookGenreRoutes.js";
import BookAuthorRoutes from "./routes/BookAuthorRoutes.js";
import RatingsRoutes from "./routes/RatingsRoutes.js";
import ReviewsRoutes from "./routes/ReviewsRoutes.js"
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { bookSwagger, userSwagger, authSwagger, loginSwagger, bookImageSwagger, genreSwagger, BookGenresSchemaSwagger, BookAuthorsSchemaSwagger, RatingsSchemaSwagger, ReviewsSchemaSwagger } from "./validators/convertSchemas.js";
import BookGenres from "./models/BookGenresModel.js";


dotenv.config();
const app = express();

//swagger
const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Books APIs",
            version: "1.0.0",
        },
        components: {
            schemas: {
                Book: bookSwagger,
                User: userSwagger,
                Register: authSwagger,
                Login: loginSwagger,
                BookImage: bookImageSwagger,
                Genre: genreSwagger,
                BookGenre: BookGenresSchemaSwagger,
                BookAuthors: BookAuthorsSchemaSwagger,
                Ratings: RatingsSchemaSwagger,
                Reviews: ReviewsSchemaSwagger
            },
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
    
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ["./src/routes/**/*.js"],
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));


//middlewares
app.use(express.json());

//view engine
app.set('view engine', 'pug');
app.set('views', './src/views');

// routes
app.use('/api/books', BookRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/authors', AuthorsRoutes);
app.use('/api/bookimage', BookImageRoutes);
app.use('/api/genres', GenresRoutes);
app.use('/api/bookgenre', BookGenreRoutes);
app.use('/api/bookauthor', BookAuthorRoutes);
app.use('/api/ratings', RatingsRoutes);
app.use('/api/reviews', ReviewsRoutes);


app.get('/', async (req, res) => {

    const response = await axios.get('http://localhost:3000/api/books/getBooks');
    const data = response.data; // Assuming the API returns a JSON object

    res.render('index', {data});
});


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})


export default app;