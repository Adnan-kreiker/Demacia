/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ErrorComponent from './ErrorComponent.vue'

describe('ErrorComponent', () => {
  const props = {
    title: 'Test',
    description: 'You passed the test',
  }

  it('Displays information about error: status, title, and description', async () => {
    const wrapper = mount(ErrorComponent, {
      propsData: props,
    })
    expect(wrapper.find('p[data-testid=status-p]').text()).toEqual('404')
    expect(wrapper.find('p[data-testid=title-p]').text()).toEqual(props.title)
    expect(wrapper.find('p[data-testid=description-p]').text()).toEqual(props.description)
  })
})

