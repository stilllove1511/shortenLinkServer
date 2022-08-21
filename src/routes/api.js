import express from "express";

import logController from "../controllers/logController";
import linkController from '../controllers/linkController'
import { checkUserJWT } from "../middlewares/JWTAction";

const router = express.Router()

const initAppRoutes = (app) => {
    router.all('*', checkUserJWT)

    router.post('/register', logController.handleRegister)
    router.post('/login', logController.handleLogin)

    router.get('/link/read', linkController.readLink)
    router.post('/link/create', linkController.createLink)
    router.put('/link/update', linkController.updateLink)
    router.delete('/link/delete', linkController.deleteLink)

    return app.use('/api/v1/', router)
}

export default initAppRoutes

