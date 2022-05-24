import express from 'express'
import bodyParser from 'body-parser'

import initAppRoutes from './routes/api'

require('dotenv').config()

const app = express()

const hostname = 'localhost'
const PORT = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


initAppRoutes(app)

app.use((req, res) => {
    return res.send('404 not found')
})

app.listen(PORT, hostname, () => {
    console.log(`Server is running on the PORT: ${PORT}`)
})