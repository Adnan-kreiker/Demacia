import type { Champion, Tier } from './../src/types'

export function idToRunes(id: number) {
  switch (id) {
    case 8112:
      return 'perk-images/Styles/Domination/Electrocute/Electrocute.png'
    case 8124:
      return 'perk-images/Styles/Domination/Predator/Predator.png'
    case 8128:
      return 'perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png'
    case 9923:
      return 'perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png'
    case 8126:
      return 'perk-images/Styles/Domination/CheapShot/CheapShot.png'
    case 8139:
      return 'perk-images/Styles/Domination/TasteOfBlood/GreenTerror_TasteOfBlood.png'
    case 8143:
      return 'perk-images/Styles/Domination/SuddenImpact/SuddenImpact.png'
    case 8136:
      return 'perk-images/Styles/Domination/ZombieWard/ZombieWard.png'
    case 8120:
      return 'perk-images/Styles/Domination/GhostPoro/GhostPoro.png'
    case 8138:
      return 'perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png'
    case 8135:
      return 'perk-images/Styles/Domination/RavenousHunter/RavenousHunter.png'
    case 8134:
      return 'perk-images/Styles/Domination/IngeniousHunter/IngeniousHunter.png'
    case 8105:
      return 'perk-images/Styles/Domination/RelentlessHunter/RelentlessHunter.png'
    case 8106:
      return 'perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png'
    case 8351:
      return 'perk-images/Styles/Inspiration/GlacialAugment/GlacialAugment.png'
    case 8360:
      return 'perk-images/Styles/Inspiration/UnsealedSpellbook/UnsealedSpellbook.png'
    case 8369:
      return 'perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png'
    case 8306:
      return 'perk-images/Styles/Inspiration/HextechFlashtraption/HextechFlashtraption.png'
    case 8304:
      return 'perk-images/Styles/Inspiration/MagicalFootwear/MagicalFootwear.png'
    case 8313:
      return 'perk-images/Styles/Inspiration/PerfectTiming/PerfectTiming.png'
    case 8321:
      return 'perk-images/Styles/Inspiration/FuturesMarket/FuturesMarket.png'
    case 8316:
      return 'perk-images/Styles/Inspiration/MinionDematerializer/MinionDematerializer.png'
    case 8345:
      return 'perk-images/Styles/Inspiration/BiscuitDelivery/BiscuitDelivery.png'
    case 8347:
      return 'perk-images/Styles/Inspiration/CosmicInsight/CosmicInsight.png'
    case 8410:
      return 'perk-images/Styles/Resolve/ApproachVelocity/ApproachVelocity.png'
    case 8352:
      return 'perk-images/Styles/Inspiration/TimeWarpTonic/TimeWarpTonic.png'
    case 8005:
      return 'perk-images/Styles/Precision/PressTheAttack/PressTheAttack.png'
    case 8008:
      return 'perk-images/Styles/Precision/LethalTempo/LethalTempoTemp.png'
    case 8021:
      return 'perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png'
    case 8010:
      return 'perk-images/Styles/Precision/Conqueror/Conqueror.png'
    case 9101:
      return 'perk-images/Styles/Precision/Overheal.png'
    case 9111:
      return 'perk-images/Styles/Precision/Triumph.png'
    case 8009:
      return 'perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png'
    case 9104:
      return 'perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png'
    case 9105:
      return 'perk-images/Styles/Precision/LegendTenacity/LegendTenacity.png'
    case 9103:
      return 'perk-images/Styles/Precision/LegendBloodline/LegendBloodline.png'
    case 8014:
      return 'perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png'
    case 8017:
      return 'perk-images/Styles/Precision/CutDown/CutDown.png'
    case 8299:
      return 'perk-images/Styles/Sorcery/LastStand/LastStand.png'
    case 8437:
      return 'perk-images/Styles/Resolve/GraspOfTheUndying/GraspOfTheUndying.png'
    case 8439:
      return 'perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png'
    case 8465:
      return 'perk-images/Styles/Resolve/Guardian/Guardian.png'
    case 8446:
      return 'perk-images/Styles/Resolve/Demolish/Demolish.png'
    case 8463:
      return 'perk-images/Styles/Resolve/FontOfLife/FontOfLife.png'
    case 8401:
      return 'perk-images/Styles/Resolve/MirrorShell/MirrorShell.png'
    case 8429:
      return 'perk-images/Styles/Resolve/Conditioning/Conditioning.png'
    case 8444:
      return 'perk-images/Styles/Resolve/SecondWind/SecondWind.png'
    case 8473:
      return 'perk-images/Styles/Resolve/BonePlating/BonePlating.png'
    case 8451:
      return 'perk-images/Styles/Resolve/Overgrowth/Overgrowth.png'
    case 8453:
      return 'perk-images/Styles/Resolve/Revitalize/Revitalize.png'
    case 8242:
      return 'perk-images/Styles/Sorcery/Unflinching/Unflinching.png'
    case 8214:
      return 'perk-images/Styles/Sorcery/SummonAery/SummonAery.png'
    case 8229:
      return 'perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png'
    case 8230:
      return 'perk-images/Styles/Sorcery/PhaseRush/PhaseRush.png'
    case 8224:
      return 'perk-images/Styles/Sorcery/NullifyingOrb/Pokeshield.png'
    case 8226:
      return 'perk-images/Styles/Sorcery/ManaflowBand/ManaflowBand.png'
    case 8275:
      return 'perk-images/Styles/Sorcery/NimbusCloak/6361.png'
    case 8210:
      return 'perk-images/Styles/Sorcery/Transcendence/Transcendence.png'
    case 8234:
      return 'perk-images/Styles/Sorcery/Celerity/Celerity.png'
    case 8233:
      return 'perk-images/Styles/Sorcery/AbsoluteFocus/AbsoluteFocus.png'
    case 8237:
      return 'perk-images/Styles/Sorcery/Scorch/Scorch.png'
    case 8232:
      return 'perk-images/Styles/Sorcery/Waterwalking/Waterwalking.png'
    case 8236:
      return 'perk-images/Styles/Sorcery/GatheringStorm/GatheringStorm.png'
  }
}

