import Admin from "../models/adminModel.js"

//fonctionnalitées protégées de l'admin

export const adminfunc = (req,res)=>{
    res.json({message:"Welcome Admin! "})
}


export const getAdminProfil =async (req,res)=>{

    const {id}=req.params

    try {

        const admin = await Admin.findById(id)

        if(!admin){
            return  res.status(404).json({message:"profil doesn't exist :("})
        }

        res.status(200).json(admin)
        
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        
    }

}