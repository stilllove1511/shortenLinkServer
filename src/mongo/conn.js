import mongoose from "mongoose"
import { DATE } from "sequelize"

const conn = mongoose.createConnection("mongodb://127.0.0.1:27017/shorten_link")

export default {
    Link: conn.model(
        "Link",
        new mongoose.Schema({
            SQLDBId: Number,
            title: String,
            originalLink: String,
            alias: String,
            expiration: Date,
        })
    ),
}