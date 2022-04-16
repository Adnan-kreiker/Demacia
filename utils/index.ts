import { Champion, Tier } from './../src/types';

export function idToRunes (id: number) {
  switch (id) {
    case 8112:
      return "perk-images/Styles/Domination/Electrocute/Electrocute.png";
    case 8124:
      return "perk-images/Styles/Domination/Predator/Predator.png";
    case 8128:
      return "perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png";
    case 9923:
      return "perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png";
    case 8126:
      return "perk-images/Styles/Domination/CheapShot/CheapShot.png";
    case 8139:
      return "perk-images/Styles/Domination/TasteOfBlood/GreenTerror_TasteOfBlood.png";
    case 8143:
      return "perk-images/Styles/Domination/SuddenImpact/SuddenImpact.png";
    case 8136:
      return "perk-images/Styles/Domination/ZombieWard/ZombieWard.png";
    case 8120:
      return "perk-images/Styles/Domination/GhostPoro/GhostPoro.png";
    case 8138:
      return "perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png";
    case 8135:
      return "perk-images/Styles/Domination/RavenousHunter/RavenousHunter.png";
    case 8134:
      return "perk-images/Styles/Domination/IngeniousHunter/IngeniousHunter.png";
    case 8105:
      return "perk-images/Styles/Domination/RelentlessHunter/RelentlessHunter.png";
    case 8106:
      return "perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png";
    case 8351:
      return "perk-images/Styles/Inspiration/GlacialAugment/GlacialAugment.png";
    case 8360:
      return "perk-images/Styles/Inspiration/UnsealedSpellbook/UnsealedSpellbook.png";
    case 8369:
      return "perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png";
    case 8306:
      return "perk-images/Styles/Inspiration/HextechFlashtraption/HextechFlashtraption.png";
    case 8304:
      return "perk-images/Styles/Inspiration/MagicalFootwear/MagicalFootwear.png";
    case 8313:
      return "perk-images/Styles/Inspiration/PerfectTiming/PerfectTiming.png";
    case 8321:
      return "perk-images/Styles/Inspiration/FuturesMarket/FuturesMarket.png";
    case 8316:
      return "perk-images/Styles/Inspiration/MinionDematerializer/MinionDematerializer.png";
    case 8345:
      return "perk-images/Styles/Inspiration/BiscuitDelivery/BiscuitDelivery.png";
    case 8347:
      return "perk-images/Styles/Inspiration/CosmicInsight/CosmicInsight.png";
    case 8410:
      return "perk-images/Styles/Resolve/ApproachVelocity/ApproachVelocity.png";
    case 8352:
      return "perk-images/Styles/Inspiration/TimeWarpTonic/TimeWarpTonic.png";
    case 8005:
      return "perk-images/Styles/Precision/PressTheAttack/PressTheAttack.png";
    case 8008:
      return "perk-images/Styles/Precision/LethalTempo/LethalTempoTemp.png";
    case 8021:
      return "perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png";
    case 8010:
      return "perk-images/Styles/Precision/Conqueror/Conqueror.png";
    case 9101:
      return "perk-images/Styles/Precision/Overheal.png";
    case 9111:
      return "perk-images/Styles/Precision/Triumph.png";
    case 8009:
      return "perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png";
    case 9104:
      return "perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png";
    case 9105:
      return "perk-images/Styles/Precision/LegendTenacity/LegendTenacity.png";
    case 9103:
      return "perk-images/Styles/Precision/LegendBloodline/LegendBloodline.png";
    case 8014:
      return "perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png";
    case 8017:
      return "perk-images/Styles/Precision/CutDown/CutDown.png";
    case 8299:
      return "perk-images/Styles/Sorcery/LastStand/LastStand.png";
    case 8437:
      return "perk-images/Styles/Resolve/GraspOfTheUndying/GraspOfTheUndying.png";
    case 8439:
      return "perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png";
    case 8465:
      return "perk-images/Styles/Resolve/Guardian/Guardian.png";
    case 8446:
      return "perk-images/Styles/Resolve/Demolish/Demolish.png";
    case 8463:
      return "perk-images/Styles/Resolve/FontOfLife/FontOfLife.png";
    case 8401:
      return "perk-images/Styles/Resolve/MirrorShell/MirrorShell.png";
    case 8429:
      return "perk-images/Styles/Resolve/Conditioning/Conditioning.png";
    case 8444:
      return "perk-images/Styles/Resolve/SecondWind/SecondWind.png";
    case 8473:
      return "perk-images/Styles/Resolve/BonePlating/BonePlating.png";
    case 8451:
      return "perk-images/Styles/Resolve/Overgrowth/Overgrowth.png";
    case 8453:
      return "perk-images/Styles/Resolve/Revitalize/Revitalize.png";
    case 8242:
      return "perk-images/Styles/Sorcery/Unflinching/Unflinching.png";
    case 8214:
      return "perk-images/Styles/Sorcery/SummonAery/SummonAery.png";
    case 8229:
      return "perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png";
    case 8230:
      return "perk-images/Styles/Sorcery/PhaseRush/PhaseRush.png";
    case 8224:
      return "perk-images/Styles/Sorcery/NullifyingOrb/Pokeshield.png";
    case 8226:
      return "perk-images/Styles/Sorcery/ManaflowBand/ManaflowBand.png";
    case 8275:
      return "perk-images/Styles/Sorcery/NimbusCloak/6361.png";
    case 8210:
      return "perk-images/Styles/Sorcery/Transcendence/Transcendence.png";
    case 8234:
      return "perk-images/Styles/Sorcery/Celerity/Celerity.png";
    case 8233:
      return "perk-images/Styles/Sorcery/AbsoluteFocus/AbsoluteFocus.png";
    case 8237:
      return "perk-images/Styles/Sorcery/Scorch/Scorch.png";
    case 8232:
      return "perk-images/Styles/Sorcery/Waterwalking/Waterwalking.png";
    case 8236:
      return "perk-images/Styles/Sorcery/GatheringStorm/GatheringStorm.png";
  }
}

