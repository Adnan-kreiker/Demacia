"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express')
const express_1 = __importDefault(require("express"));
require('dotenv').config();
const apicache_1 = __importDefault(require("apicache"));
const router = express_1.default.Router();
const needle_1 = __importDefault(require("needle"));
const api_key = process.env.API_KEY;
const api_key_name = process.env.API_KEY_NAME;
const championsUrl = `https://ddragon.leagueoflegends.com/cdn/${process.env.PATCH_VERSION}/data/en_US/champion.json`;
const itemUrl = `https://ddragon.leagueoflegends.com/cdn/${process.env.PATCH_VERSION}/img/item/`;
// Init cache
const cache = apicache_1.default.middleware;
router.get('/get-summoner/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summonerName = req.params.name;
        const { region } = req.query;
        const apiRes = yield (0, needle_1.default)('get', `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${api_key}`);
        const data = apiRes.body;
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
router.get('/get-matches/:id', cache('2 minutes'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = new URLSearchParams({
        [api_key_name]: api_key,
    });
    const { region } = req.query;
    const { count } = req.query;
    const { start } = req.query;
    const matchesUrl = `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/`;
    try {
        const id = req.params.id;
        const result = yield (0, needle_1.default)('get', `${matchesUrl}${id}/ids?${params}&count=${count}&start=${start}`);
        const data = result.body;
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
    }
}));
router.get('/get-match/:id', cache('2 minutes'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = new URLSearchParams({
        [api_key_name]: api_key,
    });
    const { region } = req.query;
    const matchUrl = `https://${region}.api.riotgames.com/lol/match/v5/matches/`;
    try {
        const id = req.params.id;
        const result = yield (0, needle_1.default)('get', `${matchUrl}${id}?${params}`);
        const data = result.body;
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
    }
}));
router.get('/get-ranked-info/:summonerId', cache('2 minutes'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = new URLSearchParams({
        [api_key_name]: api_key,
    });
    try {
        const { summonerId } = req.params;
        const { region } = req.query;
        const rankedUrl = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/`;
        const result = yield (0, needle_1.default)('get', `${rankedUrl}${summonerId}?${params}`);
        const data = result.body;
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
    }
}));
router.get('/get-leaderboards-players/:rank/:queue', cache('100 minutes'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = new URLSearchParams({
        [api_key_name]: api_key,
    });
    const { region } = req.query;
    const leaderboardsUrl = `https://${region}.api.riotgames.com/lol/league/v4/`;
    try {
        const { queue } = req.params;
        const { rank } = req.params;
        const result = yield (0, needle_1.default)('get', `${leaderboardsUrl}${rank}/by-queue/${queue}?${params}`);
        const data = result.body;
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
    }
}));
router.get('/get-champions', cache('1000 minutes'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, needle_1.default)('get', `${championsUrl}`);
        const data = result.body;
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
    }
}));
router.get('/get-champions-rotations', cache('1000 minutes'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = new URLSearchParams({
        [api_key_name]: api_key,
    });
    const championsRotationsUrl = `https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations`;
    try {
        const result = yield (0, needle_1.default)('get', `${championsRotationsUrl}?${params}`);
        const data = result.body;
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
    }
}));
router.get('/get-item-img/:item', cache('1000 minutes'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { item } = req.params;
    try {
        const result = yield (0, needle_1.default)('get', `${itemUrl}/${item}.png`);
        const data = result.body;
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
    }
}));
router.get('/get-champions-mastery/:summonerId', cache('100 minutes'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = new URLSearchParams({
        [api_key_name]: api_key,
    });
    const { summonerId } = req.params;
    const { region } = req.query;
    const championMasteryUrl = `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/`;
    try {
        const result = yield (0, needle_1.default)('get', `${championMasteryUrl}${summonerId}?${params}`);
        const data = result.body;
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
    }
}));
router.get('/get-live-game/:summonerId', cache('1 minutes'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = new URLSearchParams({
        [api_key_name]: api_key,
    });
    const { summonerId } = req.params;
    const { region } = req.query;
    const liveGameUrl = `https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/`;
    try {
        const result = yield (0, needle_1.default)('get', `${liveGameUrl}${summonerId}?${params}`);
        const data = result.body;
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
    }
}));
module.exports = router;
