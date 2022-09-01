import linkService from "../services/linkService"

const testLink = (req, res) => {
    res.status(200).json({
        EM: "link test api ok",
        EC: 0,
        DT: "",
    })
}

const createLink = async (req, res) => {
    try {
        let data = await linkService.createLink({
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

const updateLink = async (req, res) => {
    try {
        let data = await linkService.updateLink({
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

const deleteLink = async (req, res) => {
    try {
        let userId = req.user.id
        let linkId = req.body.id

        let data = await linkService.deleteLink({ id: linkId, userId: userId })
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DR: data.DT,
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

export default {
    testLink,
    createLink,
    readLink,
    readAllLink,
    updateLink,
    deleteLink,
}
