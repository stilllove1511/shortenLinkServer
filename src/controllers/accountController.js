import accountService from "../services/accountService"
import passwordUtil from "../utils/password_util"
import { createJWT } from "../middlewares/JWTAction"

const accountController = {
    handleRegister: async (req, res) => {
        try {
            //validate
            if (!req.body.username || !req.body.password) {
                return res.status(400).json({
                    code: 1,
                    message: "missing required parameters",
                })
            }

            const isUsernameExist = await accountService.checkUsernameExist(
                req.body.username
            )
            if (isUsernameExist) {
                return res.status(400).json({
                    code: 1,
                    message: "the username is already exist",
                })
            }
            await accountService.createUser({
                username: req.body.username,
                password: req.body.password,
            })
            return res.status(302).json({
                code: 0,
                message: "ok",
            })
        } catch (e) {
            return res.status(500).json({
                code: 1,
                message: "some thing wrong :(",
            })
        }
    },

    handleLogin: async (req, res) => {
        const { username, password } = req.body
        try {
            const user = await accountService.findOneUserByUsername(username)
            if (!user || !user.password)
                return res.status(401).json({
                    code: 1,
                    message: "information is not correct",
                })
            let isCorrectPassword = passwordUtil.checkPassword(
                password,
                user.password
            )
            if (!isCorrectPassword)
                return res.status(401).json({
                    code: 1,
                    message: "information is not correct",
                })
            let payload = {
                id: user.id,
                username: user.username,
            }
            let token = createJWT(payload)
            res.cookie("jwt", token, {
                httpOnly: true,
                // sameSite: "None",
                // secure: true,
                expires: new Date(Date.now() + 900000),
            })
            return res.json({
                code: 0,
                message: "ok!",
                data: {
                    token,
                    userId: user.id,
                    roles: ["admin"],
                },
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                code: 1,
                message: "some thing wrong :(",
            })
        }
    },

    handleLoginGG: async (req, res) => {
        const email = req.user.emails[0].value
        try {
            const user = await accountService.findOneUserByUsername(email)
            if (user) {
                const payload = {
                    id: user.id,
                    username: user.username,
                }
                const token = createJWT(payload)
                res.cookie("jwt", token, {
                    httpOnly: true,
                    // sameSite: "None",
                    // secure: true,
                    expires: new Date(Date.now() + 900000),
                })
                return res.redirect(process.env.REACT_URL)
            } else {
                const newUser = await db.User.create({
                    username: email,
                })
                const payload = {
                    id: newUser.id,
                    username: newUser.username,
                }
                const token = createJWT(payload)
                res.cookie("jwt", token, {
                    httpOnly: true,
                    // sameSite: "None",
                    // secure: true,
                    expires: new Date(Date.now() + 900000),
                })
                return res.redirect(process.env.REACT_URL)
            }
        } catch (error) {
            return res.status(500).json({
                code: 1,
                message: "some thing wrong :(",
            })
        }
    },

    updatePassword: async (req, res) => {
        const { userId, oldPassword, newPassword } = req.body
        try {
            const hashedNewPassword = passwordUtil.hash(newPassword)
            await accountService.updatePassword({
                newPassword: hashedNewPassword,
                userId,
            })
            return res.status(200).json({
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

    getUserInfor: (req, res) => {
        res.status(200).json({
            data: {
                id: req.user.userId,
                name: req.user.username,
                roles: [{ roleId: 1, roleName: "Administrator" }],
                status: 1,
            },
            code: 200,
            message: "OK",
        })
    },
}

export default accountController
