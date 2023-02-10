import express from "express";
import { header } from "express/lib/response";
import shortenLinkController from "../controllers/shortenLinkController";
import { checkCacheLink, cacheLink } from "../middlewares/cache.middleware";

const shortenLinkRouter = express.Router();

shortenLinkRouter.get(
    "/:slug",
    checkCacheLink,
    shortenLinkController.redirect,
    cacheLink
);

export default shortenLinkRouter;
