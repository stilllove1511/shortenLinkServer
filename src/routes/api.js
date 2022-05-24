import express from "express";

import { testNote, createNote, getNote, updateNote, deleteNote } from '../controllers/stickyNoteController'

const router = express.Router()

const initAppRoutes = (app) => {
    router.get('/test', testNote)
    router.post('/note/create', createNote)
    router.put('/note/update', updateNote)
    router.delete('/note/delete', deleteNote)

    return app.use('/api/v1/', router)
}

export default initAppRoutes

