require('dotenv').config()

const db = require('../models/index')
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
import { createJWT } from '../middlewares/JWTAction';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword
}

const checkUsernameExist = async (username) => {
    let user = await db.User.findOne({
        where: { username: username }
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
                EM: 'the email is already exist',
                EC: 1
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
            EM: 'A user is created successfully',
            EC: 0
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'something wrongs in service...',
            EC: -2
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
                [Op.or]: [
                    { username: rawData.username }
                ]
            }
        })
        if (user) {
            console.log(">>> found uer with usrename")
            let isCorrectPassword = checkPassword(rawData.password, user.password)
            if (isCorrectPassword) {
                let payload = {
                    username: user.username,
                }
                let token = createJWT(payload)
                return {
                    EM: 'ok!',
                    EC: 0,
                    DT: {
                        access_token: token,
                        username: user.username
                    }
                }
            }
        }
        console.log(">>> Input user with username: ", rawData.username, "password: ", rawData.password)

        return {
            EM: 'your username or password is not correct',
            EC: 1,
            DT: ''
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrongs in service...',
            EC: -2
        }
    }
}

export default {
    registerNewUser, handelUserLogin
}