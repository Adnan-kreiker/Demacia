// const express = require('express')
import express, { Request, Response } from 'express';
// const app: Express = express();
import url from 'url';
require('dotenv').config()
import apicache from 'apicache';
const router = express.Router()
import needle from 'needle';
const api_key = process.env.API_KEY as string
const api_key_name = process.env.API_KEY_NAME as string
const championsUrl = `https://ddragon.leagueoflegends.com/cdn/${process.env.PATCH_VERSION}/data/en_US/champion.json`
const itemUrl = `https://ddragon.leagueoflegends.com/cdn/${process.env.PATCH_VERSION}/img/item/`

// Init cache
const cache = apicache.middleware


router.get('/get-summoner/:name', async (req: Request, res: Response) => {
  try {
    const summonerName = req.params.name
    const { region } = req.query
    const apiRes = await needle('get', `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${api_key}`)
    const data = apiRes.body
    res.status(200).json(data)
  }
  catch (error) {
    res.status(500).json({ error })
  }
})

router.get('/get-matches/:id', cache('2 minutes'), async (req: Request, res: Response) => {
  const params = new URLSearchParams({
    [api_key_name]: api_key,
  })
  const { region } = req.query
  const { count } = req.query
  const { start } = req.query
  const matchesUrl = `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/`
  try {
    const id = req.params.id
    const result = await needle('get', `${matchesUrl}${id}/ids?${params}&count=${count}&start=${start}`)
    const data = result.body
    res.status(200).json(data)
  }
  catch (error) {
    console.error(error)
  }
})

router.get('/get-match/:id', cache('2 minutes'), async (req: Request, res: Response) => {
  const params = new URLSearchParams({
    [api_key_name]: api_key,
  })

  const { region } = req.query
  const matchUrl = `https://${region}.api.riotgames.com/lol/match/v5/matches/`

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

router.get('/get-ranked-info/:summonerId', cache('2 minutes'), async (req: Request, res: Response) => {
  const params = new URLSearchParams({
    [api_key_name]: api_key,
  })
  try {
    const { summonerId } = req.params
    const { region } = req.query
    const rankedUrl = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/`
    const result = await needle('get', `${rankedUrl}${summonerId}?${params}`)
    const data = result.body
    res.status(200).json(data)
  }
  catch (error) {
    console.error(error)
  }
})

router.get('/get-leaderboards-players/:rank/:queue', cache('100 minutes'), async (req: Request, res: Response) => {
  const params = new URLSearchParams({
    [api_key_name]: api_key,
  })
  const { region } = req.query
  const leaderboardsUrl = `https://${region}.api.riotgames.com/lol/league/v4/`
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

router.get('/get-champions', cache('1000 minutes'), async (req: Request, res: Response) => {
  try {
    const result = await needle('get', `${championsUrl}`)
    const data = result.body
    res.status(200).json(data)
  }
  catch (error) {
    console.error(error)
  }
})

router.get('/get-champions-rotations', cache('1000 minutes'), async (req: Request, res: Response) => {
  const params = new URLSearchParams({
    [api_key_name]: api_key,
  })
  const championsRotationsUrl = `https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations`
  try {
    const result = await needle('get', `${championsRotationsUrl}?${params}`)
    const data = result.body
    res.status(200).json(data)
  }
  catch (error) {
    console.error(error)
  }
})

router.get('/get-item-img/:item', cache('1000 minutes'), async (req: Request, res: Response) => {
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

router.get('/get-champions-mastery/:summonerId', cache('100 minutes'), async (req: Request, res: Response) => {
  const params = new URLSearchParams({
    [api_key_name]: api_key,
  })
  const { summonerId } = req.params
  const { region } = req.query
  const championMasteryUrl = `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/`
  try {
    const result = await needle('get', `${championMasteryUrl}${summonerId}?${params}`)
    const data = result.body
    res.status(200).json(data)
  }
  catch (error) {
    console.error(error)
  }
})

router.get('/get-live-game/:summonerId', cache('1 minutes'), async (req: Request, res: Response) => {
  const params = new URLSearchParams({
    [api_key_name]: api_key,
  })
  const { summonerId } = req.params
  const { region } = req.query
  const liveGameUrl = `https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/`

  try {
    const result = await needle('get', `${liveGameUrl}${summonerId}?${params}`)
    const data = result.body
    res.status(200).json(data)
  }
  catch (error) {
    console.error(error)
  }
})



module.exports = router
