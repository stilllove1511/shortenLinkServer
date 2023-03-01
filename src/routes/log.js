import express from "express"
import logController from "../controllers/logController"
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy

const logRouter = express.Router()
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${
                process.env.BACK_END_URL
            }oauth2/redirect/google`,
            scope: ["profile", "email"]
        },
        function (accessToken, refreshToken, profile, done) {
            return done(null, profile)
        }
    )
)

logRouter.post("/register", logController.handleRegister)
logRouter.post("/login", logController.handleLogin)
logRouter.get(
    "/login/federated/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
)
logRouter.get(
    "/oauth2/redirect/google",
    passport.authenticate("google"),
    logController.handleLoginGG
)
export default logRouter
