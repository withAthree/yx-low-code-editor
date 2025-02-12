<script setup lang="ts">
import type { ComponentType } from '@/types/types.ts'
import AsideLeft from '@/components/AsideLeft.vue'
import AsideRight from '@/components/AsideRight.vue'
import EditorBase from '@/components/EditorBase.vue'
import Header from '@/components/Header.vue'
import { useCommand } from '@/hooks'
import { useEditorStore } from '@/stores'
import { events, useId } from '@/utils'
import Editor from '@/views/editor/index.vue'
import * as lodash from 'lodash'

const store = useEditorStore()
const { commands } = useCommand(store)
// 定义变量
let currentComponent: ComponentType | null = null

function handleAsideDragstart(component: ComponentType) {
  events.emit('dragstart')
  // 拷贝
  currentComponent = lodash.cloneDeep(component)
}

// 物料堆拖拽结束
function handleAsideDragend() {
  events.emit('dragend')
}

function dragenter(e: DragEvent) {
  e.dataTransfer!.dropEffect = 'move'
}

function drop(e: DragEvent) {
  if (!currentComponent)
    return
  store.data.elements = [
    ...store.data.elements,
    {
      ...currentComponent,
      left: e.offsetX - currentComponent.width / 2,
      top: e.offsetY - currentComponent.height / 2,
      id: useId(),
      style: currentComponent.style || {},
    },
  ]
  // currentComponent = null
}
</script>

<template>
  <el-container class="h-100vh">
    <el-header class="header">
      <Header />
    </el-header>
    <el-container class="overflow-hidden">
      <el-aside width="239px">
        <AsideLeft @dragstart="handleAsideDragstart" @dragend="handleAsideDragend" />
      </el-aside>
      <el-main class="main">
        <el-auto-resizer>
          <template #default="{ height, width }">
            <EditorBase :height :width>
              <Editor :height :width @drop="drop" @dragenter="dragenter" @dragover.prevent />
            </EditorBase>
          </template>
        </el-auto-resizer>
      </el-main>
      <el-aside width="269px" @click.stop @keydown.stop>
        <AsideRight />
      </el-aside>
    </el-container>
  </el-container>
</template>

<style scoped>
.header{
  border-bottom: 1px solid var(--color-border); /* 使用深色主题的边框颜色 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}
.main {
  padding: 0;
  overflow: hidden;
}
</style>
