import db from "../models/index";
const { Op } = require('sequelize')

const findOriginalLink = async (slug) => {
    try {
        let now = new Date();
        let link = await db.Link.findOne({
            where:{
                alias: slug,
                expiration: {
                    [Op.gte]: now,
                },
            }
        });
        //check if link have not been expired
        if (link) {
            return link;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

export default { findOriginalLink };
