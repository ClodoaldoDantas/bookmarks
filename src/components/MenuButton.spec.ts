import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import MenuButton from './MenuButton.vue'

describe('MenuButton.vue', () => {
  it('Deve renderizar o componente corretamente', () => {
    const wrapper = mount(MenuButton)
    expect(wrapper.find('button[type="button"]').exists()).toBe(true)
  })

  it('Deve renderizar o componente com o texto correto', () => {
    const wrapper = mount(MenuButton, {
      slots: {
        default: 'Minha Conta',
      },
    })

    expect(wrapper.find('button').text()).toBe('Minha Conta')
  })
})
