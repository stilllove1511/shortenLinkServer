import logService from "../services/logService"

const handleRegister = async (req, res) => {
    try {
        //validate
        if (!req.body.username || !req.body.password) {
            return res.status(200).json({
                EM: "MIssing required parameters", //error message
                EC: "1", //error code
            })
        }

        //service: user create
        let data = await logService.registerNewUser(req.body)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: "error fom server",
            EC: "-1",
        })
    }
}

const handleLogin = async (req, res) => {
    try {
        let data = await logService.handelUserLogin(req.body)
        //set cookie
        if (data && data.DT && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token, {
                httpOnly: false,
                // sameSite: "None",
                // secure: true,
                expires: new Date(Date.now() + 900000),
            })
        }

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

const handleLoginGG = async (req, res) => {
    try {
        let data = await logService.handelUserLoginGG({
            username: req.user.emails[0].value,
        })
        res.cookie("jwt", data.DT.access_token, {
            httpOnly: false,
            // sameSite: "None",
            // secure: true,
            expires: new Date(Date.now() + 900000),
        })
        res.redirect(process.env.REACT_URL)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
        })
    }
}

export default {
    handleRegister,
    handleLogin,
    handleLoginGG,
}
