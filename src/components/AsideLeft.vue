<script setup>
import { registerConfig } from '@/config/materials-config.ts'

console.log(registerConfig)
</script>

<template>
  <div class="container">
    <div v-for="item in registerConfig.componentList" :key="item.text" class="es-block" draggable="true">
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
