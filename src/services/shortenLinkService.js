import db from "../models/index";

const findOriginalLink = async (slug) => {
    try {
        let now = new Date();
        let link = await db.Link.findOne({
            alias: slug,
            expiration: {
                $gt: now,
            },
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
