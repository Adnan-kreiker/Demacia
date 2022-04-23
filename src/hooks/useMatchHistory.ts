// import { regionParamToContinentMapper } from "../../utils";
// import { MatchInfo } from "~/types";


// const error = ref(false)

// const useMatchHistory = (puuid: string, region: string) => {
//   // const matchesIds = ref<string[] | null>(null)

//   // const getMatchHistory = async () => {
//   const matchHistory = ref<MatchInfo[]>([]);
//   const matchesIds = ref<string[]>([])
//   // try {
//   fetch(
//     `${import.meta.env.VITE_URL}/api/get-matches/${puuid
//     }?start=0&count=5&region=${regionParamToContinentMapper(region)}`
//   ).then(res => res.json())
//     .then((matches) => matchesIds.value = matches)
//     .then(() => {
//       Promise.allSettled(matchesIds.value.map(match => {
//         return fetch(`${import.meta.env.VITE_URL}/api/get-match/${match}?region=${regionParamToContinentMapper(region)}`)
//           .then((res) => res.json())
//       })
//       ).then(res => matchHistory.value.push(...res.map(r => r.value)))
//       console.log({ matchHistory });
//     })
//   return {
//     matchHistory,
//     error
//   }
// }


// export default useMatchHistory
import { regionParamToContinentMapper } from "../../utils";
import { MatchInfo } from "~/types";


const error = ref(false)

const useMatchHistory = async (puuid: string, region: string) => {
  // const matchesIds = ref<string[] | null>(null)
  const matchHistory = ref<MatchInfo[]>([]);
  error.value = false
  try {
    const matches = await fetch(
      `${import.meta.env.VITE_URL}/api/get-matches/${puuid
      }?start=0&count=5&region=${regionParamToContinentMapper(region)}`
    );

    const matchesIds = await matches.json() as string[]
    await Promise.allSettled(
      unref(matchesIds).map(async (matchId: string) => {
        return fetch(
          `${import.meta.env.VITE_URL}/api/get-match/${matchId}?region=${regionParamToContinentMapper(region)}`
        ).then((res) => res.json())
          .then((match) => matchHistory.value.push({ ...match, show: false }))
      })
    ).catch(err => console.log(err))
  } catch (err) {
    error.value = true;
    console.error(err);
  }
  return {
    matchHistory,
    error
  }
}


export default useMatchHistory


