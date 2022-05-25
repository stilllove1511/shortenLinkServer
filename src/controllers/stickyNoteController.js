import stickyNoteService from '../services/stickyNoteService'
import { verifyToken } from '../middlewares/JWTAction'

const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1]
    }
    return null
}

const testNote = (req, res) => {
    res.status(200).json({
        EM: 'sticky note test api ok',
        EC: 0,
        DT: ''
    })
}

const createNote = async (req, res) => {

    try {
        let cookies = req.cookies
        let tokenFromHeader = extractToken(req)
        let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader
        let decoded = verifyToken(token)
        console.log(decoded)
        let userId = decoded.id
        let data = await stickyNoteService.createNote({ ...req.body, userId: userId })

        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC,//error code
            DT: data.DT//data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const readNote = async (req, res) => {
    try {
        let cookies = req.cookies
        let tokenFromHeader = extractToken(req)
        let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader
        let decoded = verifyToken(token)
        console.log(decoded)
        let userId = decoded.id
        let data = await stickyNoteService.readNote(userId)

        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC,//error code
            DT: data.DT//data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const updateNote = async (req, res) => {
    try {
        let cookies = req.cookies
        let tokenFromHeader = extractToken(req)
        let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader
        let decoded = verifyToken(token)
        console.log(decoded)
        let userId = decoded.id

        let data = await stickyNoteService.updateNote({ ...req.body, userId: userId })
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC,//error code
            DT: data.DT//data
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const deleteNote = async (req, res) => {
    try {
        let cookies = req.cookies
        let tokenFromHeader = extractToken(req)
        let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader
        let decoded = verifyToken(token)
        console.log(decoded)
        let userId = decoded.id
        let noteId = req.body.id

        let data = await stickyNoteService.deleteNote({ id: noteId, userId: userId })
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DR: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

export default { testNote, createNote, readNote, updateNote, deleteNote }