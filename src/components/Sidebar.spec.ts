import { nextTick } from 'vue'
import { useRouter } from 'vue-router'

import { describe, expect, it, vi } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'

import { authService } from '@/services/auth'
import { folderService } from '@/services/folder'
import { useUser } from '@/composables/useUser'

import Sidebar from './Sidebar.vue'
import Profile from './Profile.vue'
import Menu from './Menu.vue'
import MenuButton from './MenuButton.vue'
import FolderList from './FolderList.vue'
import FolderItem from './FolderItem.vue'

const foldersMock = [
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
]

vi.mock('vue-router')

vi.mock('@/services/auth')

vi.mock('@/services/folder')

vi.mock('@/composables/useFolders', () => ({
  useFolders: () => {
    return {
      folders: foldersMock,
    }
  },
}))

vi.mock('@/composables/useUser')

const mockedUseRouter = vi.mocked(useRouter)
const mockedUseUser = vi.mocked(useUser)

const userMock = {
  uid: 'user-id',
  displayName: 'John Doe',
  email: 'johndoe@example.com',
}

function mountSidebar({ displayProfileInfo }: { displayProfileInfo: boolean }) {
  const pushMock = vi.fn()
  const replaceMock = vi.fn()

  if (displayProfileInfo) {
    mockedUseUser.mockReturnValue({
      user: {
        value: {
          ...userMock,
        },
      },
    } as any)
  } else {
    mockedUseUser.mockReturnValue({
      user: {
        ...userMock,
      },
    } as any)
  }

  mockedUseRouter.mockImplementation(() => {
    return {
      push: pushMock,
      replace: replaceMock,
    } as any
  })

  const wrapper = mount(Sidebar, {
    global: {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    },
  })

  return {
    wrapper,
    pushMock,
    replaceMock,
  }
}

describe('Sidebar.vue', () => {
  it('Deve renderizar o componente corretamente', () => {
    const { wrapper } = mountSidebar({ displayProfileInfo: false })

    expect(wrapper.find('aside').exists()).toBe(true)
  })

  it('Deve exibir o perfil do usuário', () => {
    const { wrapper } = mountSidebar({ displayProfileInfo: false })

    const profileComponent = wrapper.findComponent(Profile)

    expect(profileComponent.exists()).toBe(true)
    expect(profileComponent.text()).toContain('John Doe')
  })

  it('Deve exibir o menu com as opções corretas', () => {
    const { wrapper } = mountSidebar({ displayProfileInfo: false })

    const menu = wrapper.findComponent(Menu)
    const buttons = wrapper.findAllComponents(MenuButton)

    expect(menu.exists()).toBe(true)
    expect(buttons).toHaveLength(2)

    expect(buttons[0].text()).toContain('Minha Conta')
    expect(buttons[1].text()).toContain('Sair da Conta')
  })

  it("Deve ser possível redirecionar para a página de 'Minha Conta'", () => {
    const { wrapper, pushMock } = mountSidebar({ displayProfileInfo: false })

    const accountButton = wrapper.findComponent(MenuButton)

    accountButton.trigger('click')

    expect(pushMock).toHaveBeenCalledTimes(1)
    expect(pushMock).toHaveBeenCalledWith('/dashboard/account')
  })

  it('Deve ser possível sair da aplicação', async () => {
    const logoutSpy = vi.spyOn(authService, 'logout')

    const { wrapper, replaceMock } = mountSidebar({ displayProfileInfo: false })

    const logoutButton = wrapper.findAllComponents(MenuButton)[1]
    logoutButton.trigger('click')

    await nextTick()

    expect(logoutSpy).toHaveBeenCalledTimes(1)
    expect(replaceMock).toHaveBeenCalledTimes(1)
    expect(replaceMock).toHaveBeenCalledWith('/')
  })

  it('Deve exibir a lista de pastas', () => {
    const { wrapper } = mountSidebar({ displayProfileInfo: false })

    const folderList = wrapper.findComponent(FolderList)
    const folders = folderList.findAllComponents(FolderItem)

    expect(folderList.exists()).toBe(true)
    expect(folders).toHaveLength(2)
  })

  it('Deve ser possível criar uma nova pasta', () => {
    const mockPrompt = vi.spyOn(window, 'prompt').mockReturnValue('Folder 3')
    const createSpy = vi.spyOn(folderService, 'create')

    const { wrapper } = mountSidebar({ displayProfileInfo: true })

    const newFolderButton = wrapper.find("button[aria-label='Nova Pasta']")

    newFolderButton.trigger('click')

    expect(createSpy).toHaveBeenCalledTimes(1)
    expect(createSpy).toHaveBeenCalledWith({
      name: 'Folder 3',
      authorId: 'user-id',
    })

    mockPrompt.mockRestore()
  })
})
