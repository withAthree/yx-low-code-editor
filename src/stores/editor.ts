import { defineStore } from 'pinia'

export const useEditorStore = defineStore('editor', () => {
  const current = ref({})

  function changeCurrent(val) {
    current.value = val
  }

  return { current, changeCurrent }
})
