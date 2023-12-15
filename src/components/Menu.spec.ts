import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Menu from './Menu.vue'

describe('Menu.vue', () => {
  it('Deve renderizar o componente corretamente', () => {
    const wrapper = mount(Menu)
    expect(wrapper.find('nav').exists()).toBe(true)
  })
})
