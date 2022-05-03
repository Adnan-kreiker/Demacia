import { ChampionMastery, MaybeRef } from './../types';

const error = ref(false)

const useChampionMastery = async (summonerId: string, region: MaybeRef<string>) => {
  error.value = false
  const championsMastery = ref<null | ChampionMastery[]>(null);

  try {
    const res = await fetch(
      `${import.meta.env.VITE_URL}/api/get-champions-mastery/${summonerId
      }?region=${unref(region)}`
    );
    const data = await res.json();
    championsMastery.value = data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = true;
    }
    console.log(err);
  }

  return {
    championsMastery,
    error
  }
}

export default useChampionMastery