import express from "express"
import { checkUserJWT } from "../middlewares/JWTAction"
import { delCache } from "../middlewares/cache.middleware"
import linkController from "../controllers/linkController"

const linkRouter = express.Router()

linkRouter.get("/", checkUserJWT, linkController.readLink)
linkRouter.post("/create", checkUserJWT, linkController.createLink)
linkRouter.post("/custom-create", checkUserJWT, linkController.createCustomLink)
linkRouter.put("/update/:id", checkUserJWT, linkController.updateLink, delCache)
linkRouter.delete(
    "/delete/:id",
    checkUserJWT,
    linkController.deleteLink,
    delCache
)

export default linkRouter
