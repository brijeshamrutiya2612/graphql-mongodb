import UserSchema from "../../model/UserSchema.js"
import bcrypt from 'bcrypt'

const createRegisterationDetail = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // const bcryptPassword = await bcrypt.hash(password, 10);

    const userData = {
        firstName,
        lastName,
        email,
        password
    };

    try {
        const checkExistEmail = await UserSchema.findOne({ email });

        if (checkExistEmail) {
            return res.status(400).json({ email: `${req.body.email} is already exist` });
        }

        // Create a new user document using the UserSchema model
        const newUser = new UserSchema(userData);
        await newUser.save(); // Save the new user document to the database

        // Respond with success message
        res.status(200).json({ status: true, user: newUser, message: "Successfully created" });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};

export default createRegisterationDetail;