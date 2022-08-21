import express from "express";
import logController from "../controllers/logController";

const logRouter = express.Router();

logRouter.post("/register", logController.handleRegister);
logRouter.post("/login", logController.handleLogin);

export default logRouter;
