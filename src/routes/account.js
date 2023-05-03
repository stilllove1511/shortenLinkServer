import express from "express";
import accountController from "../controllers/accountController";
import { checkUserJWT } from "../middlewares/JWTAction";
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy
const accountRouter = express.Router()

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.BACK_END_URL}oauth2/redirect/google`,
            scope: ["profile", "email"],
        },
        function (accessToken, refreshToken, profile, done) {
            return done(null, profile)
        }
    )
)

accountRouter.put(
    "/update-password",
    checkUserJWT,
    accountController.updatePassword
)
accountRouter.get(
    "/user-infor/:id",
    checkUserJWT,
    accountController.getUserInfor
)
accountRouter.post("/register", accountController.handleRegister)
accountRouter.post("/login", accountController.handleLogin)
accountRouter.get(
    "/login/federated/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
)
accountRouter.get(
    "/oauth2/redirect/google",
    passport.authenticate("google"),
    accountController.handleLoginGG
)

export default accountRouter


