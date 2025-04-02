  import RoomCategory from "../models/categoryRoomModel.js"
  import moment from 'moment'; 




  //Creation
  export const createCategory= async(req,res)=>{
    const {name} = req.body
    const hotelId = "67db40465c519d5288027a63"

    if(!hotelId){
      return res.status(400).json({message:'no hotel attached to the admin , create one'})
    }

    try {
      
        const category = await RoomCategory.create({name,refHotel:hotelId})
        res.status(201).json({message:'RoomCategory created :)'})

        
    } catch (error) {
        res.status(500).json({message:'internal server error :/ '})
        console.log(error);
        
    }
  }

//toutes les catégories de l'hotel
export const getCategories = async (req, res) => {
  const hotelId = "67db40465c519d5288027a63";

  try {
    const categories = await RoomCategory.find({ refHotel: hotelId });

    // Format the dates
    const formattedCategories = categories.map(category => {
      const formattedDate = moment(category.createdAt).format('DD-MM-YYYY à HH:mm');
      return { ...category._doc, createdAt: formattedDate };
    });

    res.status(200).json(formattedCategories);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error :/' });
  }
};

//une seule catégorie de l'hotel
export const getCategory = async (req, res) => {
  const { id } = req.params;
  const hotelId = req.admin.refHotel;

  try {
    const category = await RoomCategory.findById({ _id: id, hotelId });
    if (!category) {
      return res.status(404).json({ message: 'category not found :(' });
    }

    // Format the date
    const formattedDate = moment(category.createdAt).format('DD-MM-YYYY à HH:mm');
    const formattedCategory = { ...category._doc, createdAt: formattedDate };

    res.status(200).json(formattedCategory);
    console.log('category found :)');
  } catch (error) {
    res.status(500).json({ message: 'internal server error :/' });
    console.log(error);
  }
};

//Suppression
 export const deleteCategory = async(req,res)=>{
    const {id}= req.params
    const hotelId = "67db40465c519d5288027a63"

    try {

        const found = await RoomCategory.findById({ _id: id, hotelId })

        if(! found ){
            return res.status(404).json({message:'category not found :/'})
        }
        
        const category = await RoomCategory.findByIdAndDelete({ _id: id, hotelId })
        res.status(200).json({message:'category deleted :)'})


    } catch (error) {
        res.status(500).json({message:'internal server error :/'})
    }
  }

  export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
  
    try {
      console.log(`Updating category with ID: ${id} and name: ${name}`);
  
      const category = await RoomCategory.findById(id);
      if (!category) {
        return res.status(404).json({ message: 'The category is not in db !!' });
      }
  
      category.name = name;
      category.slug = name.trim().replace(/\s+/g, '-').toLowerCase();
  
      await category.save();
  
      console.log('Category updated successfully');
      res.status(200).json({ message: 'category updated :) ' });
  
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ message: "internal error server" });
    }
  };
  