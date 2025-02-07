<script setup lang="ts">
import type { ComponentType } from '@/types/types.ts'
import { registerConfig } from '@/config/materials-config.ts'

const emit = defineEmits(['dragstart', 'dragend'])

function dragstart(e: DragEvent, component: ComponentType) {
  emit('dragstart', component)
}

function dragend() {
  emit('dragend')
}
</script>

<template>
  <div class="container">
    <div v-for="item in registerConfig.componentList" :key="item.text" class="es-block" draggable="true" @dragstart="dragstart($event, item)" @dragend="dragend">
      <span>{{ item.text }}</span>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 8px 12px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow-y: auto;
  max-height: calc(100vh - 50px);
}

.es-block {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45%;
  height: 40px;
  border: 1px solid var(--color-border);
  margin-bottom: 10px;
  cursor: grab;
  background-color: var(--el-bg-color);
}
</style>
