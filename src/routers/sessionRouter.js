import express from 'express'
import sessions from '../data/sessions.json' assert {type: 'json'};

const sessionRouter = express.Router()

sessionRouter.route('/').get((req,res) => {
    res.render('sessions', {
        sessions
    })
})
sessionRouter.route('/:id').get((req,res) => {
    const id = req.params.id
    res.render('session', {
        session: sessions.find(x => x.id.toString() === id)
    })
})

export default sessionRouter