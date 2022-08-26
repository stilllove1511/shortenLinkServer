import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};

const updatePassword = async (userData) => {
    let hashPassword = hashUserPassword(userData.password);

    try {
        await db.User.update(
            { password: hashPassword },
            {
                where: { id: userData.userId },
            }
        );
        return {
            EM: "update password successfully!",
            EC: 0,
            DT: "",
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "something wrongs in service...",
            EC: -2,
        };
    }
};

export default { updatePassword };
