import express from "express"
import { checkUserJWT } from "../middlewares/JWTAction"
import linkController from "../controllers/linkController"

const linkRouter = express.Router()

linkRouter.get("/", checkUserJWT, linkController.readLink)
linkRouter.get("/visit/:slug", linkController.visitLink)
linkRouter.post("/create", checkUserJWT, linkController.createLink)
linkRouter.post("/custom-create", checkUserJWT, linkController.createCustomLink)
linkRouter.put("/update/:alias", checkUserJWT, linkController.updateLink)
linkRouter.delete(
    "/delete/:slug",
    checkUserJWT,
    linkController.deleteLink,
)

export default linkRouter
