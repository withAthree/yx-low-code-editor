<script setup>
const editorRef = ref(null)
</script>

<template>
  <div ref="editorRef" class="editor">
    Editor
  </div>
</template>

<style scoped>
.editor {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  box-shadow: var(--el-box-shadow);
}
</style>
