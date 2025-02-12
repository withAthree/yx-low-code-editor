<script setup lang="ts">
import type { CSSProperties } from 'vue'

const props = defineProps<{
  linePoints: string
  showArrow: boolean
  arrowMoveX: number
  arrowMoveY: number
  arrowRotate: number
  style: CSSProperties
}>()

const width = computed(() => {
  const arr = props.linePoints.split(',')
  return arr.reduce((prev, curr) => {
    const width = +curr.split(' ')[0]
    return Math.max(width, prev)
  }, Number.MIN_SAFE_INTEGER)
})
</script>

<template>
  <div :style="{ width: `${width}px`, height: 0 }">
    <svg xmlns="http://www.w3.org/2000/svg" style="overflow: visible">
      <polyline
        :points="props.linePoints"
        :style="{
          stroke: props.style.stroke,
          strokeWidth: props.style.strokeWidth,
        }"
        fill="none"
      />
      <path
        v-if="props.showArrow"
        :fill="props.style.stroke"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M 4,-3,-0.5,0,4,3 Z"
        :transform="`translate(${props.arrowMoveX} ${props.arrowMoveY}) rotate(${props.arrowRotate})`"
      />
    </svg>
  </div>
</template>

<style scoped>

</style>
