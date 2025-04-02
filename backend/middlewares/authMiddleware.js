import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js"


//Vérifier si le token est valide sinon ne pas autoriser l'accès
const authToken = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) return res.status(403).json({ message: "Access denied" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        

        const admin = await Admin.findById(verified.id);

        if (!admin) {
            return res.status(403).json({ message: "User not found" });
        }


        if (admin.tokenInvalidatedAt && verified.iat < Math.floor(admin.tokenInvalidatedAt.getTime() / 1000)) {
            return res.status(403).json({ message: "Token invalidated" });
        }

        
        req.admin = admin;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default authToken;
