import db from "../models/index"
import hashUtil from "../utils/hash_util"

const linkService = {
    createCustomLink: async ({
        title,
        originalLink,
        alias,
        expiration,
        userId,
    }) => {
        if (!expiration) {
            let now = new Date()
            expiration = now.setDate(now.getDate() + 30)
        }
        return db.Link.create({
            title,
            originalLink,
            alias,
            expiration,
            userId,
        })
    },

    createLink: async ({
        title,
        originalLink,
        expiration,
        userId,
        username,
    }) => {
        const alias = hashUtil
            .generateHash(username, originalLink)
            .substring(0, 7)
        if (!expiration) {
            let now = new Date()
            expiration = now.setDate(now.getDate() + 30)
        }
        return db.Link.create({
            title,
            originalLink,
            expiration,
            userId,
            alias,
        })
    },

    getAllUserLink: async (userId) => {
        return db.Link.findAndCountAll({
            attributes: ["title", "originalLink", "alias"],
            where: {
                userId,
            },
        })
    },

    updateLink: async ({ originalLink, title, userId, alias }) => {
        return await db.Link.update(
            { originalLink, title },
            {
                where: {
                    alias,
                    userId,
                },
            }
        )
    },

    deleteLink: async (link) => {
        return link.destroy()
    },

    checkAuthorizedLink: async ({ linkAlias: alias, userId }) => {
        return db.Link.findOne({
            where: {
                alias,
                userId,
            },
        })
    },

    getLinkByAlias: async (alias) => {
        return db.Link.findOne({
            where: {
                alias,
            },
        })
    },
}

export default linkService
