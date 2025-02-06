<script setup>
import AsideLeft from '@/components/AsideLeft.vue'
import AsideRight from '@/components/AsideRight.vue'
import Header from '@/components/Header.vue'
import Editor from '@/views/editor/index.vue'
</script>

<template>
  <el-container class="h-100vh">
    <el-header class="header">
      <Header />
    </el-header>
    <el-container>
      <el-aside width="239px">
        <AsideLeft />
      </el-aside>
      <el-main class="main">
        <Editor />
      </el-main>
      <el-aside width="269px">
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
  background: rgb(32  33  36 / 100%);
}
</style>
