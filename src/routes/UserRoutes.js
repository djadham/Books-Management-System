import { getUsers, createUser, getUserById, updateUser, softDeleteUser, restoreUser, deleteUser } from "../controllers/UserController.js";
import express from "express";


const router = express.Router();

// users apis
router.get('/getUsers', getUsers);
router.get('/getUserById/:id', getUserById);
router.post('/createUser', createUser);
router.put('/updateUser/:id', updateUser);
router.delete('/softDeleteUser/:id', softDeleteUser);
router.put('/restoreUser/:id', restoreUser);
router.delete('/deleteUser/:id', deleteUser);

export default router;