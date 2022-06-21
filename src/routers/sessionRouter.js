import express from 'express'
import { MongoClient, ObjectId } from 'mongodb'
import createDebug  from 'debug'
const debug = createDebug ('app:sessionRouter')

const url = 'mongodb://bqsistemas:barrantes@127.0.0.1:27017'
const dbName = 'globomantics'

const sessionRouter = express.Router()

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
            
            res.render('session', {
                session
            })
        }catch(error){
            debug(error.stack)
        }
    }())
})

export default sessionRouter