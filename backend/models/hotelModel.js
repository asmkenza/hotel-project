import mongoose from 'mongoose'

const hotelSchema = mongoose.Schema({

nom:{
    type:String,
    required:true
},
logo:{
    type:String,
    required:true

},
photo:{
    type:String,
    required:true

},
emplacement:{
    type:String,
    required:true

},
refAdmin:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Admin", 
    required: true
}



},{Timestamp:true})


const Hotel = mongoose.model("Hotel",hotelSchema)

export default Hotel;