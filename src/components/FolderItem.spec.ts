import { describe, expect, it } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import FolderItem from './FolderItem.vue'

function mountFolderItem() {
  const wrapper = mount(FolderItem, {
    props: {
      data: {
        id: 'docs-id',
        name: 'Docs',
      },
    },
    global: {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    },
  })

  return {
    wrapper,
  }
}

describe('FolderItem.vue', () => {
  it('Deve renderizar o componente corretamente', () => {
    const { wrapper } = mountFolderItem()

    expect(wrapper.findComponent(RouterLinkStub).exists()).toBe(true)
  })

  it('Deve renderizar o link com o atributo href correto', () => {
    const { wrapper } = mountFolderItem()

    const element = wrapper.findComponent(RouterLinkStub)

    expect(element.props().to).toEqual('/dashboard/docs-id')
  })

  it('Deve renderizar o link com o nome da pasta', () => {
    const { wrapper } = mountFolderItem()

    expect(wrapper.text()).toContain('Docs')
  })
})
