import express from "express";

import logController from "../controllers/logController";
import stickyLinkController from '../controllers/stickyLinkController'
import { checkUserJWT } from "../middlewares/JWTAction";

const router = express.Router()

const initAppRoutes = (app) => {
    router.all('*', checkUserJWT)

    router.post('/register', logController.handleRegister)
    router.post('/login', logController.handleLogin)

    router.get('/link/read', stickyLinkController.readLink)
    router.post('/link/create', stickyLinkController.createLink)
    router.put('/link/update', stickyLinkController.updateLink)
    router.delete('/link/delete', stickyLinkController.deleteLink)

    return app.use('/api/v1/', router)
}

export default initAppRoutes

