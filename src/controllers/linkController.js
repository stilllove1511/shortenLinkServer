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
            DT: "",
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
            DT: "",
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
            DT: "",
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
            DT: "",
        })
    }
}

const updateLink = async (req, res, next) => {
    try {
        let data = await linkService.updateLink({
            ...req.body,
            ...req.params,
            userId: req.user.id,
        })
        res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT || null, //data
        })

        req.linkAlias = data.DT.alias || null
        next() //to cache middleware
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        })
    }
}

const deleteLink = async (req, res, next) => {
    try {
        let userId = req.user.id
        let linkId = req.params.id

        let data = await linkService.deleteLink({ id: linkId, userId: userId })
        res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT || null,
        })

        req.linkAlias = data.DT.alias || null
        next() //to cache middleware
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
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
}
