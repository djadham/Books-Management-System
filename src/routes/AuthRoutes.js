import {registerUser, userLogin, profile} from '../controllers/AuthController.js';
import express from "express";
import { authenticateToken, authorizeProfileAccess } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/registerUser', registerUser);
router.post('/userLogin', userLogin);
router.get('/profile/:id',authenticateToken, authorizeProfileAccess, profile);

export default router;
