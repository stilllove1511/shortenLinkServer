import express from "express"
import bodyParser from "body-parser"
import initAppRoutes from "./routes/index"
import redis from "./redis"
const { configCors } = require("./config/cors")

require("dotenv").config()
const app = express()
const cookieParser = require("cookie-parser")
const PORT = process.env.PORT || 8080
var passport = require("passport")
var session = require("express-session")

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
;(async function () {
    try {
        await redis.connect()
    } catch (error) {
        console.log(error)
    }
})()
app.use((req, res) => {
    return res.send("404 not found")
})

app.listen(PORT, () => {
    console.log(`Server is running on the PORT: ${PORT}`)
})
