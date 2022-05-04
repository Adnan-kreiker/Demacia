require('dotenv').config()
import express, { Express } from 'express';

const cors = require('cors')
const app: Express = express()
const port = process.env.PORT || 5000

app.use(cors())

// Routes
app.use('/api', require('./routes'))

app.listen(port, () => {
})

module.exports = app