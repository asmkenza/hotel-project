import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import dbAtlasConnect from './config/dbAtlasConfig.js';
import dbCompassConnect from './config/dbCompassConfig.js';
import adminRoutes from './routes/adminRoutes.js'
import cors from 'cors';



dotenv.config()
const PORT= process.env.PORT || 5000

//server mis en place
const app = express();

// Add CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));



if(process.env.NODE_ENV==="developement"){
app.use(morgan('dev'))
}

app.use(express.json())


//connection à la bdd
dbAtlasConnect();
//dbCompassConnect();


//écoute sur le port spécifié
app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT} `);
   })


//Middleware des routes admin
app.use("/admin",adminRoutes)