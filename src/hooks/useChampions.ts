import { Champion } from './../types';


const champions = shallowRef<null | Champion[]>(null)
const championsArray = shallowRef<null | Champion[]>(null)

const useChampions = () => {
  if (!champions.value || !championsArray.value) {
    fetch(`${import.meta.env.VITE_URL}/api/get-champions`)
      .then(res => res.json())
      .then(champs => {
        champions.value = champs.data
        championsArray.value = Object.values(champs.data)
      })
      .catch(err => console.error(err))
  }
  return {
    champions,
    championsArray,
  }
}


export default useChampions