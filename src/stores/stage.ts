import { defineStore } from 'pinia'

export const useStageStore = defineStore('stage', () => {
  const width = ref(1920)
  const height = ref(1080)
  const scale = ref(100)

  function changeWidth(val) {
    width.value = val
  }

  function changeHeight(val) {
    height.value = val
  }

  function changeScale(val) {
    scale.value = val
  }

  return { width, height, scale, changeWidth, changeHeight, changeScale }
})
