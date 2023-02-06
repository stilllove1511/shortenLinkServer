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
            expiration: {
                type: Date,
                default: function () {
                    return new Date(Date.now() + 24 * 60 * 60 * 1000)
                },
            },
        })
    ),
}
