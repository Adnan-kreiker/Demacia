/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ChampionCard from './ChampionCard.vue'

describe('ChampionCard', () => {
  const champProps = {
    id: 'Darius',
    name: 'Darius',
    tags: ['Fighter', 'Tank'],
  }

  it('Displays information about champion: image, name, and roles', async () => {
    const wrapper = mount(ChampionCard, {
      propsData: {
        champ: champProps,
      },
    })
    expect(wrapper.find('p').text()).toEqual('Fighter')
    const image = wrapper.find('img')
    expect(image.attributes('src')).toEqual(`https://ddragon.leagueoflegends.com/cdn/${process.env.VITE_PATCH_VERSION}/img/champion/Darius.png`)
    const paragraphs = wrapper.findAll('p')
    expect(paragraphs[0].text()).toEqual('Fighter')
    expect(paragraphs[1].text()).toEqual('Tank')
  })
})
