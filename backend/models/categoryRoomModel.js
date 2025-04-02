import mongoose from 'mongoose';

const categoryRoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Veuillez indiquer un nom de catégorie !'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true, 
    },
    refHotel:{
      type:mongoose.Schema.ObjectId,
      ref:'Hotel',
      required:true
    }
  },
  { timestamps: true }
);


categoryRoomSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name.trim().replace(/\s+/g, '-').toLowerCase();
  }
  next();
});

const RoomCategory = mongoose.model('RoomCategory', categoryRoomSchema);

export default RoomCategory;