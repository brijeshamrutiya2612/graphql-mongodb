import jwt from 'jsonwebtoken';
import UserSchema from '../model/UserSchema.js';

export const checkRole = (req) => {
    try {
        const token = req.headers['authorization']?.split(" ")[1]

        jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
            if (err) {
                return res.status(401).json({ message: "Invalid Token" });
            }

            const { email } = data;
            const getRole = await UserSchema.findOne({ email: email })
            if(!getRole){
                return res.status(404).json({ message: "Role not found" });
            }


        })
    } catch (error) {

    }
    // return (req, res, next) => {
    //     const userRole = req.user.role; // Assuming the user role is added to the request object during JWT verification
    //     console.log("userRole",userRole)
    //     // if (roles[userRole].includes(role)) {
    //     //     next();
    //     // } else {
    //     //     return res.status(403).json({ message: 'Unauthorized access' });
    //     // }
    // };
};
