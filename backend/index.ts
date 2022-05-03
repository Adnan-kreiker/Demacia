require('dotenv').config()
import express, { Express } from 'express';

const cors = require('cors')
const app: Express = express()
const port = process.env.PORT || 5000

app.use(cors())
// const qs = require('qs')
// const axios = require('axios')

// Routes

app.use('/api', require('./routes'))

app.listen(port, () => {
  // console.log(`Example app listening on port ${port}`)
})

module.exports = app