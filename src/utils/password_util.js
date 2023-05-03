import bcrypt from "bcryptjs"
const salt = bcrypt.genSaltSync(10)

const passwordUtil = {
    hash: (text) => bcrypt.hashSync(text, salt),
    checkPassword: (inputPassword, hashPassword) => {
        return bcrypt.compareSync(inputPassword, hashPassword)
    },
}

export default passwordUtil
