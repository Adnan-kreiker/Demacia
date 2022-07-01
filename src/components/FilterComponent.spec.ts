/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import FilterComponent from './FilterComponent.vue'

describe('FilterComponent', () => {
  const props = {
    filterOptions: [{
      id: 1,
      name: 'test',
    },
    {
      id: 2,
      name: 'test2',
    }],
    currentFilter: 'test2',
  }

  it('Displays the name of the current filter', async () => {
    const wrapper = mount(FilterComponent, {
      propsData: props,
    })
    expect(wrapper.find('span[data-testid=filter-span]').text()).toBe(props.currentFilter)
  })


})

