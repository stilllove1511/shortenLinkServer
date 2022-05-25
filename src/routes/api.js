import express from "express";

import logController from "../controllers/logController";
import stickyNoteController from '../controllers/stickyNoteController'
import { checkUserJWT } from "../middlewares/JWTAction";

const router = express.Router()

const initAppRoutes = (app) => {
    // router.all('*', checkUserJWT)

    router.post('/register', logController.handleRegister)
    router.post('/login', logController.handleLogin)

    router.get('/note/read', stickyNoteController.readNote)
    router.post('/note/create', stickyNoteController.createNote)
    router.put('/note/update', stickyNoteController.updateNote)
    router.delete('/note/delete', stickyNoteController.deleteNote)

    return app.use('/api/v1/', router)
}

export default initAppRoutes

