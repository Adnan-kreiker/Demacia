import { FeaturedGames, MaybeRef } from './../types'

const useFeaturedGames = (region: MaybeRef<string>) => {
  const featuredGames = ref<null | FeaturedGames>(null)

  function getFeaturedGames() {
    fetch(`${import.meta.env.VITE_URL}/api/get-featured-games/${unref(region)}`)
      .then(res => res.json() as Promise<FeaturedGames>)
      .then(res => featuredGames.value = res)
      .catch(err => console.error(err))
  }

  getFeaturedGames()

  return {
    featuredGames,
  }
}

export default useFeaturedGames
