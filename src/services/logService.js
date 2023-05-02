import db from "../models/index"
import bcrypt from "bcryptjs"
import { Op } from "sequelize"
import { createJWT } from "../middlewares/JWTAction"

const salt = bcrypt.genSaltSync(10)

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt)
    return hashPassword
}

const checkUsernameExist = async (username) => {
    let user = await db.User.findOne({
        where: { username: username },
    })

    if (user) {
        return true
    }
    return false
}

const registerNewUser = async (rawUserData) => {
    try {
        //check username are exist
        let isUsernameExist = await checkUsernameExist(rawUserData.username)

        if (isUsernameExist) {
            return {
                EM: "the username is already exist",
                EC: 1,
            }
        }

        //hash user password
        let hashPassword = hashUserPassword(rawUserData.password)

        //create new user
        await db.User.create({
            username: rawUserData.username,
            password: hashPassword,
        })

        return {
            EM: "A user is created successfully",
            EC: 0,
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "something wrongs in service...",
            EC: -2,
        }
    }
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword)
}

const handelUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [{ username: rawData.username }],
            },
        })
        if (user &&user.password) {
            let isCorrectPassword = checkPassword(
                rawData.password,
                user.password
            )
            if (isCorrectPassword) {
                let payload = {
                    id: user.id,
                    username: user.username,
                }
                let token = createJWT(payload)
                return {
                    EM: "ok!",
                    EC: 0,
                    DT: {
                        access_token: token,
                        username: user.username,
                    },
                }
            }
        }

        return {
            EM: "your username or password is not correct",
            EC: 1,
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "something wrongs in service...",
            EC: -2,
        }
    }
}

const handelUserLoginGG = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [{ username: rawData.username }],
            },
        })
        if (user) {
            let payload = {
                id: user.id,
                username: user.username,
            }
            let token = createJWT(payload)
            return {
                EM: "ok!",
                EC: 0,
                DT: {
                    access_token: token,
                    username: user.username,
                },
            }
        } else {
            let newUser = await db.User.create({
                username: rawData.username,
            })
            let payload = {
                id: newUser.id,
                username: newUser.username,
            }
            let token = createJWT(payload)
            return {
                EM: "A user is created successfully",
                EC: 0,
                DT: {
                    access_token: token,
                    username: rawData.username,
                },
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "something wrongs in service...",
            EC: -2,
        }
    }
}

export default {
    registerNewUser,
    handelUserLogin,
    handelUserLoginGG,
}
