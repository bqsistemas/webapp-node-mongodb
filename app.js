import express from 'express'
import chalk from 'chalk'
import morgan from 'morgan'
import path from 'path'
import sessionRouter from './src/routers/sessionRouter.js'
import adminRouter from './src/routers/adminRouter.js'
import createDebug  from 'debug'
const debug = createDebug ('app')

const PORT = process.env.PORT || 3000
const app = express()


app.use(morgan('tiny'))
app.use(express.static(path.join(path.resolve(), '/public/')))

app.set('views', './src/views')
app.set('view engine', 'ejs')

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