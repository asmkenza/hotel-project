import express from 'express'
import { login, logout, refreshToken, register } from '../controllers/authController.js'
import { adminfunc, getAdminProfil } from '../controllers/adminController.js'
import {createHotel} from '../controllers/hotelController.js'
import authToken from './../middlewares/authMiddleware.js';
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from '../controllers/categoryRoomController.js';
import { validate } from './../middlewares/validate.js';
import { createCategoryValidator, updateCategoryValidator } from '../validators/categoryRoomValidator.js';
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from '../controllers/roomController.js';
import { createRoomValidator, updateRoomValidator } from '../validators/roomValidator.js';
import upload from '../middlewares/uploadMiddleware.js';





const router= express.Router()

//routes accessibles par l'admin

//Routes Authentification (register,login,logout,refreshToken)
router.post("/login",login)
router.post("/register",register)
router.post("/logout",logout)
router.post("/refresh-token",refreshToken)

//Route Création hotel 
// router.post("/createHotel",authToken,createHotel)
router.post("/createHotel",createHotel)

//Route Profil Admin
router.get("/profil/:id",authToken,getAdminProfil)

//route de test:auth
router.get("/",authToken,adminfunc)




//Routes Room Categories 
router.post("/room-categories",validate(createCategoryValidator),createCategory)
router.get("/room-categories-all",getCategories)
router.get("/room-categories/:id",authToken,getCategory)
router.delete("/room-categories/:id",deleteCategory)
router.put("/room-categories/:id",validate(updateCategoryValidator),updateCategory)




//Routes Room
router.post("/room-create", validate(createRoomValidator), createRoom);
router.get("/rooms",getRooms)
router.get("/room/:id",getRoom)
router.put("/room/:id", validate(updateRoomValidator), updateRoom);
router.delete("/room/:id",deleteRoom)





export default router;