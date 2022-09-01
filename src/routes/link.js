import express from "express"
import { checkUserJWT } from "../middlewares/JWTAction"
import linkController from "../controllers/linkController"

const linkRouter = express.Router()

linkRouter.get("/read", checkUserJWT, linkController.readLink)
linkRouter.get("/readAll", linkController.readAllLink)
linkRouter.post("/create", checkUserJWT, linkController.createLink)
linkRouter.put("/update", checkUserJWT, linkController.updateLink)
linkRouter.delete("/delete", checkUserJWT, linkController.deleteLink)

export default linkRouter
