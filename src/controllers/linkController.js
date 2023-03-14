import linkService from "../services/linkService"

const createCustomLink = async (req, res) => {
    try {
        let data = await linkService.createCustomLink({
            ...req.body,
            userId: req.user.id,
        })

        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT, //data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
        })
    }
}

const createLink = async (req, res) => {
    try {
        let data = await linkService.createLink({
            ...req.body,
            userId: req.user.id,
            username: req.user.username,
        })

        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT, //data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
        })
    }
}

const readLink = async (req, res) => {
    try {
        let data = await linkService.readLink(req.user.id)

        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT, //data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
        })
    }
}

const readAllLink = async (req, res) => {
    try {
        let data = await linkService.readAllLink()

        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT, //data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
        })
    }
}

const updateLink = async (req, res, next) => {
    try {
        let data = await linkService.updateLink({
            oldAlias:req.params.alias,
            ...req.body,
            userId: req.user.id,
        })
        res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT || null, //data
        })

        // req.linkAlias = data.DT.alias || null
        // next() //to cache middleware
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
        })
    }
}

const deleteLink = async (req, res, next) => {
    try {
        let data = await linkService.deleteLink({ alias: req.params.slug, userId: req.user.id })
        res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT || null,
        })

        // req.linkAlias = data.DT.alias || null
        // next() //to cache middleware
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
        })
    }
}

const visitLink = async (req, res) => {
    try {
        await linkService.visitLink(req.params.id)
        res.json({
            EC: 0,
            EM: "ok",
        })
    } catch (error) {
        console.log(error)
        res.json({
            EC: 1,
            EM: "server error",
        })
    }
}

export default {
    createCustomLink,
    createLink,
    readLink,
    readAllLink,
    updateLink,
    deleteLink,
    visitLink,
}
