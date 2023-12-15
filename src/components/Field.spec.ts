import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Field from './Field.vue'

describe('Field.vue', () => {
  it('Deve renderizar o componente corretamente', () => {
    const wrapper = mount(Field, {
      props: {
        modelValue: '',
      },
    })

    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('Deve ser possível alterar o valor do input', () => {
    const wrapper = mount(Field, {
      props: {
        modelValue: '',
      },
    })

    const input = wrapper.find('input')
    input.setValue('Teste')

    expect(input.element.value).toEqual('Teste')
  })
})
