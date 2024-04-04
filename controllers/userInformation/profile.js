import UserSchema from "../../model/UserSchema.js"
import jwt from 'jsonwebtoken';


const profileData = async (req, res, next) => {
    try {
        // Extract the token from request headers
        const token = req.headers['authorization']?.split(" ")[1];

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
            if (err) {
                return res.status(401).json({ message: "Invalid Token" });
            }

            // Token is valid, proceed to fetch profile data
            const { email } = data; // Assuming email is stored in the token payload
            const getProfileData = await UserSchema.findOne({ email: email });

            if (!getProfileData) {
                return res.status(404).json({ message: "Profile not found" });
            }

            // Include additional user data or fields as needed
            const { iat, exp } = data;
            return res.status(200).json({ status: true, user: { ...getProfileData.toObject(), iat, exp }, message: "Success" });
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

    // if (!getProfileData) {
    //    return res.status(404).json({ message: "email not found" })
    // }

}

export default profileData