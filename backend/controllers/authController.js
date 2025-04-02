import Admin from "../models/adminModel.js"
import jwt from 'jsonwebtoken';
import bcrypt, { decodeBase64 } from 'bcryptjs';


//fonctionnalités de l'athentification JWT

//générer un Token d'accès au login
export const generateAccessToken = (admin)=>{
    return jwt.sign({id :admin._id ,hotelId: admin.hotelId || null },process.env.JWT_SECRET , {expiresIn:process.env.JWT_ACCESS_EXPIRE} )
};

//générer un refreshToken qui sera stocké
export const generateRefreshToken =(admin)=>{
    return jwt.sign({id:admin._id, hotelId: admin.hotelId || null},process.env.JWT_REFRESH_SECRET,{expiresIn:process.env.JWT_REFRESH_EXPIRE})
}


//inscription admin pour le test
export const register = async (req,res)=>{
 
    try {

        const {nom, prenom ,email,numtel,password}=req.body
        
        const existAdmin = await Admin.findOne({ email })

        if(existAdmin){
           return res.status(400).json({message:'an admin already exists with that email'});
        }

        const salt = await bcrypt.genSalt(10)
        const hashedpwd = await  bcrypt.hash(password,salt)

        const admin = new Admin({nom, prenom ,email ,numtel, password:hashedpwd})
        const accessToken = generateAccessToken(admin);
        admin.accessToken = accessToken;
        await admin.save()

        res.status(201).json({message:'admin created',accessToken})
       
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'internal server error'})
    }

}


//Authentification admin
export const login = async (req,res)=>{
    try {

        const {email , password}=req.body

        const admin = await Admin.findOne({email})

        if(!admin || !(await bcrypt.compare(password,admin.password))){
            return res.status(401).json({message:'Email or password is incorrect'})
        }
        
        const accessToken = generateAccessToken(admin);
        const refreshToken = generateRefreshToken(admin);

        admin.accessToken = accessToken ;
        await admin.save()
       
       res.json({message:'admin Logged in successfully',accessToken,refreshToken})

       ///res.status(200).json({message:"login successful!"})


    } catch (error) {
        console.log(error)
        res.status(500).json({message:'internal server error'})
    }
}


//Mise à jour du refreshToken
export const refreshToken = async (req,res)=>{
    try {
      
        const {refreshToken}=req.body

        if (!refreshToken){
            return res.status(403).json({message:"No refresh token"})
        }


       const admin = await Admin.findOne({refreshToken})

       if(!admin){
        return res.status(403).json({message:"No admin with that refreshToken"})
       }


      jwt.verify(refreshToken , process.env.JWT_REFRESH_SECRET, (err,decoded)=>{
        if(err){
            return res.status(403).json({message:'Token expired'})
        }
      })


      const newAccesToken = generateAccessToken(admin);
      res.json({accessToken:newAccesToken})

        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'internal server error'})
        
    }
}



//Déconnexion de l'admin en annulant son resreshToken
export const logout = async (req,res)=>{
    try {
      
        const {accessToken}=req.body
        console.log(req.body); 

        if (!accessToken){
            console.log("No refresh token");
            return res.status(403).json({message:"No access token"})
        }


       const admin = await Admin.findOne({accessToken})

       if(!admin){
        console.log("No admin found with that accessToken");
        return res.status(403).json({message:"No admin found with that accessToken"})
       }


       admin.accessToken=null
       admin.tokenInvalidatedAt = new Date();

       await admin.save()
    
       res.status(200).json({message:'Successful Logout ! '})
      
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'internal server error'})
    }
}