import shortenLinkService from "../services/shortenLinkService"

const redirect = async (req, res, next) => {
    try {
        let alias = req.params.slug
        let originalLink = await shortenLinkService.findOriginalLink(alias) //find link
        if (originalLink) {
            res.redirect(originalLink.originalLink) //redirect
            req.originalLink = originalLink.originalLink
            req.expiration = originalLink.expiration
            req.SQLDBId = originalLink.SQLDBId
            next() //to cache middleware
        } else {
            return res.send("404 not found") //if not find link, send 404
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: "error fom server",
            EC: "-1",
            DT: "",
        })
    }
}

export default { redirect }
