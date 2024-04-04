import { check, validationResult } from "express-validator";

export const validateSignUpRequest = [
    check("firstName").notEmpty().withMessage("First Name is required"),
    check("lastName").notEmpty().withMessage("Last Name is required"),
    check("email").isEmail().withMessage("email is required"),
    check("password").notEmpty().isLength({ min: 6 }).withMessage("Password must be at least 6 character long"),
]

export const isRequestValidated = (req, res, next) => {
    const error = validationResult(req)

    if (error.array().length > 0) {
        return res.status(400).json({ error: error.array()[0].msg })
    }
    next();
}
