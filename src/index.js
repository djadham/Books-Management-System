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
import ReviewsRoutes from "./routes/ReviewsRoutes.js";
import PublisherRoutes from "./routes/PublishersRoutes.js";
import BookPublisherRoutes from "./routes/BookPublisherRoutes.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { errorHandler, NotFoundError } from "./middlewares/errorHandler.js";
import { 
    bookSwagger, 
    userSwagger, 
    authSwagger, 
    loginSwagger, 
    bookImageSwagger, 
    genreSwagger, 
    BookGenresSchemaSwagger, 
    BookAuthorsSchemaSwagger, 
    RatingsSchemaSwagger, 
    ReviewsSchemaSwagger,
    BookPublisherSchemaSwagger
 } from "./validators/convertSchemas.js";
import path from "path";
const __dirname = path.resolve();

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
                Reviews: ReviewsSchemaSwagger,
                BookPublisher: BookPublisherSchemaSwagger
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

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/styles', express.static(path.join(__dirname, 'src/public/styles')));
app.use('/scripts', express.static(path.join(__dirname, 'src/public/scripts')));


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
app.use('/api/publishers', PublisherRoutes);
app.use('/api/bookpublisher', BookPublisherRoutes);


app.get('/', async (req, res) => {

    const response = await axios.get('http://localhost:3000/api/books/getBooks');
    const data = response.data; 
    res.render('index', {data});
});

app.get('/book-details/:id', async (req, res) => {
    const response = await axios.get('http://localhost:3000/api/books/getBookById/'+req.params.id);
    const book = response.data;
    console.log(book); 
    res.render('book-details', {book, baseUrl: process.env.BASE_URL});
});

app.use((req, res, next) => {
    next(new NotFoundError(`The requested resource- ${req.method} ${req.originalUrl} was not found`, 404));
});
app.use(errorHandler);


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})


export default app;