import type { ComponentType } from '@/types/types.ts'

const materials: ComponentType[] = [
  {
    component: 'div',
    text: '矩形',
    width: 97,
    height: 50,
    style: {
      background: 'red',
    },
  },
  {
    component: 'span',
    text: '文本',
    style: {

    },
  },
  {
    component: 'div',
    text: '圆形',
    style: {},
  },
]

function createEditorConfig() {
  const componentList: ComponentType[] = []

  return {
    componentList,
    registerCommon(component: ComponentType) {
      componentList.push(component)
    },
  }
}

export const registerConfig = createEditorConfig()

materials.forEach((item) => {
  registerConfig.registerCommon(item)
})
