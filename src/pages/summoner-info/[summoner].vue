<script setup lang="ts">
import { useRoute } from 'vue-router'
import { NCard } from 'naive-ui'
import { Summoner, MatchInfo } from '~/types'

const route = useRoute()

const summonerInfo = ref<null | Summoner>(null)

const matchHistory = ref<null | MatchInfo[]>([])

function millisToMinutesAndSeconds(millis: number): string {
  const minutes = Math.floor(millis / 60000)
  const seconds = ((millis % 60000) / 1000).toFixed(0)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

const getSummonerInfo = async() => {
  const { summoner } = route.params
  try {
    const res = await fetch(`http://localhost:5000/api/get-summoner/${summoner}`)
    const data = (await res.json()) as Summoner

    summonerInfo.value = data

    const matches = await fetch(
      `http://localhost:5000/api/get-matches/${summonerInfo.value.puuid}?start=0&count=1`,
    )

    const matchesId = await matches.json()

    Promise.all(matchesId.map(async(matchId: string) => {
      const match = await fetch(`http://localhost:5000/api/get-match/${matchId}`)
      const data = await match.json()
      matchHistory.value?.push(data)
    }))
  }
  catch (error) {
    console.error(error)
  }
}

getSummonerInfo()

</script>

<template>
  <div v-if="summonerInfo">
    <n-card class="max-w-[200px]" :title="summonerInfo.name">
      <template #cover>
        <img
          :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/profileicon/${summonerInfo.profileIconId}.png`"
        >
      </template>
      <p>Level: {{ summonerInfo.summonerLevel }}</p>
    </n-card>
    <p>{{ new Date(summonerInfo.revisionDate) }}</p>

    <section v-if="matchHistory">
      <div v-for="match in matchHistory" :key="match.metadata.matchId" class="border  border-green-500">
        <div class="bg-white text-gray-600">
          <h2>{{ match.info.participants.filter(participant => participant.summonerName.toLocaleLowerCase() === route.params.summoner.toString().toLocaleLowerCase())[0].win ? 'Victory' : 'Defeat' }}</h2>

          <span>Game mode:{{ match.info.gameMode }}</span>

          <span>Game duration:{{ millisToMinutesAndSeconds(match.info.gameDuration) }}</span>
        </div>
        <div class="flex flex-row  justify-evenly bg-red-200 text-gray-800 p-4">
          <div v-for="participant in match.info.participants.filter(participant => participant.teamId == 100)" :key="participant.championName">
            <p>{{ participant.summonerName }}</p>
            <span>{{ participant.kills }} / {{ participant.deaths }} / {{ participant.assists }}</span>
            <p>{{ participant.teamPosition }}</p>
            <img class="rounded-3xl" height="45" width="45" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${participant.championName}.png`">
          </div>
        </div>
        <div class="flex flex-row justify-evenly bg-blue-200 text-gray-800 p-4">
          <div v-for="participant in match.info.participants.filter(participant => participant.teamId == 200)" :key="participant.championName">
            <p>{{ participant.summonerName }}</p>
            <span>{{ participant.kills }} / {{ participant.deaths }} / {{ participant.assists }}</span>
            <p>{{ participant.teamPosition }}</p>
            <img class="rounded-3xl" height="45" width="45" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${participant.championName}.png`">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
