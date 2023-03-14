import express from "express"
import bodyParser from "body-parser"
import initAppRoutes from "./routes/index"
import { connectRedis } from "./redis"
import { connectMongo } from "./mongo"
import { configCors } from "./config/cors"
import cookieParser from "cookie-parser"
import session from "express-session"
const passport = require("passport")

require("dotenv").config()
const app = express()
const PORT = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
    })
)
app.use(passport.authenticate("session"))
passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, user)
    })
})

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user)
    })
})

configCors(app)

initAppRoutes(app)

//connect mongo
// connectMongo()

//connect redis
// connectRedis()

app.use((req, res) => {
    return res.send("404 not found")
})

app.listen(PORT, () => {
    console.log(`Server is running on the PORT: ${PORT}`)
})
