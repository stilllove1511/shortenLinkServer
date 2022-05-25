import stickyNoteService from '../services/stickyNoteService'

const testNote = (req, res) => {
    res.status(200).json({
        EM: 'sticky note test api ok',
        EC: 0,
        DT: ''
    })
}

const createNote = async (req, res) => {
    try {
        console.log(req.body)
        let data = await stickyNoteService.createNote(req.body)
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
        let data = await stickyNoteService.readNote()
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
        let data = await stickyNoteService.updateNote(req.body)
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
        let data = await stickyNoteService.deleteNote(req.body.id)
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