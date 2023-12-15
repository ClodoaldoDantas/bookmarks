import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Logo from './Logo.vue'

describe('Logo.vue', () => {
  it('Deve renderizar o componente com o texto correto', () => {
    const wrapper = mount(Logo)

    expect(wrapper.text()).toEqual('Bookmarks')
  })
})
