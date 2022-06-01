/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import SummonersInfo from './SummonersInfo.vue'

describe('SummonersInfo', () => {
  const props = {
    summonerInfo: {
      id: '123',
      accountId: 'accId',
      puuid: '12345',
      name: 'summoner',
      profileIconId: 555,
      revisionDate: 1337,
      summonerLevel: 999,
      status: {
        status_code: 200,
        message: 'ok',
      },
    },
  }
  it('Displays information about summoners: (name, image, and level)', async () => {
    const wrapper = mount(SummonersInfo, {
      propsData: props,
    })

    expect(wrapper.find('img').attributes('src')).toBe(`https://ddragon.leagueoflegends.com/cdn/${process.env.VITE_PATCH_VERSION}/img/profileicon/${props.summonerInfo.profileIconId}.png`)

    expect(wrapper.find('p[data-testid=summoner-name]').text()).toBe(props.summonerInfo.name)

    expect(wrapper.find('span[data-testid=summoner-level]').text()).toBe(`Level: ${props.summonerInfo.summonerLevel}`)
  })
})

