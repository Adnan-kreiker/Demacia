require('dotenv').config()
const express = require('express')
const app = express()
const port = 4008
const qs = require('qs')
const axios = require('axios')

const url = 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'
const api_Key = process.env.API_KEY
app.get('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  console.log(req.query)
  const query = req.query
  query.api_Key = api_Key
  const queryString = qs.stringify(query)
  console.log({ queryString })
  axios(`${url}${queryString}`)
    .then(response => console.log(response))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
