const url = require('url')
const express = require('express')
const router = express.Router()
require('dotenv').config()
const needle = require('needle')
const link = 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'
const api_key = process.env.API_KEY

router.get('/get-summoner/:name', async(req, res) => {
  // res.set('Access-Control-Allow-Origin', '*')
  try {
    const summonerName = req.params.name
    // const params = new URLSearchParams({
    //   [api_key]: api_key,
    //   ...url.parse(req.url, true).query,
    // })
    const apiRes = await needle('get', `${link}${summonerName}?api_key=${api_key}`)
    const data = apiRes.body
    res.status(200).json(data)
    console.log(data)
  }
  catch (error) {
    res.status(500).json({ error })
    console.log(error)
  }

  // res.set('Access-Control-Allow-Header', 'Origin, Content-Type, Accept')

  // console.log(req.query)
  // const query = req.query
  // query.api_Key = api_Key
  // const queryString = qs.stringify(query)
  // console.log({ queryString })
  // axios(`${url}${queryString}`)
  //   .then(response => console.log(response))
})

module.exports = router
