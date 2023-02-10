import db from "../models/index"
import mongo from "../mongo/conn"

function generateHash(username, originalLink) {
    return btoa(username + originalLink)
}

const isUniqueLink = async (slug) => {
    let link = await db.Link.findOne({
        where: { alias: slug },
    })
    if (link) return false
    return true
}

const createCustomLink = async (data) => {
    try {
        let check = await isUniqueLink(data.alias)
        if (check) {
            let link = await db.Link.create({ ...data })
            data.title = undefined
            await mongo.Link.create({
                ...data,
                expiration: link.expiration,
                SQLDBId: link.id,
            })
            return {
                EM: "create link success",
                EC: 0,
            }
        } else {
            return {
                EM: "link have been already existed",
                EC: 1,
            }
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

        let link = await db.Link.create({ ...data })
        data.title = undefined
        await mongo.Link.create({ ...data, SQLDBId: link.id })
        return {
            EM: "create link success",
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
        attributes: ["id", "title", "originLink", "shortenLink"],
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
        attributes: ["id", "title", "originLink", "shortenLink"],
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
                id: data.id,
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
            await mongo.Link.updateOne(
                { SQLDBId: data.id },
                {
                    ...data,
                    id: undefined,
                    expiration: link.expiration,
                }
            )
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

const deleteLink = async (ids) => {
    try {
        let link = await db.Link.findOne({
            where: { id: ids.id },
        })

        if (link) {
            if (link.userId !== ids.userId)
                return {
                    EM: "you do not have permission to perfrom this action",
                    EC: -2,
                }

            await link.destroy()

            await mongo.Link.deleteOne({
                SQLDBId: link.id,
            })
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

export default {
    createLink,
    createCustomLink,
    readLink,
    readAllLink,
    updateLink,
    deleteLink,
}