export function mapSpellKeyToName(spellKey: string) {
  if (spellKey === '4')
    return 'SummonerFlash'
  else if (spellKey === '14')
    return 'SummonerDot'
  else if (spellKey === '7')
    return 'SummonerHeal'
  else if (spellKey === '3')
    return 'SummonerExhaust'
  else if (spellKey === '12')
    return 'SummonerTeleport'
  else if (spellKey === '6')
    return 'SummonerHaste'
  else if (spellKey === '11')
    return 'SummonerSmite'
  else if (spellKey === '1')
    return 'SummonerBoost'
  else if (spellKey === '32')
    return 'SummonerSnowball'
  else if (spellKey === '21')
    return 'SummonerBarrier'
  else if (spellKey === '13')
    return 'SummonerMana'
  else if (spellKey === '31')
    return 'SummonerPoroThrow'
  else if (spellKey === '30')
    return 'SummonerPoroRecall'
  else if (spellKey === '39')
    return 'SummonerSnowURFSnowball_Mark'
  else if (spellKey === '54')
    return 'Summoner_UltBookPlaceholder'
  else if (spellKey === '55')
    return 'Summoner_UltBookSmitePlaceholder'
  else return spellKey
}

export const unixToDate = (unix: number) => {
  const date = new Date(unix)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const min = date.getMinutes()
  const sec = date.getSeconds()
  const time = `${year}-${month}-${day} ${hour <= 9 ? `0${hour}` : hour}:${min <= 9 ? `0${min}` : min}:${sec <= 9 ? `0${sec}` : sec}`
  return time
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const replaceUnderscoreWithSpace = (str: string) => {
  return str.replace(/_/g, ' ')
}

export function toLowerCase(championName: string): string {
  if (championName === 'FiddleSticks')
    return 'Fiddlesticks'
  else return championName
}

export function formatTime(ms: number) {
  let seconds = Math.floor(ms / 1000)
  let minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  seconds = seconds % 60
  minutes = minutes % 60
  return `${hours}:${minutes}:${seconds}`
}

export const getSummonerName = (summoner: string) => {
  return summoner.replace(/\s+/g, '').toLowerCase()
}

export const unicodeToUtf8 = (str: string) => {
  return unescape(encodeURIComponent(str))
}

export const rankToOrderMapper = (tier: Tier) => {
  switch (tier) {
    case 'IRON':
      return '01_iron'
    case 'BRONZE':
      return '02_bronze'
    case 'SILVER':
      return '03_silver'
    case 'GOLD':
      return '04_gold'
    case 'PLATINUM':
      return '05_platinum'
    case 'DIAMOND':
      return '06_diamond'
    case 'MASTER':
      return '07_master'
    case 'GRANDMASTER':
      return '08_grandmaster'
    case 'CHALLENGER':
      return '09_challenger'
  }
}

export type ObjectOfObjects<T> = Record<string, T>

export const convertToArrayOfObjects = <T> (objectOfObjects: ObjectOfObjects<T>): Record<string, T>[] => {
  return Object.entries(objectOfObjects).map(T => ({ [T[0]]: T[1] }))
}

export const getChampionInfoById = (champsArray: Champion[], champId: number) => {
  const champInfo
      = champsArray.find(champ => champ.key === champId.toString(),
      )
  return champInfo!
}

// Format numbers to have commas in them
export const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const queueNameMapper = (queue: string) => {
  switch (queue) {
    case 'RANKED_SOLO_5x5':
      return 'Solo Queue'
    case 'RANKED_FLEX_SR':
      return 'Ranked Flex'
  }
}

// seconds to hrs:mins:secs
export const secondsToHrsMinsSecs = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  return `${hrs <= 9 ? `0${hrs}` : hrs}:${mins <= 9 ? `0${mins}` : mins}:${secs <= 9 ? `0${secs}` : secs}`
}

