import express from 'express'
import chalk from 'chalk'
import morgan from 'morgan'
import path from 'path'
import createDebug  from 'debug'
const debug = createDebug ('app')

const app = express()
app.use(morgan('tiny'))
app.use(express.static(path.join(path.resolve(), '/public/')))

app.get('/', (req, res) => {
    res.send('index empty page!')
})

app.listen(3000, () => {
    debug(`Server listening on port ${chalk.green(3000)} 🚀!`)
})