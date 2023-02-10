import express from "express"
import bodyParser from "body-parser"
import initAppRoutes from "./routes/redirectorIndex"
import redis from "./redis"
require("dotenv").config()

const app = express()
const PORT = process.env.S2PORT || 8081

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
initAppRoutes(app)
app.use((req, res) => {
    return res.send("404 not found")
})
;(async function () {
    try {
        await redis.connect()
    } catch (error) {
        console.log(error)
    }
})()

app.listen(PORT, () => {
    console.log(`Server is running on the PORT: ${PORT}`)
})
