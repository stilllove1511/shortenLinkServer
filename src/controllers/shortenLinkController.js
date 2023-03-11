import shortenLinkService from "../services/shortenLinkService"

const redirect = async (req, res, next) => {
    try {
        let alias = req.params.slug
        let originalLink = await shortenLinkService.findOriginalLink(alias) //find link
        if (originalLink) {
            // res.redirect(originalLink.originalLink) //redirect
            res.send(`
            
                <h1>Click link to redirect</h1>
                <a href="${originalLink.originalLink}">${originalLink.originalLink}</a>
            `)
        } else {
            return res.send("404 not found") //if not find link, send 404
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: "error fom server",
            EC: "-1",
        })
    }
}

export default { redirect }
