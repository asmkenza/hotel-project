import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

const dbCompassConnect = async ()=>{
 try {
    await mongoose.connect(process.env.MONGO_URI_COMPASS);
    console.log("connected to compass db");
    
    
 } catch (error) {
    console.log("an error occured on connecting to db");
    console.log(error);
    
    
 }
}


export default dbCompassConnect;