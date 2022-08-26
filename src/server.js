import express from "express";
import bodyParser from "body-parser";

import initAppRoutes from "./routes/index";
const { configCors } = require("./config/cors");
// const { connection } = require("./config/connectDB");
require("dotenv").config();

const app = express();

const cookieParser = require("cookie-parser");

const hostname = process.env.HOST_NAME;
const PORT = process.env.PORT || 8080;

configCors(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// connection();

initAppRoutes(app);

app.use((req, res) => {
    return res.send("404 not found");
});

app.listen(PORT, hostname, () => {
    console.log(`Server is running on the PORT: ${PORT}`);
});
