import { defineStore } from 'pinia'

export const useStageStore = defineStore('stage', () => {
  const width = ref(1856)
  const height = ref(638)
  const scale = ref(100)

  function changeWidth(val: number) {
    width.value = val
  }

  function changeHeight(val: number) {
    height.value = val
  }

  function changeScale(val: number) {
    scale.value = val
  }

  return { width, height, scale, changeWidth, changeHeight, changeScale }
})
