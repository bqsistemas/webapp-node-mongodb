import express from 'express'
import chalk from 'chalk'
import morgan from 'morgan'
import path from 'path'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import session from 'express-session'

import sessionRouter from './src/routers/sessionRouter.js'
import adminRouter from './src/routers/adminRouter.js'
import authRouter from './src/routers/authRouter.js'
import createDebug  from 'debug'
const debug = createDebug ('app')

const PORT = process.env.PORT || 3000
const app = express()


app.use(morgan('tiny'))
app.use(express.static(path.join(path.resolve(), '/public/')))
app.use(express.json()) // analizador de cuerpo json
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(session({secret: 'globomantics'}))

require('./src/config/passport.js')(app)

// -----------------------------------------------------
app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use('/auth', authRouter)
app.use('/sessions', sessionRouter)
app.use('/admin', adminRouter)

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Welcome to Globomantics',
        data: [
            'a', 'b', 'c'
        ]
    })
})

app.listen(PORT, () => {
    debug(`Server listening to port ${chalk.green(PORT)} 🚀!`)
})