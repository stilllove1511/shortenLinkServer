import redis from "../redis/index.js";

export const checkCacheLink = async (req, res, next) => {
    try {
        let originalLink = await redis.get(req.params.slug);
        if (originalLink !== null) {
            originalLink = JSON.parse(originalLink); // parse link data
            let now = new Date();
            let expiration = new Date(originalLink.expiration);
            //check expired
            if (now < expiration) {
                res.redirect(originalLink.originalLink);
            } else {
                res.send("404");
            }
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        next();
    }
};

export const cacheLink = (req, res) => {
    redis.set(
        req.params.slug,
        JSON.stringify({
            originalLink: req.originalLink,
            expiration: req.expiration.toString(),
        })
    );
};
