import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Register = mongoose.Schema;

const UserSchema = Register({
    firstName: {
        type: String,
        require: true,
        trim: true,
        min: 3,
        max: 20,
    },
    lastName: {
        type: String,
        require: true,
        trim: true,
        min: 3,
        max: 20,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        min: 3,
        max: 100,
    },
    password: {
        type: String,
        require: true,
        trim: true,
        min: 3,
        max: 100,
    }
}, { timestamps: true })


/// Check password is modified or not, If not password stored as a hash converted password

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});



export default mongoose.model("database colllection", UserSchema);