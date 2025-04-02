import Admin from "../models/adminModel.js";
import Hotel from "../models/hotelModel.js"
import { generateAccessToken } from "./authController.js";
import upload from "../middlewares/uploadMiddleware.js";



export const createHotel = [
  upload.fields([{ name: 'photo' }, { name: 'logo' }]),
  async (req, res) => {
      const { nom, emplacement } = req.body;
      const photoUrl = req.files['photo'] ? req.files['photo'][0].path : null;
      const logoUrl = req.files['logo'] ? req.files['logo'][0].path : null;

      // const adminId = req.admin.id;
      const adminId = "67df443f6fff4cb7de13bf82";

      const admin = await Admin.findById(adminId);

      if (admin.refHotel) {
          return res.status(400).json({ message: 'Admin already has a hotel' });
      }

      try {
          const hotel = await Hotel.create({
              nom,
              logo: logoUrl,
              photo: photoUrl,
              emplacement,
              refAdmin: adminId
          });

          admin.refHotel = hotel._id;
          admin.tokenInvalidatedAt = new Date();

          await admin.save();

          const newAccesToken = generateAccessToken(admin);

          res.status(201).json({ message: "Hotel created successfully", hotel, accessToken: newAccesToken });
      } catch (error) {
          console.error("Error creating hotel:", error);
          res.status(500).json({ message: "Error while creating hotel!!!" });
      }
  }
];













// export const createHotel= [

//     upload.fields([{ name: 'photo' }, { name: 'logo' }]),
//     async (req,res)=>{
 
//     const { nom, emplacement } = req.body;
//     const photoUrl = req.files['photo'] ? req.files['photo'][0].path : null;
//     const logoUrl = req.files['logo'] ? req.files['logo'][0].path : null;


//     const adminId = req.admin.id

//     const admin = await Admin.findById(adminId)
    
//     if(admin.refHotel){
//         return res.status(400).json({message:'admin already have a hotel'})
//     }


//     try {
//         const hotel = await Hotel.create({
//             nom,
//             logo: logoUrl,
//             photo: photoUrl,
//             emplacement,
//             refAdmin: adminId 
//         });

//         admin.refHotel=hotel._id;
//         admin.tokenInvalidatedAt = new Date();

//         await admin.save()

//         const newAccesToken = generateAccessToken(admin)

//         res.status(201).json({message:"hotel created successfully", hotel , accessToken:newAccesToken});
//     } catch (error) {
//       res.status(500).json({ message: "error while creating hotel!!!" });
//       console.log(error);
//     }
//   }

// ];