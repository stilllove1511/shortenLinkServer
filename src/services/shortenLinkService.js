import db from "../models/index";
const { Op } = require('sequelize')

const shortenLinkService = {
    findOne: async (slug) => {
        let now = new Date()
        return db.Link.findOne({
            where: {
                alias: slug,
                expiration: {
                    [Op.gte]: now,
                },
            },
        })
    },
} 

export default shortenLinkService
