import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { useUser } from '@/composables/useUser'

import Profile from './Profile.vue'

vi.mock('@/composables/useUser')

const mockedUseUser = vi.mocked(useUser)

function mountProfile(overrides?: any) {
  mockedUseUser.mockReturnValue({
    user: {
      uid: 'user-id',
      displayName: 'John Doe',
      email: 'johndoe@example.com',
      ...overrides,
    },
  } as any)

  const wrapper = mount(Profile)

  return {
    wrapper,
  }
}

describe('Profile.vue', () => {
  it('Deve renderizar o componente corretamente', () => {
    const { wrapper } = mountProfile()

    expect(wrapper.find('.profile').exists()).toBe(true)
  })

  it('Deve exibir o nome do usuário', () => {
    const { wrapper } = mountProfile()

    expect(wrapper.text()).toContain('John Doe')
  })

  it('Deve exibir a foto do usuário caso ela exista', () => {
    const photoURL = 'https://example.com/photo.png'

    const { wrapper } = mountProfile({
      photoURL,
    })

    const image = wrapper.find('img')

    expect(image.exists()).toBe(true)
    expect(image.attributes('src')).toBe(photoURL)
  })

  it('Deve exibir um placeholder caso a foto do usuário não exista', () => {
    const { wrapper } = mountProfile()

    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.find('svg').exists()).toBe(true)
  })
})
