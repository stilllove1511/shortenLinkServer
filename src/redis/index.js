import { createClient } from "redis"

const redis = createClient({
    url: process.env.REDIS_URL
})

export const connectRedis = async () => {
    try {
        await redis.connect()
        // console.log("connect redis succesfully")
    } catch (error) {
        // console.log("connect redis fail")
        console.log(error)
    }
}
export default redis
