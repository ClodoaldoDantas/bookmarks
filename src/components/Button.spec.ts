import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button.vue', () => {
  it('Deve renderizar o componente corretamente', () => {
    const wrapper = mount(Button)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('Deve renderizar o componente com o texto correto', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Enviar',
      },
    })

    expect(wrapper.find('button').text()).toBe('Enviar')
  })
})
