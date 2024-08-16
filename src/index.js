import express from "express";
import axios from "axios";
import dotenv from 'dotenv';
import BookRoutes from "./routes/BookRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";


dotenv.config();
const app = express();

//middlewares
app.use(express.json());

//view engine
app.set('view engine', 'pug');
app.set('views', './src/views');

// routes
app.use('/api/books', BookRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/auth', AuthRoutes);


app.get('/', async (req, res) => {

    const response = await axios.get('http://localhost:3000/api/books/getBooks');
    const data = response.data; // Assuming the API returns a JSON object

    res.render('index', {data});
});


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})
