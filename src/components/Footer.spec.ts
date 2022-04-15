/**
 * @vitest-environment happy-dom
 */

// import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Footer from './Footer.vue'

describe('Footer', () => {
  const pText = 'By Adnan Kreiker 🦄'


  it('Renders a paragraph with the content of pText', async () => {
    const wrapper = mount(Footer)
    expect(wrapper.find('p').text()).toEqual(pText)
    const a = wrapper.find('a[data-testid=github-link]')
    expect(a.attributes('href')).toEqual('https://github.com/Adnan-kreiker')
  })



})