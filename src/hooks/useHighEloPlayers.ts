import type { ChallengerPlayer, ChallengerPlayers, MaybeRef } from './../types';

const useHighEloPlayers = (rank: MaybeRef<string>, queue: MaybeRef<string>, region: MaybeRef<string>) => {
  const challengerPlayers = ref<ChallengerPlayer[] | null>(null)

  const getHighEloPlayers = () => {
    challengerPlayers.value = null
    fetch(
      `${import.meta.env.VITE_URL}/api/get-leaderboards-players/${unref(rank)}/${unref(queue)}?region=${unref(region)}`
    ).then(res => res.json() as Promise<ChallengerPlayers>)
      .then(data => challengerPlayers.value = data.entries)
      .catch(err => console.error(err))
  }

  getHighEloPlayers()

  watch([rank, queue, region], () => {
    getHighEloPlayers()
  })

  return {
    challengerPlayers
  }
}

export default useHighEloPlayers