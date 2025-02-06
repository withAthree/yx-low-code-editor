import type { ComponentType } from '@/types/types.ts'

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

registerConfig.registerCommon({
  component: 'div',
  text: '矩形',
  style: {},
})

registerConfig.registerCommon({
  component: 'span',
  text: '文本',
  style: {},
})

registerConfig.registerCommon({
  component: 'div',
  text: '圆形',
  style: {},
})
