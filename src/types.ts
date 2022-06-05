import type { App, Ref } from 'vue'
import type { RouteRecordRaw, Router } from 'vue-router'
import type { HeadClient } from '@vueuse/head'

interface AppContext<HasRouter extends boolean = true> {
  app: App<Element>
  router: HasRouter extends true ? Router : undefined
  routes: HasRouter extends true ? RouteRecordRaw[] : undefined
  head: HeadClient | undefined
}

export type UserModule = (ctx: AppContext) => void

export type ChampionObject = Record<string, Champion>
export interface Champion {
  version: string
  id: string
  key: string
  name: string
  title: string
  blurb: string
  info: {
    attack: number
    defense: number
    magic: number
    difficulty: number
  }
  image: {
    full: string
    sprite: string
    group: string
    x: number
    y: number
    w: number
    h: number
  }
  tags: string[]
  partype: string
  stats: Record<string, number>
}

export interface Leveltip {
  label: string[]
  effect: string[]
}
export interface Datavalues {
}

export interface Skin {
  id: string
  num: number
  name: string
  chromas: boolean
}
export interface Image {
  full: string
  sprite: string
  group: string
  x: number
  y: number
  w: number
  h: number
}
export interface Spell {
  id: string
  name: string
  description: string
  tooltip: string
  leveltip: Leveltip
  maxrank: number
  cooldown: number[]
  cooldownBurn: string
  cost: number[]
  costBurn: string
  datavalues: Datavalues
  effect: Array<number[] | null>
  effectBurn: Array<null | string>
  vars: any[]
  costType: string
  maxammo: string
  range: number[]
  rangeBurn: string
  image: Image
  resource: string
}
export interface Info {
  attack: number
  defense: number
  magic: number
  difficulty: number
}
export interface ChampionInfo {
  id: string
  key: string
  name: string
  title: string
  image: {
    full: string
    sprite: string
    group: string
    x: number
    y: number
    w: number
    h: number
  }
  skins: Skin[]
  lore: string
  blurb: string
  allytips: string[]
  enemytips: string[]
  tags: string[]
  partype: string
  info: Info
  stats: Record<string, number>
  spells: Spell[]
  passive: {
    name: string
    description: string
    image: Image
  }
  recommended: any[]
}

export interface Passive {
  name: string
  description: string
  image: Image
}

export interface Summoner {
  id: string
  accountId: string
  puuid: string
  name: string
  profileIconId: number
  revisionDate: number
  summonerLevel: number
  status: {
    status_code: number
    message: string
  }
}

export interface Error {

  status: {
    message: string
    status_code: number
  }
}
export type SummonerRankedInfo = SummonerHasRankedInfo | [] | Error

// export type SummonerHasRankedInfo = [RankedData, RankedDataTFT, RankedData]

export type SummonerHasRankedInfo = (RankedData | RankedDataTFT)[]

export type SummonerRankedInfoInterface = { summonerId: string; rankedInfo: SummonerRankedInfo }[]
export interface RankedDataTFT {
  freshBlood: boolean
  hotStreak: boolean
  inactive: boolean
  leaguePoints: number
  losses: number
  queueType: 'RANKED_TFT_PAIRS'
  summonerId: string
  summonerName: string
  veteran: false
  wins: number
}
export interface RankedData {
  leagueId: string
  queueType: 'RANKED_SOLO_5x5' | 'RANKED_FLEX_SR'
  tier: string
  rank: string
  summonerId: string
  summonerName: string
  leaguePoints: number
  wins: number
  losses: number
  veteran: boolean
  inactive: boolean
  freshBlood: boolean
  hotStreak: boolean
}

export interface FreeChampionRotations {
  freeChampionIds: number[]
  freeChampionIdsForNewPlayers: number[]
  maxNewPlayerLevel: number
}

export type QueueTypes = 'RANKED_SOLO_5x5' | 'RANKED_FLEX_SR' | 'RANKED_TFT_PAIRS'

export type Ranks = 'challengerleagues' | 'grandmasterleagues' | 'masterleagues'

export type Tier = 'CHALLENGER' | 'GRANDMASTER' | 'MASTER' | 'DIAMOND' | 'PLATINUM' | 'GOLD' | 'SILVER' | 'BRONZE' | 'IRON'

export interface ChallengerPlayers {
  tier: string
  leagueId: string
  queue: string
  name: string
  entries: ChallengerPlayer[]
}

export interface ChallengerPlayer {
  summonerId: string
  summonerName: string
  leaguePoints: number
  rank: string
  wins: number
  losses: number
  veteran: boolean
  inactive: boolean
  freshBlood: boolean
  hotStreak: boolean
}

