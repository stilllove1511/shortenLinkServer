import redis from "../redis/index.js"
import db from "../models"
const Sequelize = require("sequelize")

export const checkCacheLink = async (req, res, next) => {
    try {
        let originalLink = await redis.get(req.params.slug)
        if (originalLink !== null) {
            originalLink = JSON.parse(originalLink) // parse link data
            let now = new Date()
            let expiration = new Date(originalLink.expiration)
            //check expired
            if (now < expiration) {
                res.redirect(originalLink.originalLink)
                db.Link.update(
                    {
                        timeVisited: Sequelize.literal("timeVisited + 1"),
                    },
                    {
                        where: {
                            originalLink: originalLink.originalLink,
                        },
                    }
                )
            } else {
                res.send("404")
            }
        } else {
            next()
        }
    } catch (error) {
        console.log(error)
        next()
    }
}

export const cacheLink = (req, res) => {
    let key = req.params.slug
    redis.set(
        key,
        JSON.stringify({
            originalLink: req.originalLink,
            expiration: req.expiration.toString(),
        })
    )
}

export const delCache = (req, res) => {
    let key = req.linkAlias
    redis.del(key)
}
