import express from "express";
import accountController from "../controllers/accountController";
import { checkUserJWT } from "../middlewares/JWTAction";

const accountRouter = express.Router();

accountRouter.put(
    "/update-pass",
    checkUserJWT,
    accountController.updatePassword
);
accountRouter.get("/user-infor", checkUserJWT, accountController.getUserInfor);

export default accountRouter;