export interface ChallengerPlayerWithIndex {
  summonerId: string
  summonerName: string
  leaguePoints: number
  rank: string
  wins: number
  losses: number
  veteran: boolean
  inactive: boolean
  freshBlood: boolean
  hotStreak: boolean
  idx: number
}
export interface ChallengerPlayerWithAdditionalData {
  summonerId: string
  summonerName: string
  leaguePoints: number
  rank: string
  wins: number
  losses: number
  veteran: boolean
  inactive: boolean
  freshBlood: boolean
  hotStreak: boolean
  id: string
  accountId: string
  puuid: string
  name: string
  profileIconId: number
  revisionDate: number
  summonerLevel: number
  idx: number
}

export type ErrorStatusCode = '500' | 'error' | 'info' | 'success' | 'warning' | '404' | '403' | '418' | undefined

export interface ChampionMastery {
  championId: number
  championLevel: number
  championPoints: number
  lastPlayTime: number
  championPointsSinceLastLevel: number
  championPointsUntilNextLevel: number
  chestGranted: boolean
  tokensEarned: number
  summonerId: string
}

export interface LiveGame {
  gameId: number
  mapId: number
  gameMode: string
  gameType: string
  gameQueueConfigId: number
  participants: ParticipantLiveGame[]
  observers: Observers
  platformId: string
  bannedChampions: BannedChampion[]
  gameStartTime: number
  gameLength: number
  status?: {
    status_code: number
    message: string
  }
}

export interface BannedChampion {
  championId: number
  teamId: number
  pickTurn: number
}

export interface Observers {
  encryptionKey: string
}

export interface ParticipantLiveGame {
  teamId: number
  spell1Id: number
  spell2Id: number
  championId: number
  profileIconId: number
  summonerName: string
  bot: boolean
  summonerId: string
  gameCustomizationObjects: any[]
  perks: PerksLiveGame
}

export interface PerksLiveGame {
  perkIds: number[]
  perkStyle: number
  perkSubStyle: number
}

export interface TeamType {
  id: number
  val: 100 | 200
}

export interface MatchInfo {
  metadata: Metadata
  info: MatchInformation
  show: boolean
}

export interface MatchInformation {
  gameCreation: number
  gameDuration: number
  gameEndTimestamp: number
  gameId: number
  gameMode: string
  gameName: string
  gameStartTimestamp: number
  gameType: string
  gameVersion: string
  mapId: number
  participants: Participant[]
  platformId: string
  queueId: number
  teams: Team[]
  tournamentCode: string
}

export interface Participant {
  assists: number
  baronKills: number
  bountyLevel: number
  challenges: Record<string, number>
  champExperience: number
  champLevel: number
  championId: number
  championName: string
  championTransform: number
  consumablesPurchased: number
  damageDealtToBuildings: number
  damageDealtToObjectives: number
  damageDealtToTurrets: number
  damageSelfMitigated: number
  deaths: number
  detectorWardsPlaced: number
  doubleKills: number
  dragonKills: number
  eligibleForProgression: boolean
  firstBloodAssist: boolean
  firstBloodKill: boolean
  firstTowerAssist: boolean
  firstTowerKill: boolean
  gameEndedInEarlySurrender: boolean
  gameEndedInSurrender: boolean
  goldEarned: number
  goldSpent: number
  individualPosition: string
  inhibitorKills: number
  inhibitorTakedowns: number
  inhibitorsLost: number
  item0: number
  item1: number
  item2: number
  item3: number
  item4: number
  item5: number
  item6: number
  itemsPurchased: number
  killingSprees: number
  kills: number
  lane: string
  largestCriticalStrike: number
  largestKillingSpree: number
  largestMultiKill: number
  longestTimeSpentLiving: number
  magicDamageDealt: number
  magicDamageDealtToChampions: number
  magicDamageTaken: number
  neutralMinionsKilled: number
  nexusKills: number
  nexusLost: number
  nexusTakedowns: number
  objectivesStolen: number
  objectivesStolenAssists: number
  participantId: number
  pentaKills: number
  perks: Perks
  physicalDamageDealt: number
  physicalDamageDealtToChampions: number
  physicalDamageTaken: number
  profileIcon: number
  puuid: string
  quadraKills: number
  riotIdName: string
  riotIdTagline: string
  role: string
  sightWardsBoughtInGame: number
  spell1Casts: number
  spell2Casts: number
  spell3Casts: number
  spell4Casts: number
  summoner1Casts: number
  summoner1Id: number
  summoner2Casts: number
  summoner2Id: number
  summonerId: string
  summonerLevel: number
  summonerName: string
  teamEarlySurrendered: boolean
  teamId: number
  teamPosition: string
  timeCCingOthers: number
  timePlayed: number
  totalDamageDealt: number
  totalDamageDealtToChampions: number
  totalDamageShieldedOnTeammates: number
  totalDamageTaken: number
  totalHeal: number
  totalHealsOnTeammates: number
  totalMinionsKilled: number
  totalTimeCCDealt: number
  totalTimeSpentDead: number
  totalUnitsHealed: number
  tripleKills: number
  trueDamageDealt: number
  trueDamageDealtToChampions: number
  trueDamageTaken: number
  turretKills: number
  turretTakedowns: number
  turretsLost: number
  unrealKills: number
  visionScore: number
  visionWardsBoughtInGame: number
  wardsKilled: number
  wardsPlaced: number
  win: boolean
}

