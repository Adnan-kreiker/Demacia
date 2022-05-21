import type { Ref } from 'vue'
import type { FeaturedGames } from './../types'

const useFeaturedGames = (region: Ref<string>) => {
  const featuredGames = ref<null | FeaturedGames>(null)

  function getFeaturedGames() {
    featuredGames.value = null

    fetch(`${import.meta.env.VITE_URL}/api/get-featured-games/${unref(region)}`)
      .then(res => res.json() as Promise<FeaturedGames>)
      .then(res => featuredGames.value = res)
      .catch(err => console.error(err))
  }

  getFeaturedGames()

  watch(region, () => getFeaturedGames())

  return {
    featuredGames,
  }
}

export default useFeaturedGames
