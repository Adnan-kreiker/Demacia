<script setup lang="ts">
import { useRoute } from 'vue-router'
import { NCard } from 'naive-ui'
import { Summoner, MatchInfo, Participant } from '~/types'

const route = useRoute()

const summonerInfo = ref<null | Summoner>(null)

const matchHistory = ref<null | MatchInfo[]>([])

function millisToMinutesAndSeconds(millis: number): string {
  const minutes = Math.floor(millis / 60000)
  const seconds = ((millis % 60000) / 1000).toFixed(0)
  return `${minutes}${parseInt(seconds) < 10 ? '0' : ''}m ${seconds}s`
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

const summoner = (participants: Participant[]): Participant => {
  const participant = participants.filter(participant => participant.summonerName.toLowerCase() === route.params.summoner.toString().toLowerCase())
  return participant[0]
}

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
        </div>
        <section class="flex flex-row w-full">
          <div class=" flex flex-row w-4/6">
            <div class="w-1/3 flex flex-col justify-center ">
              <h2>{{ match.info.gameMode }}</h2>
              <h2>{{ millisToMinutesAndSeconds(match.info.gameDuration) }}</h2>

              <h2>{{ summoner(match.info.participants).win ? 'Victory' : 'Defeat' }}</h2>
            </div>
            <div class="flex flex-col justify-center items-center">
              <img height="70" width="70" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${summoner(match.info.participants).championName}.png`" alt="">
              <span>{{ summoner(match.info.participants).championName }}</span> <br>
              <span>{{ summoner(match.info.participants).kills }} / {{ summoner(match.info.participants).deaths }} / {{ summoner(match.info.participants).assists }}</span>

              <div>
                <img :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/${summoner(match.info.participants).summoner1Casts}.png`" alt="">
              </div>
              <div class="flex flex-row">
                <img v-if="summoner(match.info.participants).item0 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${summoner(match.info.participants).item0}.png`" alt="">
                <img v-if="summoner(match.info.participants).item1 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${summoner(match.info.participants).item1}.png`" alt="">
                <img v-if="summoner(match.info.participants).item2 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${summoner(match.info.participants).item2}.png`" alt="">
                <img v-if="summoner(match.info.participants).item3 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${summoner(match.info.participants).item3}.png`" alt="">
                <img v-if="summoner(match.info.participants).item4 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${summoner(match.info.participants).item4}.png`" alt="">
                <img v-if="summoner(match.info.participants).item5 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${summoner(match.info.participants).item5}.png`" alt="">
                <img v-if="summoner(match.info.participants).item6 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${summoner(match.info.participants).item6}.png`" alt="">
              </div>
              <div class="flex flex-col items-center">
                <span>Level : {{ summoner(match.info.participants).champLevel }}</span> <br>
                <span>CS :{{ summoner(match.info.participants).totalMinionsKilled }}</span> <br>
                <span>Wards placed: {{ summoner(match.info.participants).wardsPlaced }}</span> <br>
              </div>
            </div>
          </div>
          <div class="flex flex-col self-end p-2   w-1/6 bg-red-200 text-gray-800 p-4">
            <div v-for="participant in match.info.participants.filter(participant => participant.teamId == 100)" :key="participant.championName" class="my-1">
              <!-- <span>{{ participant.kills }} / {{ participant.deaths }} / {{ participant.assists }}</span> -->
              <!-- <p>{{ participant.teamPosition }}</p> -->
              <div class="flex flex-row flex-1 w-full justify-start items-center">
                <img class="rounded-3xl mr-2 " height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${participant.championName}.png`">
                <span>{{ participant.summonerName }}</span>
              </div>
            </div>
          </div>
          <div class="flex flex-col  w-1/6 self-end p-2 bg-blue-200 text-gray-800 p-4">
            <div v-for="participant in match.info.participants.filter(participant => participant.teamId == 200)" :key="participant.championName" class="my-1">
              <div class="flex w-full flex-1 flex-row justify-start items-center">
                <!-- <p>{{ participant }}</p> -->
                <!-- <span>{{ participant.kills }} / {{ participant.deaths }} / {{ participant.assists }}</span> -->
                <!-- <p>{{ participant.teamPosition }}</p> -->
                <img class="rounded-3xl mr-2 " height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${participant.championName}.png`">
                <span>{{ participant.summonerName }}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>
