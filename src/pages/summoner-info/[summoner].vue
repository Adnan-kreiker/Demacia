<script setup lang="ts">
import { useRoute } from 'vue-router'
import { NCard, NTag, NCollapseTransition, NSpace, NSwitch } from 'naive-ui'
import { Summoner, MatchInfo, Participant } from '~/types'

const route = useRoute()

function toLowerCase(championName: string): string {
  if (championName === 'FiddleSticks') return 'Fiddlesticks'
  else return championName
}

const summonerInfo = ref<null | Summoner>(null)

const matchHistory = ref<null | MatchInfo[]>([])

function mapSpellKeyToName(spellKey: string) {
  if (spellKey === '4') return 'SummonerFlash'
  else if (spellKey === '14') return 'SummonerDot'
  else if (spellKey === '7') return 'SummonerHeal'
  else if (spellKey === '3') return 'SummonerExhaust'
  else if (spellKey === '12') return 'SummonerTeleport'
  else if (spellKey === '6') return 'SummonerHaste'
  else if (spellKey === '11') return 'SummonerSmite'
  else if (spellKey === '1') return 'SummonerBoost'
  else if (spellKey === '32') return 'SummonerSnowball'
  else if (spellKey === '21') return 'SummonerBarrier'
  else return spellKey
}

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
      `http://localhost:5000/api/get-matches/${summonerInfo.value.puuid}?start=0&count=10`,
    )

    const matchesId = await matches.json()

    Promise.allSettled(matchesId.map(async(matchId: string) => {
      const match = await fetch(`http://localhost:5000/api/get-match/${matchId}`)
      const data = await match.json()
      matchHistory.value?.push({ ...data, show: false })
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
      <div v-for="match in matchHistory" :key="match.metadata.matchId" :class="summoner(match.info.participants).win ? 'bg-green-200' : 'bg-red-200' " class="border-2 my-3  ">
        <section class="flex flex-row text-gray-800 w-full">
          <!-- Game Information -->
          <div class=" flex flex-row flex-1 text-center  ">
            <div class=" flex flex-col justify-center max-w-[180px] px-2 ">
              <h2>{{ match.info.gameMode }}</h2>
              <h2>{{ millisToMinutesAndSeconds(match.info.gameDuration) }}</h2>

              <h2>{{ summoner(match.info.participants).win ? 'Victory' : 'Defeat' }}</h2>
            </div>
            <!-- Summoner Image and Name -->
            <div class="px-4 flex flex-col relative justify-center">
              <div><img height="70" width="70" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${toLowerCase(summoner(match.info.participants).championName)}.png`" alt=""></div>
              <span class="absolute top-[62%] left-[31%]">{{ summoner(match.info.participants).championName }}</span> <br>
            </div>

            <div class="flex flex-row items-center">
              <img class="w-8 h-8" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/${mapSpellKeyToName(summoner(match.info.participants).summoner1Id.toString())}.png`" alt="">
              <img class="w-8 h-8" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/spell/${mapSpellKeyToName(summoner(match.info.participants).summoner2Id.toString())}.png`" alt="">
            </div>
            <!-- Summoner Stats -->
            <div class="flex flex-col justify-center flex-1 items-center">
              <span class="my-2">{{ summoner(match.info.participants).kills }} / {{ summoner(match.info.participants).deaths }} / {{ summoner(match.info.participants).assists }}</span>

              <div class="flex flex-row gap-1">
                <img v-if="summoner(match.info.participants).item0 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${summoner(match.info.participants).item0}.png`" alt="">
                <img v-if="summoner(match.info.participants).item1 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${summoner(match.info.participants).item1}.png`" alt="">
                <img v-if="summoner(match.info.participants).item2 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${summoner(match.info.participants).item2}.png`" alt="">
                <img v-if="summoner(match.info.participants).item3 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${summoner(match.info.participants).item3}.png`" alt="">
                <img v-if="summoner(match.info.participants).item4 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${summoner(match.info.participants).item4}.png`" alt="">
                <img v-if="summoner(match.info.participants).item5 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${summoner(match.info.participants).item5}.png`" alt="">
                <img v-if="summoner(match.info.participants).item6 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${summoner(match.info.participants).item6}.png`" alt="">
              </div>
              <div class="my-2">
                <span class="py-1">CS :{{ summoner(match.info.participants).totalMinionsKilled }}</span> <br>
                <span class="py-1">Level : {{ summoner(match.info.participants).champLevel }}</span> <br>
                <span class="py-1">Wards placed: {{ summoner(match.info.participants).wardsPlaced }}</span> <br>
                <n-tag
                  v-if="summoner(match.info.participants).pentaKills || summoner(match.info.participants).quadraKills || summoner(match.info.participants).tripleKills || summoner(match.info.participants).doubleKills"
                  class="my-3"
                  :color="{ color: '#ee5a52', textColor: 'white', borderColor: 'red' }"
                >
                  {{ summoner(match.info.participants).pentaKills ? 'Penta Kill' : summoner(match.info.participants).quadraKills ? 'Quadra Kill' : summoner(match.info.participants).tripleKills ? 'Triple Kill' : summoner(match.info.participants).doubleKills ? 'Double Kill' : '' }}
                </n-tag>
              </div>
            </div>
          </div>
          <!-- Red Team -->
          <div class="flex flex-col self-end p-2 text-gray-600  w-[150px]   p-4">
            <div v-for="participant in match.info.participants.filter(participant => participant.teamId == 100)" :key="participant.championName" class="my-1">
              <div class="flex flex-row flex-1 w-full justify-start items-center">
                <img class="rounded-3xl mr-2 " height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${toLowerCase(participant.championName)}.png`">
                <router-link

                  class=" truncate overflow-ellipsis space-nowrap  "
                  :to="`/summoner-info/${participant.summonerName}`"
                >
                  <div class="group">
                    <p class="truncate overflow-ellipsis space-nowrap">
                      {{ participant.summonerName }} <span class="absolute z-50 hidden p-3 px-6 py-2 -mt-8 -ml-36 text-center bg-white rounded tooltip-text group-hover:block">{{ participant.summonerName }}</span>
                    </p>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <!-- Blue Team -->
          <div class="flex flex-col   self-end p-2 text-gray-600   w-[150px]  p-4">
            <div v-for="participant in match.info.participants.filter(participant => participant.teamId == 200)" :key="participant.championName" class="my-1">
              <div class="flex w-full flex-1 flex-row justify-start items-center">
                <img class="rounded-3xl mr-2 " height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${toLowerCase(participant.championName)}.png`">
                <router-link class="truncate overflow-ellipsis space-nowrap " :to="`/summoner-info/${participant.summonerName}`">
                  <div class="group">
                    <p class="truncate overflow-ellipsis space-nowrap">
                      {{ participant.summonerName }} <span class="absolute z-50 hidden p-3 px-6 py-2 -mt-8 -ml-36 text-center bg-white rounded tooltip-text group-hover:block">{{ participant.summonerName }}</span>
                    </p>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </section>
        <n-space vertical>
          <n-switch v-model:value="match.show">
            <template #checked>
              <span>Less Information</span>
            </template>
            <template #unchecked>
              <span class="text-black">More Information</span>
            </template>
          </n-switch>
          <keep-alive>
            <n-collapse-transition v-if="match.show" :show="match.show">
              <div class="flex justify-center">
                <table class="text-gray-600 ">
                  <tr>
                    <th>Blue Team</th>
                    <th>Tier</th>
                    <th>KDA</th>
                    <th>Damage</th>
                    <th>Wards</th>
                    <th>CS</th>
                    <th>items</th>
                  </tr>
                  <tr v-for="participant in match.info.participants.filter(participant => participant.teamId == 200)" :key="participant.championName">
                    <th class="flex flex-row items-center">
                      <div class="mr-2">
                        <img height="40" width="40" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${toLowerCase(participant.championName)}.png`" alt="">
                      </div>
                      <span class="mr-2">{{ participant.summonerName }}</span>
                    </th>
                    <th><span class="mx-4">{{ participant.summonerLevel }}</span></th>
                    <th><span class="mx-4">{{ participant.kills }} / {{ participant.deaths }} / {{ participant.assists }}</span></th>
                    <th><span class="mx-4">{{ participant.totalDamageDealtToChampions }}</span></th>
                    <th><span class="mx-4">{{ participant.wardsPlaced }}</span></th>
                    <th><span class="mx-4">{{ participant.totalMinionsKilled }}</span></th>
                    <th>
                      <div class="flex flex-row gap-1">
                        <img v-if="participant.item0 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item0}.png`" alt="">
                        <img v-if="participant.item1 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item1}.png`" alt="">
                        <img v-if="participant.item2 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item2}.png`" alt="">
                        <img v-if="participant.item3 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item3}.png`" alt="">
                        <img v-if="participant.item4 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item4}.png`" alt="">
                        <img v-if="participant.item5 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item5}.png`" alt="">
                        <img v-if="participant.item6 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item6}.png`" alt="">
                      </div>
                    </th>
                  </tr>
                </table>
              </div>
              <hr class="my-4">
              <div class="flex flex-row justify-center">
                <table class="text-gray-600 ">
                  <tr>
                    <th>Red Team</th>
                    <th>Tier</th>
                    <th>KDA</th>
                    <th>Damage</th>
                    <th>Wards</th>
                    <th>CS</th>
                    <th>items</th>
                  </tr>
                  <tr v-for="participant in match.info.participants.filter(participant => participant.teamId == 100)" :key="participant.championName">
                    <th class="flex flex-row items-center">
                      <div class="mr-2">
                        <img height="40" width="40" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${toLowerCase(participant.championName)}.png`" alt="">
                      </div>
                      <span class="mr-2">{{ participant.summonerName }}</span>
                    </th>
                    <th><span class="mx-4">{{ participant.summonerLevel }}</span></th>
                    <th><span class="mx-4">{{ participant.kills }} / {{ participant.deaths }} / {{ participant.assists }}</span></th>
                    <th><span class="mx-4">{{ participant.totalDamageDealtToChampions }}</span></th>
                    <th><span class="mx-4">{{ participant.wardsPlaced }}</span></th>
                    <th><span class="mx-4">{{ participant.totalMinionsKilled }}</span></th>
                    <th>
                      <div class="flex flex-row gap-1">
                        <img v-if="participant.item0 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item0}.png`" alt="">
                        <img v-if="participant.item1 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item1}.png`" alt="">
                        <img v-if="participant.item2 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item2}.png`" alt="">
                        <img v-if="participant.item3 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item3}.png`" alt="">
                        <img v-if="participant.item4 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item4}.png`" alt="">
                        <img v-if="participant.item5 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item5}.png`" alt="">
                        <img v-if="participant.item6 !== 0" height="25" width="25" :src="`http://ddragon.leagueoflegends.com/cdn/12.5.1/img/item/${participant.item6}.png`" alt="">
                      </div>
                    </th>
                  </tr>
                </table>
              </div>
            </n-collapse-transition>
            <template v-else></template>
          </keep-alive>
        </n-space>
      </div>
    </section>
  </div>
</template>
