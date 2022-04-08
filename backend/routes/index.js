const express = require('express')
const url = require('url')
require('dotenv').config()
const apicache = require('apicache')
const router = express.Router()
const needle = require('needle')
const link = 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'
const api_key = process.env.API_KEY
const api_key_name = process.env.API_KEY_NAME
const matchesUrl = 'https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/'
const matchUrl = 'https://europe.api.riotgames.com/lol/match/v5/matches/'
const rankedUrl = 'https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/'
const leaderboardsUrl = 'https://euw1.api.riotgames.com/lol/league/v4/'
const championsUrl = 'https://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json'
const championsRotationsUrl = 'https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations'
const itemUrl = 'https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/'
const championMasteryUrl = 'https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/'
// Init cache
const cache = apicache.middleware


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
    const result = await needle('get', `${matchesUrl}${id}/ids?${params}`)
    const data = result.body
    res.status(200).json(data)
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
    const result = await needle('get', `${matchUrl}${id}?${params}`)
    const data = result.body
    res.status(200).json(data)
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
    const result = await needle('get', `${rankedUrl}${summonerId}?${params}`)
    const data = result.body
    res.status(200).json(data)
  }
  catch (error) {
    console.error(error)
  }
})

router.get('/get-leaderboards-players/:rank/:queue', cache('200 minutes'), async (req, res) => {
  const params = new URLSearchParams({
    [api_key_name]: api_key,
  })
  try {
    const { queue } = req.params
    const { rank } = req.params
    const result = await needle('get', `${leaderboardsUrl}${rank}/by-queue/${queue}?${params}`)
    const data = result.body
    res.status(200).json(data)
  }
  catch (error) {
    console.error(error)
  }
})

router.get('/get-champions', cache('1000 minutes'), async (req, res) => {
  try {
    const result = await needle('get', `${championsUrl}`)
    const data = result.body
    res.status(200).json(data)
  }
  catch (error) {
    console.error(error)
  }
})

router.get('/get-champions-rotations', cache('1000 minutes'), async (req, res) => {
  const params = new URLSearchParams({
    [api_key_name]: api_key,
  })
  try {
    const result = await needle('get', `${championsRotationsUrl}?${params}`)
    const data = result.body
    res.status(200).json(data)
  }
  catch (error) {
    console.error(error)
  }
})

router.get('/get-item-img/:item', cache('1000 minutes'), async (req, res) => {
  const { item } = req.params
  try {
    const result = await needle('get', `${itemUrl}/${item}.png`)
    const data = result.body
    res.status(200).json(data)
  }
  catch (error) {
    console.error(error)
  }
})

router.get('/get-champions-mastery/:summonerId', cache('100 minutes'), async (req, res) => {
  const params = new URLSearchParams({
    [api_key_name]: api_key,
  })
  const { summonerId } = req.params
  try {
    const result = await needle('get', `${championMasteryUrl}${summonerId}?${params}`)
    const data = result.body
    res.status(200).json(data)
  }
  catch (error) {
    console.error(error)
  }
})



module.exports = router
