<script setup lang="ts">
import { useStageStore } from '@/stores'

const store = useStageStore()

const form = reactive({
  width: 1856,
  height: 638,
  scale: 100,
})

watch(form, (val: any) => {
  store.changeWidth(val.width)
  store.changeHeight(val.height)
  store.changeScale(val.scale)
}, {
  immediate: true,
})

watch(() => store.scale, (val) => {
  form.scale = val
})
</script>

<template>
  <div class="flex flex-col items-center w-full">
    <div class="text-16px color-#fff h-40px leading-40px">
      画布属性
    </div>
    <div class="p-10px w-full">
      <el-form :model="form" label-width="auto" class="w-full">
        <el-form-item label="宽度" prop="width">
          <el-input v-model.number="form.width" type="number" />
        </el-form-item>
        <el-form-item label="高度" prop="height">
          <el-input v-model.number="form.height" type="number" />
        </el-form-item>
        <el-form-item label="缩放" prop="scale">
          <el-input v-model.number="form.scale" type="number" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>

</style>
