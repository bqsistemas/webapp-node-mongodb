import passport from 'passport'
import { Strategy } from 'passport-local'
import { MongoClient, ObjectId } from 'mongodb'
import createDebug  from 'debug'
const debug = createDebug ('app:localStrategy')

const url = 'mongodb://bqsistemas:barrantes@127.0.0.1:27017'
const dbName = 'globomantics'

const localStrategy = () => {
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        (async function validateUser(){
            let client;
            try{
    
                client = await MongoClient.connect(url)
                debug('Connected to the mongo DB')
    
                const db = client.db(dbName)
                const user = await db.collection('users').findOne({username})

                if(user && user.password === password)
                    done(null, user)
                else
                    done(null, false)
            }catch(error){
                done(error, false)
            }finally{
                client.close()
            }
        }())
    }))
}

export default localStrategy