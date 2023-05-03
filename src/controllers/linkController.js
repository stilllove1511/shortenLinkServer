import linkService from "../services/linkService"

const linkController = {
    createCustomLink: async (req, res) => {
        const { title, originalLink, alias, expiration } = req.body
        const user = req.user
        try {
            await linkService.createCustomLink({
                title,
                originalLink,
                alias,
                expiration,
                userId: user.id,
            })
            return res.status(200).json({
                code: 0,
                message: "ok",
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                code: 1,
                message: "some thing wrong :(",
            })
        }
    },

    createLink: async (req, res) => {
        const { title, originalLink, expiration } = req.body
        const user = req.user
        try {
            await linkService.createLink({
                title,
                originalLink,
                expiration,
                userId: user.id,
                username: user.username,
            })
            return res.status(200).json({
                code: 0,
                message: "ok",
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                code: 1,
                message: "some thing wrong :(",
            })
        }
    },

    readLink: async (req, res) => {
        try {
            const response = await linkService.getAllUserLink(req.user.id)
            return res.status(200).json({
                data: response.rows,
                total: response.count,
                code: 0,
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                code: 1,
                message: "some thing wrong :(",
            })
        }
    },

    getLinkByAlias: async (req, res) => {
        try {
            const link = await linkService.checkAuthorizedLink({
                linkAlias: req.params.alias,
                userId: req.user.id,
            })
            if (!link) {
                return res.status(401).json({
                    message:
                        "you don't have permission to access this resource",
                    code: 1,
                })
            }
            return res.status(200).json({
                data: link,
                code: 0,
            })
        } catch (error) {
            return res.status(500).json({
                message: "error from server",
                code: 1,
            })
        }
    },

    updateLink: async (req, res) => {
        const { originalLink, title, alias } = req.body
        try {
            await linkService.updateLink({
                originalLink,
                title,
                alias,
                userId: req.user.id,
            })
            return res.json({
                code: 0,
                message: "ok",
            })
        } catch (error) {
            return res.status(500).json({
                code: 1,
                message: "some thing wrong :(",
            })
        }
    },

    deleteLink: async (req, res) => {
        const { alias } = req.params
        try {
            const link = await linkService.getLinkByAlias(alias)
            if (!link) {
                return res.status(403).json({
                    EC: 1,
                    EM: "link is not exist",
                })
            }
            const authLink = await linkService.checkAuthorizedLink({
                alias,
                userId: req.user.id,
            })
            if (!authLink) {
                return res.status(403).json({
                    EC: 1,
                    EM: "you don't have permission to access this resource",
                })
            }
            await linkService.deleteLink(authLink)
            res.json({
                code: 0,
                message: "ok",
            })
        } catch (error) {
            return res.status(500).json({
                code: 1,
                message: "some thing wrong :(",
            })
        }
    },
}

export default linkController
