<script setup lang="ts">
import { NSelect, NSpace } from 'naive-ui'
import type { QueueOptions, QueueTypes, Summoner } from '~/types'

interface Props {
  summonerInfo: Summoner
  queueOptions: QueueOptions
}

const props = defineProps<Props>()

const queueType = ref<QueueTypes>('RANKED_SOLO_5x5')
</script>

<template>
  <Transition v-if="props.summonerInfo" name="fadeMenu" appear>
    <div>
      <div class="flex flex-wrap my-8 gap-5 justify-center sm:justify-evenly min-h-[300px]">
        <!-- Summoners Name and Image -->
        <div class="sm:w-[40%]">
          <SummonersInfo :summoner-info="props.summonerInfo" />
        </div>
        <div class=" sm:w-[55%]">
          <!-- Ranked Info Section -->
          <section>
            <n-space :item-style="{ marginBottom: `${20}px`, minWidth: `${0}%`, marginInline: 'auto' }">
              <n-select v-model:value="queueType" va :options="props.queueOptions" />
            </n-space>
            <SummonersRankedInfo :summoner-info="props.summonerInfo" :queue-type="queueType" />
          </section>
        </div>
      </div>
      <!-- MatchHistory Section -->
      <MatchHistoryInfo :summoner-info="props.summonerInfo" />
    </div>
  </Transition>
</template>
