import express from "express";
import { header } from "express/lib/response";
import shortenLinkController from "../controllers/shortenLinkController";

const shortenLinkRouter = express.Router();

shortenLinkRouter.get("/:slug", shortenLinkController.redirect);

export default shortenLinkRouter;