export function mapSpellKeyToName (spellKey: string) {
  if (spellKey === "4") return "SummonerFlash";
  else if (spellKey === "14") return "SummonerDot";
  else if (spellKey === "7") return "SummonerHeal";
  else if (spellKey === "3") return "SummonerExhaust";
  else if (spellKey === "12") return "SummonerTeleport";
  else if (spellKey === "6") return "SummonerHaste";
  else if (spellKey === "11") return "SummonerSmite";
  else if (spellKey === "1") return "SummonerBoost";
  else if (spellKey === "32") return "SummonerSnowball";
  else if (spellKey === "21") return "SummonerBarrier";
  else return spellKey;
}

export const unixToDate = (unix: number) => {
  const date = new Date(unix);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const time = `${year}-${month}-${day} ${hour <= 9 ? '0' + hour : hour}:${min <= 9 ? '0' + min : min}:${sec <= 9 ? '0' + sec : sec}`;
  return time;
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const replaceUnderscoreWithSpace = (str: string) => {
  return str.replace(/_/g, " ");
};

export function toLowerCase (championName: string): string {
  if (championName === "FiddleSticks") return "Fiddlesticks";
  else return championName;
}

export function formatTime (ms: number) {
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  seconds = seconds % 60;
  minutes = minutes % 60;
  return `${hours}:${minutes}:${seconds}`;
}



export const getSummonerName = (summoner: string) => {
  return summoner.replace(/\s/g, "").toLowerCase();
};

export const unicodeToUtf8 = (str: string) => {
  return unescape(encodeURIComponent(str));
};

export const rankToOrderMapper = (tier: Tier) => {
  switch (tier) {
    case "IRON":
      return "01_iron";
    case "BRONZE":
      return "02_bronze";
    case "SILVER":
      return "03_silver";
    case "GOLD":
      return "04_gold";
    case "PLATINUM":
      return "05_platinum";
    case "DIAMOND":
      return "06_diamond";
    case "MASTER":
      return "07_master";
    case "GRANDMASTER":
      return "08_grandmaster";
    case "CHALLENGER":
      return "09_challenger";
  }
};

export interface ObjectOfObjects<T> {
  [key: string]: T;
}

export const convertToArrayOfObjects = <T> (objectOfObjects: ObjectOfObjects<T>): { [key: string]: T }[] => {
  return Object.entries(objectOfObjects).map((T) => ({ [T[0]]: T[1] }));
}

export const getChampionInfoById = (champsArray: Champion[], champId: number) => {
  if (champsArray.length > 0) {
    let champInfo =
      champsArray.find((champ) => champ.key === champId.toString()
      );
    if (champInfo) {
      return champInfo;
    }
  }
};

// Format numbers to have commas in them
export const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export const queueNameMapper = (queue: string) => {
  switch (queue) {
    case "RANKED_SOLO_5x5":
      return "Solo Queue"
    case "RANKED_FLEX_SR":
      return "Ranked Flex"
  }
}

// seconds to hrs:mins:secs
export const secondsToHrsMinsSecs = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hrs <= 9 ? '0' + hrs : hrs}:${mins <= 9 ? '0' + mins : mins}:${secs <= 9 ? '0' + secs : secs}`;
}

export const timeToDaysAgo = (time: number) => {
  const date = new Date(time);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return `${days} days ago`;
}

export const secondsToMinutes = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  return mins;
}