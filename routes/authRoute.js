import express from 'express'
import { validateSignUpRequest, isRequestValidated } from "../validator/register.js"
import createRegisterationDetail from "../controllers/userInformation/register.js"
import signIn from '../controllers/userInformation/login.js'
import profileData from '../controllers/userInformation/profile.js'
import { verifyToken } from '../validator/verifyToken.js'
import { checkRole } from '../RolebaseAuth/checkAuthorization.js'

const router = express.Router()


router.route("/signup").post(validateSignUpRequest, isRequestValidated, createRegisterationDetail)
router.route("/signIn").post(signIn)
router.route("/profile").get(verifyToken, profileData)

export default router 