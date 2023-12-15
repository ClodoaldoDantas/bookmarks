import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Loader from './Loader.vue'

describe('Loader.vue', () => {
  it('Deve renderizar o componente corretamente', () => {
    const wrapper = mount(Loader)
    expect(wrapper.find('div[role="status"]').exists()).toBe(true)
  })

  it('Deve possuir um texto indicando carregamento para fins de acessibilidade', () => {
    const wrapper = mount(Loader)
    expect(wrapper.text()).toEqual('Carregando...')
  })
})
