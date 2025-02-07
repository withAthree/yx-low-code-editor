import type { ComponentType, EditorDataType } from '@/types/types.ts'
import { defineStore } from 'pinia'

// interface EditorState {
//   data: EditorDataType
//   current: ComponentType
//   preview: boolean
//   initWidth: number
//   initHeight: number
// }

const defaultData = {
  // container: {
  //   markline: {
  //     show: true,
  //     color: ''
  //   },
  //   snapToGrid: true,
  //   gridSize: 10,
  //   gridColor: '',
  //   style: {},
  //   scaleRatio: 1
  // },
  elements: [],
}

export const useEditorStore = defineStore('editor', () => {
  const current = ref<ComponentType | null>()
  const data = ref<EditorDataType>(defaultData)

  function changeCurrent(val: ComponentType) {
    current.value = val
  }

  function updateData(val: EditorDataType) {
    data.value = val
  }

  return { current, data, changeCurrent, updateData }
})
