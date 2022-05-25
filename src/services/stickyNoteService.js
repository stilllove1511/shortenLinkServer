import db from '../models/index'

const createNote = async (data) => {
    try {
        let user = await db.Note.create({ ...data });
        if (user) return {
            EM: 'create note success',
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrong in service ...',
            EC: 0,
            DT: []
        }
    }
}

const readNote = async (userId) => {
    let notes = await db.Note.findAll({
        attributes: ["id", "title", "content"],
        where: {
            userId
        }
    })
    if (notes) {
        return {
            EM: 'get data succes',
            EC: 0,
            DT: notes
        }
    } else {
        return {
            EM: 'some thing wrong in service ...',
            EC: 1,
            DT: []
        }
    }
}

const updateNote = async (data) => {
    try {
        let note = await db.Note.findOne(
            {
                where: {
                    id: data.id
                }
            }
        )

        if (note.userId !== data.userId)
            return {
                EM: 'you do not have permission to perfrom this action',
                EC: -2,
                DT: []
            }

        await db.Note.update(
            {
                ...data
            },
            {
                where: { id: data.id }
            }
        )
        return {
            EM: 'update ok',
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'some thing wrong in service ...',
            EC: 1,
            DT: []
        }
    }
}

const deleteNote = async (ids) => {
    try {

        let note = await db.Note.findOne({
            where: { id: ids.id }
        })



        if (note) {

            if (note.userId !== ids.userId)
                return {
                    EM: 'you do not have permission to perfrom this action',
                    EC: -2,
                    DT: []
                }

            await note.destroy()
            return {
                EM: 'Deleted',
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: 'Note does not exist',
                EC: 2,
                DT: []
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'error from service',
            EC: 1,
            DT: []
        }
    }
}

export default { createNote, readNote, updateNote, deleteNote }