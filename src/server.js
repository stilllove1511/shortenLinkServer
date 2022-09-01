import express from "express"
import bodyParser from "body-parser"
import initAppRoutes from "./routes/index"
const cors = require("cors")
const { configCors } = require("./config/cors")
const { connection } = require("./config/connectDB")
require("dotenv").config()

const app = express()

const cookieParser = require("cookie-parser")

// const hostname = process.env.HOST_NAME
const PORT = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
    cors({
        origin: ["http://localhost:3000", process.env.REACT_URL],
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 200,
    })
)
// connection()

initAppRoutes(app)

app.use((req, res) => {
    return res.send("404 not found")
})

app.listen(PORT, () => {
    console.log(`Server is running on the PORT: ${PORT}`)
})
