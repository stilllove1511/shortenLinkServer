import db from "../models/index";

const findOriginLink = async (slug) => {
    try {
        let link = await db.Link.findOne({
            where: {
                shortenLink: slug,
            },
            attributes: ["originLink"],
        });
        console.log(link);
        // if (link) {
        //     return link.originLink;
        // }
        return "https://google.com";
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
