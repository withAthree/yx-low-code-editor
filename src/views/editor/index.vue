<script setup lang="ts">
import Grid from '@/components/Grid.vue'
import { useEditorStore, useStageStore } from '@/stores'

const props = defineProps<{
  width: number
  height: number
}>()

const store = useStageStore()
const editorStore = useEditorStore()

const editorRef = ref(null)
const scale = ref(100)

watch([() => props.width, () => props.height], ([width, height]) => {
  const scaleWidth = width / store.width
  const scaleHeight = height / store.height
  scale.value = Number(Math.min(scaleWidth, scaleHeight).toFixed(2))
  store.changeScale(scale.value * 100)
})

watch(() => store.scale, (val) => {
  scale.value = val / 100
})
</script>

<template>
  <div
    ref="editorRef"
    class="editor"
    :style="{
      width: `${store.width}px`,
      height: `${store.height}px`,
      transform: `scale(${scale})`,
    }"
  >
    <template v-for="item in editorStore.data.elements" :key="item.id">
      <div class="absolute w-100px h-100px">
        {{ item.text }}
      </div>
    </template>
    <Grid />
  </div>
</template>

<style scoped>
.editor {
  position: relative;
  background: rgba(255, 255, 255, 0.13);
  box-shadow: var(--el-box-shadow);
  transform-origin: center;
}
</style>
