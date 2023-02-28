import redis from "../redis/"

export const delCache = (req, res) => {
    redis.del(req.linkAlias)
}
