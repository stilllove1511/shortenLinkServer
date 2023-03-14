import db from "../models/index"

function generateHash(username, originalLink) {
    return btoa(username + originalLink)
}

const createCustomLink = async (data) => {
    try {
        let now = new Date()
        data.expiration = now.setDate(now.getDate() + 30)
        await db.Link.create({ ...data })
        return {
            EM: "create link success",
            EC: 0,
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "something wrong in service ...",
            EC: 1,
            DT: [],
        }
    }
}

const createLink = async (data) => {
    try {
        data.alias = generateHash(data.username, data.originalLink).substring(
            0,
            7
        )
        let now = new Date()
        data.expiration = now.setDate(now.getDate() + 30)
        await db.Link.create({ ...data })
        return {
            EM: "success",
            EC: 0,
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "something wrong in service ...",
            EC: 1,
        }
    }
}

const readLink = async (userId) => {
    let links = await db.Link.findAll({
        attributes: ["title", "originalLink", "alias"],
        where: {
            userId,
        },
    })
    if (links) {
        return {
            EM: "get data succes",
            EC: 0,
            DT: links,
        }
    } else {
        return {
            EM: "some thing wrong in service ...",
            EC: 1,
        }
    }
}

const readAllLink = async () => {
    let links = await db.Link.findAll({
        attributes: ["title", "originLink", "alias"],
    })
    if (links) {
        return {
            EM: "get data succes",
            EC: 0,
            DT: links,
        }
    } else {
        return {
            EM: "some thing wrong in service ...",
            EC: 1,
        }
    }
}

const updateLink = async (data) => {
    try {
        let link = await db.Link.findOne({
            where: {
                alias: data.alias,
            },
        })

        //check permission
        if (link.userId !== data.userId)
            return {
                EM: "you do not have permission to perfrom this action",
                EC: -2,
            }
        // check link is unique to increase performance
        if (link.shortenLink === data.shortenLink) {
            //upadte in sqldb
            //update in sql
            link.set({ ...data })
            await link.save()
            //upadte in mongo
            // await mongo.Link.updateOne(
            //     { SQLDBId: data.id },
            //     {
            //         ...data,
            //         id: undefined,
            //         expiration: link.expiration,
            //     }
            // )
            return {
                EM: "update ok",
                EC: 0,
                DT: link,
            }
        } else {
            let check = await isUniqueLink(data.shortenLink)
            if (check) {
                link.set({ ...data })
                await link.save()
                return {
                    EM: "update ok",
                    EC: 0,
                    DT: link,
                }
            } else {
                return {
                    EM: "link is same as another",
                    EC: 1,
                }
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "some thing wrong in service ...",
            EC: 1,
        }
    }
}

const deleteLink = async ({ userId, alias }) => {
    try {
        let link = await db.Link.findOne({
            where: { alias },
        })

        if (link) {
            if (link.userId !== userId)
                return {
                    EM: "you do not have permission to perfrom this action",
                    EC: -2,
                }

            await link.destroy()

            // await mongo.Link.deleteOne({
            //     SQLDBId: link.id,
            // })
            return {
                EM: "Deleted",
                EC: 0,
                DT: link,
            }
        } else {
            return {
                EM: "Link does not exist",
                EC: 2,
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "error from service",
            EC: 1,
        }
    }
}

const visitLink = async (alias) => {
    try {
        await db.Link.increment(
            {
                timeVisited: 1,
            },
            {
                where: {
                    alias,
                },
            }
        )
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export default {
    createLink,
    createCustomLink,
    readLink,
    readAllLink,
    updateLink,
    deleteLink,
    visitLink,
}
