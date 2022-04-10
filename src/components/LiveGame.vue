<script setup lang="ts">
import { LiveGame, Participant } from "~/types";
import ErrorComponent from "~/components/ErrorComponent.vue";

const props = defineProps<{
  summonerId: string;
}>();

const gameData = ref<null | LiveGame>(null);

const error = ref(false);

const getActiveGame = async (): Promise<void> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_URL}/api/get-live-game/${props.summonerId}`
    );

    const data = await response.json();

    if (data.status && data.status.status_code == 404) {
      error.value = true;
      return;
    }
    gameData.value = data;
  } catch (err) {
    console.error(err);
    error.value = true;
  }
};

const team = (teamId: 100 | 200): Participant[] => {
  if (gameData.value) {
    return gameData.value.participants.filter(
      (participant) => participant.teamId === teamId
    );
  } else return [];
};
getActiveGame();
</script>

<template>
  <div v-if="!error">
    <p>{{ gameData?.gameMode }}</p>
    <section v-if="gameData">
      <div v-for="participant in team(100)" :key="participant.summonerId">
        <img
          height="220"
          width="240"
          class="object-contain mx-auto rounded-md hover:scale-110 transform transition-all duration-500"
          :src="`https://ddragon.leagueoflegends.com/cdn/12.6.1/img/profileicon/${participant.profileIconId}.png`"
        />
        <p>{{ participant.summonerName }}</p>
        <p>{{ participant.teamPosition }}</p>
      </div>
    </section>
  </div>
  <div v-if="error" class="flex flex-row justify-center">
    <error-component
      status="404"
      title="Game not found!"
      description="Summoner is not in an active game!"
    ></error-component>
  </div>
</template>
