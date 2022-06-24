import express from 'express'
import { MongoClient } from 'mongodb'
import createDebug  from 'debug'
const debug = createDebug ('app:authRouter')

const url = 'mongodb://bqsistemas:barrantes@127.0.0.1:27017'
const dbName = 'globomantics'

const authRouter = express.Router()

authRouter.route('/signUp').post((req,res) => {
    res.json(req.body)

    (async function mongo(){
        let client;
        try{

            client = await MongoClient.connect(url)
            debug('Connected to the mongo DB')

            const db = client.db(dbName)

            res.json(response)
        }catch(error){
            debug(error.stack)
        }
    }())
})

export default authRouter