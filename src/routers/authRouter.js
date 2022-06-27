import express from 'express'
import { MongoClient, ObjectId } from 'mongodb'
import createDebug  from 'debug'
const debug = createDebug ('app:authRouter')

const url = 'mongodb://bqsistemas:barrantes@127.0.0.1:27017'
const dbName = 'globomantics'

const authRouter = express.Router()

authRouter.route('/signUp').post((req,res) => {
    (async function addUser(){
        let client;
        try{

            client = await MongoClient.connect(url)
            debug('Connected to the mongo DB')

            const db = client.db(dbName)
            // await db.dropCollection('users')
            const user = { username: req.body.username, password: req.body.password }
            const userAdded = await db
            .collection('users')
            .insertOne(user)

            user._id = userAdded.insertedId
            debug(user)

            req.login(user, () => {
                res.redirect('/auth/profile')
            })
        }catch(error){
            debug(error.stack)
        }finally{
            client.close()
        }
    }())
})

authRouter.route('/profile').get((req, res) => {
    res.json(req.user);
})

export default authRouter