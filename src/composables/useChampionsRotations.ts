import type { FreeChampionRotations } from '~/types'

const rotations = ref<FreeChampionRotations | null>(null)

export default function useChampionsRotations() {
  if (!rotations.value) {
    fetch(`${import.meta.env.VITE_URL}/api/get-champions-rotations`)
      .then(res => res.json())
      .then(champs => rotations.value = champs)
      .catch(err => console.error(err))
  }

  return {
    rotations,
  }
}
