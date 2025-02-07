<script setup lang="ts">
import { useStageStore } from '@/stores'

const props = defineProps<{
  width: number
  height: number
}>()

const store = useStageStore()

// 定义变量
const baseSize = 999999
let isDragging = false
let startX = 0
let startY = 0
const stageBaseRef = ref<HTMLElement>(null)
const left = ref(0)
const top = ref(0)

watch([() => props.width, () => props.height], ([width, height]) => {
  left.value = -(baseSize - width) / 2
  top.value = -(baseSize - height) / 2
})

function onMouseDown(event: MouseEvent) {
  if (event.button !== 1)
    return
  isDragging = true
  startX = event.clientX
  startY = event.clientY
}

function onMouseMove(event: MouseEvent) {
  if (!isDragging)
    return
  event.stopPropagation() // 防止事件冒泡
  const dx = event.clientX - startX
  const dy = event.clientY - startY
  startX = event.clientX
  startY = event.clientY
  // 更新位置
  left.value += dx
  top.value += dy
}

function onMouseUp() {
  isDragging = false
}

function onMouseWheel(event: WheelEvent) {
  if (event.ctrlKey) { // 检查是否按下了 Ctrl 键
    event.preventDefault() // 阻止默认滚动行为
    // 更新舞台的缩放
    store.changeScale(event.deltaY < 0 ? store.scale + 1 : store.scale - 1)
  }
}
</script>

<template>
  <div class="relative">
    <div
      ref="stageBaseRef"
      class="base absolute"
      :style="{
        width: `${baseSize}px`,
        height: `${baseSize}px`,
        left: `${left}px`,
        top: `${top}px`,
      }"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mousewheel="onMouseWheel"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.base {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(32  33  36 / 100%);
  cursor: grab;
}

.base:active {
  cursor: grabbing;
}
</style>
