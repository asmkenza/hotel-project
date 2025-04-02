import mongoose from 'mongoose';

//schéma de données de l'admin

const adminSchema = mongoose.Schema({

    nom:{
        type:String,
        required:true
    },
    prenom:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    numtel:{
        type: String,
        required: false,
        unique: true,
        maxlength:10,
        minlength:10
        //match: [/^\+?[0-9]{9,15}$/, "Numéro de téléphone invalide"] 
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    refHotel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Hotel',
        default:null
    },
    accessToken:{
        type:String
    },
    tokenInvalidatedAt: { 
        type: Date, default: null 
    }

},{timestamps:true})

const Admin = mongoose.model("Admin",adminSchema)

export default Admin;