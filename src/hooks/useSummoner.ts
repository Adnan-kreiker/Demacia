import { Summoner } from "~/types";
import { unicodeToUtf8 } from "../../utils";

const error = ref(false);

const useSummoner = () => {

  const getSummonerByName = async (summonerName: string, region: string) => {
    const error = ref(false);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL}/api/get-summoner/${unicodeToUtf8(summonerName)}?region=${region}`
      );
      const data = (await res.json()) as Summoner;


      if (data.status && data.status.status_code == 404) {
        error.value = true;
      }
      return data;
    } catch (err) {
      error.value = true;
      console.error(err);
    }
  }

  return {
    getSummonerByName,
    error
  }
}

export default useSummoner;