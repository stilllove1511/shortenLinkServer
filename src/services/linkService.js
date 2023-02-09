import db from "../models/index"
import mongo from "../mongo/conn"

function generateHash(username, originalLink) {
    const timestamp = new Date().getTime()
    const hash = btoa(username + originalLink + timestamp)
    return hash
}

const getCharacters = (str) => {
    let firstThree = str.substring(0, 3)
    let lastFour = str.substring(str.length - 4)
    return firstThree + lastFour
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
            await mongo.Link.create({ ...data, SQLDBId: link.id })
            return {
                EM: "create link success",
                EC: 0,
                DT: [],
            }
        } else {
            return {
                EM: "link have been already existed",
                EC: 1,
                DT: [],
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
        data.alias = getCharacters(
            generateHash(data.username, data.originalLink)
        )
        let link = await db.Link.create({ ...data })
        data.title = undefined
        await mongo.Link.create({ ...data, SQLDBId: link.id })
        return {
            EM: "create link success",
            EC: 0,
            DT: [],
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
            DT: [],
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
            DT: [],
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

        if (link.userId !== data.userId)
            return {
                EM: "you do not have permission to perfrom this action",
                EC: -2,
                DT: [],
            }

        if (link.shortenLink === data.shortenLink) {
            //upadte in sqldb

            await db.Link.update(
                {
                    ...data,
                },
                {
                    where: { id: data.id },
                }
            )
            //upadte in mongo
            await mongo.Link.updateOne(
                { SQLDBId: data.id },
                {
                    ...data,
                    id: undefined,
                }
            )
            return {
                EM: "update ok",
                EC: 0,
                DT: [],
            }
        } else {
            let check = await isUniqueLink(data.shortenLink)
            if (check) {
                await db.Link.update(
                    {
                        ...data,
                    },
                    {
                        where: { id: data.id },
                    }
                )
                return {
                    EM: "update ok",
                    EC: 0,
                    DT: [],
                }
            } else {
                return {
                    EM: "link is same as another",
                    EC: 1,
                    DT: [],
                }
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "some thing wrong in service ...",
            EC: 1,
            DT: [],
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
                    DT: [],
                }

            await link.destroy()

            await mongo.Link.deleteOne({
                SQLDBId: link.id,
            })
            return {
                EM: "Deleted",
                EC: 0,
                DT: [],
            }
        } else {
            return {
                EM: "Link does not exist",
                EC: 2,
                DT: [],
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "error from service",
            EC: 1,
            DT: [],
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
