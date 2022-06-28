import express from 'express'
import chalk from 'chalk'
import path from 'path'
import favicon from 'serve-favicon'
import bodyParser from 'body-parser'
import createDebug  from 'debug'
const debug = createDebug('app')

// routes
import clothing from './server/routes/clothing.js'
import errors from './server/routes/errors.js'

const PORT = process.env.PORT || 3000
const app = express()
debug(path.resolve('dist/favicon.ico'))
// middleware
app.use(favicon(path.resolve('dist/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve('dist')));

app.use('/api/clothing', clothing);
app.use('/api/errors', errors);
app.get('*', function(req, res) {
  res.sendFile(path.resolve('dist/index.html'));
});

app.listen(PORT, () => {
    debug(`Server listening to port ${chalk.green(PORT)} 🚀!`)
})