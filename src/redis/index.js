import { createClient } from "redis"

const redis = createClient({
    host: process.env.REDIS_HOST||'localhost',
    port: process.env.REDIS_POST||'6379'
})

export const connectRedis = async () => {
    try {
        await redis.connect()
        // console.log("connect redis succesfully")
    } catch (error) {
        console.log("connect redis fail")
        // console.log(error)
    }
}
export default redis
