import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true

    },
    photo:{
        type:String,
        required:false,

    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'RoomCategory',
        required:true

    },
    code:{
        type:String,
        unique:true,
        required:true,
        
    },
    capacity:{
        type:Number,
        required:true,
        
    },
    description:{
        type:String,
        required:true
    },
    refHotel:{
        type:mongoose.Schema.ObjectId,
        ref:'Hotel',
        required:true

    }

},{timestamps:true})


export const Room = mongoose.model('Room',roomSchema);