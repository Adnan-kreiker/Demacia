const url = require('url')
const express = require('express')
const router = express.Router()
const apicache = require('apicache')
require('dotenv').config()
const needle = require('needle')
const link = 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'
const api_key = process.env.API_KEY
const api_key_name = process.env.API_KEY_NAME
const matchesUrl = 'https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/'
const matchUrl = 'https://europe.api.riotgames.com/lol/match/v5/matches/'
const rankedUrl = 'https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/'
const challengerUrl = 'https://euw1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/'

// Init cache
const cache = apicache.middleware

// convert non english characters to english ones



router.get('/get-summoner/:name', cache('2 minutes'), async (req, res) => {
  try {
    const summonerName = req.params.name

    const apiRes = await needle('get', `${link}${summonerName}?api_key=${api_key}`)
    const data = apiRes.body
    res.status(200).json(data)
  }
  catch (error) {
    res.status(500).json({ error })
  }
})

router.get('/get-matches/:id', cache('2 minutes'), async (req, res) => {
  const params = new URLSearchParams({
    ...url.parse(req.url, true).query,
    [api_key_name]: api_key,
  })
  try {
    const id = req.params.id
    // console.log(`${matchesUrl}${id}/ids?${params}`)
    const result = await needle('get', `${matchesUrl}${id}/ids?${params}`)
    const data = result.body
    res.status(200).json(data)
    // console.log(data)
  }
  catch (error) {
    console.error(error)
  }
})

router.get('/get-match/:id', cache('2 minutes'), async (req, res) => {
  const params = new URLSearchParams({
    [api_key_name]: api_key,
  })
  try {
    const id = req.params.id
    // console.log(`${matchUrl}${id}${params}`)
    const result = await needle('get', `${matchUrl}${id}?${params}`)
    const data = result.body
    res.status(200).json(data)
    // console.log(data)
  }
  catch (error) {
    console.error(error)
  }
})

router.get('/get-ranked-info/:summonerId', cache('2 minutes'), async (req, res) => {
  const params = new URLSearchParams({
    [api_key_name]: api_key,
  })
  try {
    const { summonerId } = req.params
    // console.log(`${matchUrl}${id}${params}`)
    const result = await needle('get', `${rankedUrl}${summonerId}?${params}`)
    const data = result.body
    res.status(200).json(data)
    console.log(data)
  }
  catch (error) {
    console.error(error)
  }
})

router.get('/get-challenger-players/:queue', cache('2 minutes'), async (req, res) => {
  const params = new URLSearchParams({
    [api_key_name]: api_key,
  })
  try {
    const { queue } = req.params
    // console.log(`${matchUrl}${id}${params}`)
    const result = await needle('get', `${challengerUrl}${queue}?${params}`)
    const data = result.body
    res.status(200).json(data)
    console.log(data)
  }
  catch (error) {
    console.error(error)
  }
})

module.exports = router
