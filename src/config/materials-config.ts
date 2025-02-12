import type { ComponentType } from '@/types/types.ts'

const materials: ComponentType[] = [
  {
    component: 'div',
    text: 'round_rect',
    componentType: 'round_rect',
    width: 97,
    height: 50,
    style: {
      background: 'red',
    },
  },
  {
    component: 'div',
    text: 'equipment',
    componentType: 'equipment',
    width: 170,
    height: 114,
    style: {
      color: '#61666A',
      boxShadow: '0px 0px 6px rgba(0,0,0,0.16)',
      background: '#F9FBFC',
      borderRadius: '0 1px 2px 3px',
      padding: '5px 16px',
      fontSize: '14px',
    },
  },
  {
    component: 'line',
    componentType: 'line-straight',
    text: 'line',
    width: 1,
    height: 1,
    props: {
      linePoints: '0 0,100 0',
      showArrow: true,
      arrowMoveX: 0,
      arrowMoveY: 0,
      arrowRotate: 0,
    },
    style: {
      stroke: 'rgb(221 224 230 / 100%)',
      strokeWidth: '2',
    },
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
