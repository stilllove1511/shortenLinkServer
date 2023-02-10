import db from "../models"
import mongo from "../mongo/conn"
const Sequelize = require("sequelize")

const findOriginalLink = async (slug) => {
    try {
        let now = new Date()
        let link = await mongo.Link.findOne({
            alias: slug,
            expiration: {
                $gt: now,
            },
        })
        //check if link have not been expired
        if (link) {
            db.Link.update(
                {
                    timeVisited: Sequelize.literal("timeVisited + 1"),
                },
                {
                    where: {
                        id: link.SQLDBId,
                    },
                }
            )
            return link
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

export default { findOriginalLink }
