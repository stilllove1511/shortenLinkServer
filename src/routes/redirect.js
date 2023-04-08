import express from "express"
import shortenLinkController from '../controllers/shortenLinkController'

const redirect = express.Router()
redirect.get("/:slug",shortenLinkController.redirect)
export default redirect

