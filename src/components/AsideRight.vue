<script setup lang="ts">
import StageStyle from '@/components/StageStyle.vue'
import { useEditorStore } from '@/stores'

const store = useEditorStore()
</script>

<template>
  <div>
    <StageStyle v-if="!store.current" />
  </div>
</template>

<style scoped>

</style>
