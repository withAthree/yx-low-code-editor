<script setup lang="ts">
import type { ComponentType } from '@/types/types'
import { useEditorStore } from '@/stores'
import { copyContent } from '@/utils'
import { CopyDocument } from '@element-plus/icons-vue'

const store = useEditorStore()

function onChangeId(value: string, isParent: boolean) {
  const id = store.current?.id
  const index = store.data.elements.findIndex((element: ComponentType) => element.id === value)
  if (index !== -1) {
    if (isParent) {
      store.data.elements[index].parentId = id
    }
    else {
      store.data.elements[index].childId = id
    }
  }
}

function onChangeParentId(parentId: string) {
  onChangeId(parentId, false)
}

function onChangeChildId(childId: string) {
  onChangeId(childId, true)
}

function copyCurrentId() {
  copyContent(store.current?.id)
}
</script>

<template>
  <div class="flex flex-col items-center w-full">
    <div class="text-16px color-#fff h-40px leading-40px">
      元素属性
    </div>
    <div class="p-10px w-full">
      <el-form v-if="store.current" label-width="auto">
        <el-form-item label="id">
          <div class="flex justify-between items-center w-full">
            <span>{{ store.current.id }}</span>
            <el-button type="primary" link :icon="CopyDocument" @click="copyCurrentId" />
          </div>
        </el-form-item>
        <el-form-item label="x">
          <el-input v-model.number="store.current.left" type="number" />
        </el-form-item>
        <el-form-item label="y">
          <el-input v-model.number="store.current.top" type="number" />
        </el-form-item>
        <template v-if="store.current.component !== 'line'">
          <el-form-item label="宽度">
            <el-input v-model.number="store.current.width" type="number" />
          </el-form-item>
          <el-form-item label="高度">
            <el-input v-model.number="store.current.height" type="number" />
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="store.current.text" />
          </el-form-item>
          <el-divider />
          <el-form-item label="内边距">
            <el-input v-model="store.current.style.padding" />
          </el-form-item>
          <el-form-item label="背景颜色">
            <el-color-picker v-model="store.current.style.background" />
          </el-form-item>
          <el-form-item label="圆角">
            <el-input v-model="store.current.style.borderRadius" />
          </el-form-item>
          <el-form-item label="边框">
            <el-input v-model="store.current.style.border" />
          </el-form-item>
          <el-form-item label="文字大小">
            <el-input v-model="store.current.style.fontSize" />
          </el-form-item>
          <el-form-item label="行高">
            <el-input v-model="store.current.style.lineHeight" />
          </el-form-item>
          <el-form-item label="文字颜色">
            <el-color-picker v-model="store.current.style.color" />
          </el-form-item>
        </template>
        <template v-else>
          <el-divider />
          <el-form-item label="points">
            <el-input v-model="store.current.props.linePoints" />
          </el-form-item>
          <el-form-item label="线粗">
            <el-input v-model="store.current.style.strokeWidth" />
          </el-form-item>
          <el-form-item label="颜色">
            <el-color-picker v-model="store.current.style.stroke" />
          </el-form-item>
          <el-divider />
          <el-form-item label="箭头">
            <el-switch v-model="store.current.props.showArrow" />
          </el-form-item>
          <el-form-item v-if="store.current.props.showArrow" label="X偏移">
            <el-input v-model.number="store.current.props.arrowMoveX" type="number" />
          </el-form-item>
          <el-form-item v-if="store.current.props.showArrow" label="Y偏移">
            <el-input v-model.number="store.current.props.arrowMoveY" type="number" />
          </el-form-item>
          <el-form-item v-if="store.current.props.showArrow" label="旋转">
            <el-input v-model.number="store.current.props.arrowRotate" type="number" />
          </el-form-item>
        </template>
        <el-divider />
        <el-form-item label="父id">
          <el-input v-model="store.current.parentId" @change="onChangeParentId" />
        </el-form-item>
        <el-form-item label="子id">
          <el-input v-model="store.current.childId" @change="onChangeChildId" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>

</style>
