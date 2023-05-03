import db from "../models/index"
import passwordUtil from "../utils/password_util"

const accountService = {
    checkUsernameExist: async (username) => {
        const user = await db.User.findOne({
            where: { username: username },
        })

        if (user) {
            return true
        }
        return false
    },
    createUser: async ({ username, password }) => {
        return db.User.create({
            username,
            password: passwordUtil.hash(password),
        })
    },
    updatePassword: async ({ userId, newPassword }) => {
        return db.User.update(
            { password: newPassword },
            {
                where: { id: userId },
            }
        )
    },
    findOneUserByUsername: async (username) => {
        return db.User.findOne({
            where: { username },
        })
    },
}

export default accountService
