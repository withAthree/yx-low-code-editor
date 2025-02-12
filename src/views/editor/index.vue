<script setup lang="ts">
import type { ComponentType } from '@/types/types.ts'
import type { DragData } from 'es-drager'
import Grid from '@/components/Grid.vue'
import LineComponent from '@/components/LineComponent.vue'
import { useEditorStore, useStageStore } from '@/stores'
import { events } from '@/utils'
import Drager from 'es-drager'
import * as lodash from 'lodash'
import 'es-drager/lib/style.css'

const props = defineProps<{
  width: number
  height: number
}>()

const store = useStageStore()
const editorStore = useEditorStore()

const editorRef = ref(null)
const scale = ref(100)

// 当前元素
const current = computed<ComponentType>({
  get: () => editorStore.current,
  set: (val: ComponentType) => {
    editorStore.current = val
  },
})

watch([() => props.width, () => props.height], ([width, height]: [number, number]) => {
  const scaleWidth = width / store.width
  const scaleHeight = height / store.height
  scale.value = Number(Math.min(scaleWidth, scaleHeight).toFixed(2))
  store.changeScale(scale.value * 100)
})

watch(() => store.scale, (val: number) => {
  scale.value = val / 100
})

function onDragStart(element: ComponentType) {
  // 将上一次移动元素变为非选
  events.emit('dragstart')
}

function onDragend() {
  events.emit('dragend')
}

function onChange(dragData: DragData, item: ComponentType) {
  Object.keys(dragData).forEach((key) => {
    (item as any)[key] = dragData[key as keyof DragData]
  })
}

function onfocus(item: ComponentType) {
  current.value = item
  editorStore.data.elements.forEach(item => (item.selected = false))
  item.selected = true
}

function onblur(item: ComponentType) {
  item.selected = false
}

function onkeydown(event: KeyboardEvent) {
  if ((event.key === 'Backspace' || event.key === 'Delete') && current.value) {
    const index = editorStore.data.elements.findIndex(item => item.id === current.value?.id)
    editorStore.data.elements.splice(index, 1)
    current.value = null
  }
}

onMounted(() => {
  window.addEventListener('keydown', onkeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onkeydown)
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
      <Drager
        v-bind="lodash.omit(item, ['style', 'props'])"
        :scale-ratio="scale"
        :markline="true"
        snap
        :resizable="item.component !== 'line'"
        @drag-start="onDragStart(item)"
        @dragend="onDragend"
        @change="onChange($event, item)"
        @focus="onfocus(item)"
        @blur="onblur(item)"
        @mousedown.stop
        @click.stop
      >
        <component
          :is="item.component === 'line' ? LineComponent : item.component"
          v-bind="item.props"
          :style="{
            ...item.style,
            width: '100%',
            height: '100%',
          }"
        >
          <div class="w-full text-wrap" style="border:1px solid red">
            {{ item.text }}
          </div>
        </component>
      </Drager>
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
