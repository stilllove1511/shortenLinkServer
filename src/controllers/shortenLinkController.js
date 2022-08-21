import shortenLinkService from "../services/shortenLinkService";
import { header } from "express/lib/response";

const redirect = async (req, res) => {
    try {
        let originLink = await shortenLinkService.findOriginLink(
            req.params.slug
        );
        if (originLink) {
            console.log(originLink);
            res.redirect(originLink);
        } else {
            res.send("404 not found");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error fom server",
            EC: "-1",
            DT: "",
        });
    }
};

export default { redirect };
