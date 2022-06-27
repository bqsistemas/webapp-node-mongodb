import express from 'express'
import { MongoClient, ObjectId } from 'mongodb'
import createDebug  from 'debug'
const debug = createDebug ('app:sessionRouter')
import speakersService from '../services/speakerService.js'

const url = 'mongodb://bqsistemas:barrantes@127.0.0.1:27017'
const dbName = 'globomantics'

const sessionRouter = express.Router()
sessionRouter.use((req, res, next) => {
    if(req.user){
        next();
    }else {
        res.redirect('/auth/signIn')
    }
})

sessionRouter.route('/').get((req,res) => {
    (async function mongo(){
        let client;
        try{
            client = await MongoClient.connect(url)
            debug('Connected to the mongo DB')

            const db = client.db(dbName)
            const sessions = await db.collection('sessions').find().toArray()

            res.render('sessions', {
                sessions
            })
        }catch(error){
            debug(error.stack)
        }finally{
            client.close()
        }
    }())
})
sessionRouter.route('/:id').get((req,res) => {
    (async function mongo(){
        const id = req.params.id
        let client;
        try{
            client = await MongoClient.connect(url)
            debug('Connected to the mongo DB')

            const db = client.db(dbName)

            const session = await db.collection('sessions').findOne({ _id: ObjectId(id) })
            
            const speaker = await speakersService.getSpeakerById(session.speakers[0].id)

            session.speaker = speaker.data
            res.render('session', {
                session
            })
        }catch(error){
            debug(error.stack)
        }finally{
            client.close()
        }
    }())
})

export default sessionRouter