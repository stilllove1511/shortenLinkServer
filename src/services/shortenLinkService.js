import mongo from "../mongo/conn";

const findOriginalLink = async (slug) => {
    try {
        let now = new Date();
        let link = await mongo.Link.findOne({
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
        if (error.message !== `Cannot read property 'expiration' of null`)
            console.log(error);
        return null;
    }
};

export default { findOriginalLink };
