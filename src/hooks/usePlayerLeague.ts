import type {PlayerLambda, PlayersLambda, MaybeRef} from './../types'

const usePlayerLeague = (leagueId: MaybeRef<string>, region: MaybeRef<string>) => {
    const playersLambda = ref<PlayerLambda[] | null>(null)

    const getPlayerLeague = () => {
        playersLambda.value = null
        fetch(
            `${import.meta.env.VITE_URL}/api/get-leaderboards-information/${unref(leagueId)}?region=${unref(region)}`,
        ).then(res => res.json() as Promise<PlayersLambda>)
            .then(data => playersLambda.value = data.entries)
            .catch(err => console.error(err))
    }

    getPlayerLeague()

    // watch([leagueId, region], () => {
    //     getPlayerLeague()
    // })

    return {
        playersLambda,
    }
}

export default usePlayerLeague
