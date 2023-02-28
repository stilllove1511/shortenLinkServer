import mongoose from "mongoose"
import { Schema } from "mongoose"

mongoose.set("strictQuery", true);

export const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        // console.log('connect mongo succesfully')
    } catch (error) {
        // console.log('connect mongo fail')
        console.log(error)
    }
}

const link = new Schema({
    SQLDBId: Number,
    title: String,
    originalLink: String,
    alias: String,
    expiration: Date,
})
export default {
    Link: mongoose.model("Link", link),
}
