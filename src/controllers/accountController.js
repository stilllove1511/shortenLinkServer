import accountService from "../services/accountService"

const updatePassword = async (req, res) => {
    try {
        console.log(req.user)
        let data = await accountService.updatePassword({
            ...req.body,
            userId: req.user.id,
        })

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: "",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: "error fom server",
            EC: "-1",
            DT: "",
        })
    }
}

const getUserInfor = (req, res) => {
    console.log("origin:", req.headers.origin)
    res.status(200).json({
        EM: "get user infor succesfully!!",
        EC: 0,
        DT: req.user,
    })
}

export default { updatePassword, getUserInfor }
