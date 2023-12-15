import { describe, expect, it, vi } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'

import Menu from './Menu.vue'
import FolderItem from './FolderItem.vue'
import FolderList from './FolderList.vue'

vi.mock('@/composables/useFolders', () => ({
  useFolders: () => {
    return {
      folders: [
        {
          id: '1',
          name: 'Folder 1',
          createdAt: new Date(),
        },
        {
          id: '2',
          name: 'Folder 2',
          createdAt: new Date(),
        },
      ],
    }
  },
}))

function mountFolderList() {
  const wrapper = mount(FolderList, {
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

describe('FolderList.vue', () => {
  it('Deve renderizar o componente Menu', () => {
    const { wrapper } = mountFolderList()
    expect(wrapper.findComponent(Menu).exists()).toBe(true)
  })

  it('Deve renderizar 2 componentes FolderItem', () => {
    const { wrapper } = mountFolderList()
    expect(wrapper.findAllComponents(FolderItem).length).toEqual(2)
  })
})
