import db from "../models/index";

const findOriginLink = async (slug) => {
    try {
        let link = await db.Link.findOne({
            where: {
                shortenLink: slug,
            },
        });

        if (link) {
            return link.originLink;
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "some thing wrong in service ...",
            EC: 1,
            DT: [],
        };
    }
};

export default { findOriginLink };
