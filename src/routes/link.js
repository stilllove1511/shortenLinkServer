import express from "express"
import { checkUserJWT } from "../middlewares/JWTAction"
import linkController from "../controllers/linkController"

const linkRouter = express.Router()

linkRouter.get(
    "/get_link_by_alias/:alias",
    checkUserJWT,
    linkController.getLinkByAlias
)
linkRouter.get("/get_user_link", checkUserJWT, linkController.readLink)
linkRouter.post("/create", checkUserJWT, linkController.createLink)
linkRouter.post("/custom_create", checkUserJWT, linkController.createCustomLink)
linkRouter.put("/update/:alias", checkUserJWT, linkController.updateLink)
linkRouter.delete("/delete/:alias", checkUserJWT, linkController.deleteLink)

export default linkRouter