export interface Perks {
  statPerks: StatPerks
  styles: Style[]
}

export interface StatPerks {
  defense: number
  flex: number
  offense: number
}

export interface Style {
  description: Description
  selections: Selection[]
  style: number
}

export enum Description {
  PrimaryStyle = 'primaryStyle',
  SubStyle = 'subStyle',
}

export interface Selection {
  perk: number
  var1: number
  var2: number
  var3: number
}

export interface Team {
  bans: Ban[]
  objectives: Objectives
  teamId: number
  win: boolean
}

export interface Ban {
  championId: number
  pickTurn: number
}

export interface Objectives {
  baron: Baron
  champion: Baron
  dragon: Baron
  inhibitor: Baron
  riftHerald: Baron
  tower: Baron
}

export interface Baron {
  first: boolean
  kills: number
}

export interface Metadata {
  dataVersion: string
  matchId: string
  participants: string[]
}

export type MaybeRef<T> = Ref<T> | T

// type MessageOf<T extends {message:unknown}> = T['message']

// type MessageOf<T> = T extends { message: unknown } ? T['message'] : never;
// does T have a property called message?
// if so, return the type of that property
// if not, return never

// interface Email {
//   message: string;
// }

// type ha = MessageOf<Email>

// type regularFlatten<T> = T extends any[] ? T[number] : T;
// // if T is an array, return the type of the array's elements
// // if T is not an array, return T

// type Flatten<T> = T extends Array<infer Type> ? Type : T;
// explain the type above
// if T is an array, return the type of the array
// if T is not an array, return T
// export function exp ({ name, age, height }: { name: any, age: any, height: any }) {
//   return {
//     name,
//     age,
//     height
//   }
// }

export interface ServerStatusData {
  id: string
  name: string
  locales: string[]
  maintenances: Maintenance[] | []
  incidents: Maintenance[] | []
}

export interface Maintenance {
  maintenance_status: 'scheduled' | 'in_progress' | 'complete'
  titles: Title[]
  platforms: ['windows', 'macos', 'android', 'ios', 'ps4', 'xbone', 'switch']
  updates: Update[]
  archive_at: null | string
  incident_severity: 'info' | 'warning' | 'critical' | null
  updated_at: null | string
  id: number
  created_at: string | null
}

export interface Title {
  locale: string
  content: string
}

export interface Update {
  publish: boolean
  publish_locations: string[]
  translations: Title[]
  id: number
  author: string
  created_at: string
  updated_at: string
}

export interface FeaturedGames {
  gameList: GameList[]
  clientRefreshInterval: number
}

export interface GameList {
  gameId: number
  mapId: number
  gameMode: string
  gameType: string
  gameQueueConfigId: number
  participants: ParticipantFeaturedGames[]
  observers: ObserversFeaturedGames
  platformId: string
  bannedChampions: BannedChampionFeaturedGames[]
  gameStartTime: number
  gameLength: number
}

export interface BannedChampionFeaturedGames {
  championId: number
  teamId: number
  pickTurn: number
}

export interface ObserversFeaturedGames {
  encryptionKey: string
}

export interface ParticipantFeaturedGames {
  teamId: number
  spell1Id: number
  spell2Id: number
  championId: number
  profileIconId: number
  summonerName: string
  bot: boolean
}

export interface FilterOption {
  id: number
  name: string
}

export type Servers = ['EUW', 'NA', 'KR', 'EUNE', 'JP', 'BR', 'LAN', 'LAS']

export type Region = 'EUW' | 'EUNE' | 'NA' | 'LAN' | 'LAS' | 'BR' | 'TR' | 'RU' | 'OCE' | 'JP' | 'KR'

export type RegionParam = 'euw1' | 'eune1' | 'na1' | 'la1' | 'la2' | 'br1' | 'tr1' | 'ru' | 'oc1' | 'jp1' | 'kr1'
