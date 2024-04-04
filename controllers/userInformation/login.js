import UserSchema from "../../model/UserSchema.js"
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email) {
            return res.status(400).json({ message: "Please enter email" })
        }

        const isUser = await UserSchema.findOne({ email })

        if (isUser) {
            const isPassword = await bcrypt.compare(password, isUser.password) // first parametter is database field name and second peramatter is come from req.body

            if (!isPassword) {
                return res.status(200).json({ message: "Invalid password" })
            }
            
            const token = jwt.sign({ _id: isUser._id, email: isUser.email }, process.env.JWT_SECRET, { expiresIn: "24h" })
            return res.status(200).json({ token, user: isUser, message: "Loging Successfull" })

        } else {
            return res.status(200).send({ message: 'user does not exist' });
        }
    } catch (error) {
        console.error("Error signing in:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default signIn