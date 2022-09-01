import db from "../models/index"

const isUniqueLink = async (slug) => {
    let link = await db.Link.findOne({
        where: { shortenLink: slug },
    })
    if (link) return false
    return true
}

const createLink = async (data) => {
    try {
        let check = await isUniqueLink(data.shortenLink)
        if (check) {
            let user = await db.Link.create({ ...data })
            if (user)
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

export default { createLink, readLink, readAllLink, updateLink, deleteLink }
