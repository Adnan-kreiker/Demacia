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

  // TODO: fix this test
  // it('Selects the clicked filter as current Filter', async () => {
  //   const wrapper = mount(FilterComponent, {
  //     propsData: props,
  //   })

  //   // const testUl = wrapper.get('ul[data-testid=filter-list]')
  //   // expect(testUl.isVisible()).toBe(false)

  //   const filterDiv = wrapper.find('div[data-testid=filter-button]')
  //   await filterDiv.trigger('click')
  //   // expect(testUl.isVisible()).toBe(true)
  //   const testLi = wrapper.findAll('li').filter(li => li.text() === 'test')[0]
  //   // console.log(testLi.text())
  //   const testSpan = wrapper.find('span[data-testid=filter-span]')
  //   console.log(testSpan.text())

  //   await testLi.trigger('click')
  //   console.log(testSpan.text())

  //   expect(testSpan.text()).toBe('test')
  // })
})

