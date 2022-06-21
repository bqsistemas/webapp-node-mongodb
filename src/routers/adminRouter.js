import express from 'express'
import { MongoClient } from 'mongodb'
import createDebug  from 'debug'
const debug = createDebug ('app:adminRouter')
import sessions from '../data/sessions.json' assert {type: 'json'};

const url = 'mongodb://bqsistemas:barrantes@127.0.0.1:27017'
const dbName = 'globomantics'

const adminRouter = express.Router()

adminRouter.route('/').get((req,res) => {
    (async function mongo(){
        let client;
        try{
            client = await MongoClient.connect(url)
            debug('Connected to the mongo DB')

            const db = client.db(dbName)
            const response = await db.collection('sessions').insertMany(sessions)

            res.json(response)
        }catch(error){
            debug(error.stack)
        }
    }())
})

export default adminRouter