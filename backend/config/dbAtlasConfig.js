import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

const dbAtlasConnect = async ()=>{
 try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to Atlas db");
    
    
 } catch (error) {
    console.log("an error occured on connecting to db");
    console.log(error);
    
    
 }
}


export default dbAtlasConnect;