export const timeToDaysAgo = (time: number) => {
  const date = new Date(time)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  return days === 0 ? 'Today' : `${days} Days ago`
}

export const secondsToMinutes = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  return mins
}

export const regionToRegionParamMapper = (region: string): string => {
  switch (region) {
    case 'EUW':
      return 'euw1'
    case 'NA':
      return 'na1'
    case 'BR':
      return 'br1'
    case 'EUNE':
      return 'eun1'
    case 'JP':
      return 'jp1'
    case 'KR':
      return 'kr'
    case 'LAN':
      return 'la1'
    case 'LAS':
      return 'la2'
    case 'OCE':
      return 'oc1'
    case 'RU':
      return 'ru'
    case 'TR':
      return 'tr1'
    default:
      return 'euw1'
  }
}

export const regionParamToContinentMapper = (region: string): string => {
  const asia = ['jp1', 'kr', 'tr1']
  const americas = ['na1', 'br1', 'la1', 'la2', 'oc1']
  const europe = ['euw1', 'eun1', 'ru']

  if (asia.includes(region))
    return 'asia'

  else if (americas.includes(region))
    return 'americas'

  else if (europe.includes(region))
    return 'europe'

  return 'europe'
}

const removeGamesString = (string: string) => {
  return string.replace('games', '')
}
const queuesAndDescriptions = [{ queueId: 0, description: null }, { queueId: 2, description: '5v5 Blind Pick games' }, { queueId: 4, description: '5v5 Ranked Solo games' }, { queueId: 6, description: '5v5 Ranked Premade games' }, { queueId: 7, description: 'Co-op vs AI games' }, { queueId: 8, description: '3v3 Normal games' }, { queueId: 9, description: '3v3 Ranked Flex games' }, { queueId: 14, description: '5v5 Draft Pick games' }, { queueId: 16, description: '5v5 Dominion Blind Pick games' }, { queueId: 17, description: '5v5 Dominion Draft Pick games' }, { queueId: 25, description: 'Dominion Co-op vs AI games' }, { queueId: 31, description: 'Co-op vs AI Intro Bot games' }, { queueId: 32, description: 'Co-op vs AI Beginner Bot games' }, { queueId: 33, description: 'Co-op vs AI Intermediate Bot games' }, { queueId: 41, description: '3v3 Ranked Team games' }, { queueId: 42, description: '5v5 Ranked Team games' }, { queueId: 52, description: 'Co-op vs AI games' }, { queueId: 61, description: '5v5 Team Builder games' }, { queueId: 65, description: '5v5 ARAM games' }, { queueId: 67, description: 'ARAM Co-op vs AI games' }, { queueId: 70, description: 'One for All games' }, { queueId: 72, description: '1v1 Snowdown Showdown games' }, { queueId: 73, description: '2v2 Snowdown Showdown games' }, { queueId: 75, description: '6v6 Hexakill games' }, { queueId: 76, description: 'Ultra Rapid Fire games' }, { queueId: 78, description: 'One For All: Mirror Mode games' }, { queueId: 83, description: 'Co-op vs AI Ultra Rapid Fire games' }, { queueId: 91, description: 'Doom Bots Rank 1 games' }, { queueId: 92, description: 'Doom Bots Rank 2 games' }, { queueId: 93, description: 'Doom Bots Rank 5 games' }, { queueId: 96, description: 'Ascension games' }, { queueId: 98, description: '6v6 Hexakill games' }, { queueId: 100, description: '5v5 ARAM games' }, { queueId: 300, description: 'Legend of the Poro King games' }, { queueId: 310, description: 'Nemesis games' }, { queueId: 313, description: 'Black Market Brawlers games' }, { queueId: 315, description: 'Nexus Siege games' }, { queueId: 317, description: 'Definitely Not Dominion games' }, { queueId: 318, description: 'ARURF games' }, { queueId: 325, description: 'All Random games' }, { queueId: 400, description: '5v5 Draft Pick games' }, { queueId: 410, description: '5v5 Ranked Dynamic games' }, { queueId: 420, description: '5v5 Ranked Solo games' }, { queueId: 430, description: '5v5 Blind Pick games' }, { queueId: 440, description: '5v5 Ranked Flex games' }, { queueId: 450, description: '5v5 ARAM games' }, { queueId: 460, description: '3v3 Blind Pick games' }, { queueId: 470, description: '3v3 Ranked Flex games' }, { queueId: 600, description: 'Blood Hunt Assassin games' }, { queueId: 610, description: 'Dark Star: Singularity games' }, { queueId: 700, description: 'Clash games' }, { queueId: 800, description: 'Co-op vs. AI Intermediate Bot games' }, { queueId: 810, description: 'Co-op vs. AI Intro Bot games' }, { queueId: 820, description: 'Co-op vs. AI Beginner Bot games' }, { queueId: 830, description: 'Co-op vs. AI Intro Bot games' }, { queueId: 840, description: 'Co-op vs. AI Beginner Bot games' }, { queueId: 850, description: 'Co-op vs. AI Intermediate Bot games' }, { queueId: 900, description: 'ARURF games' }, { queueId: 910, description: 'Ascension games' }, { queueId: 920, description: 'Legend of the Poro King games' }, { queueId: 940, description: 'Nexus Siege games' }, { queueId: 950, description: 'Doom Bots Voting games' }, { queueId: 960, description: 'Doom Bots Standard games' }, { queueId: 980, description: 'Star Guardian Invasion: Normal games' }, { queueId: 990, description: 'Star Guardian Invasion: Onslaught games' }, { queueId: 1000, description: 'PROJECT: Hunters games' }, { queueId: 1010, description: 'Snow ARURF games' }, { queueId: 1020, description: 'One for All games' }, { queueId: 1030, description: 'Odyssey Extraction: Intro games' }, { queueId: 1040, description: 'Odyssey Extraction: Cadet games' }, { queueId: 1050, description: 'Odyssey Extraction: Crewmember games' }, { queueId: 1060, description: 'Odyssey Extraction: Captain games' }, { queueId: 1070, description: 'Odyssey Extraction: Onslaught games' }, { queueId: 1090, description: 'Teamfight Tactics games' }, { queueId: 1100, description: 'Ranked Teamfight Tactics games' }, { queueId: 1110, description: 'Teamfight Tactics Tutorial games' }, { queueId: 1111, description: 'Teamfight Tactics test games' }, { queueId: 1200, description: 'Nexus Blitz games' }, { queueId: 1300, description: 'Nexus Blitz games' }, { queueId: 1400, description: 'Ultimate Spellbook games' }, { queueId: 1900, description: 'Pick URF games' }, { queueId: 2000, description: 'Tutorial 1' }, { queueId: 2010, description: 'Tutorial 2' }, { queueId: 2020, description: 'Tutorial 3' }]

export const queueIdtoDescriptionMapper = (queueId: number) => {
  const res = queuesAndDescriptions.find(q => q.queueId === queueId)
  if (res?.description)
    return removeGamesString(res.description)

  return ''
}

export const calculatedTimeFromStart = (startedSeconds: number) => {
  const started = new Date(startedSeconds)
  const now = new Date()
  const diff = now.getTime() - started.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  let minutes: number | string = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  let seconds: number | string = Math.floor((diff % (1000 * 60)) / 1000)
  if (seconds < 10)
    seconds = `0${seconds}`
  if (minutes < 10)
    minutes = `0${minutes}`
  return hours > 0 ? `${hours}h ${minutes}m ${seconds}s` : `${minutes}:${seconds}`
}
