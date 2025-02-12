<script setup lang="ts">
import type { ComponentType } from '@/types/types'
import { useEditorStore } from '@/stores'
import * as lodash from 'lodash'

const store = useEditorStore()

function processData() {
  const cloneData = lodash.cloneDeep(store.data)
  cloneData.elements = cloneData.elements.map((item: ComponentType) => {
    const newData: any = lodash.pick(item, ['childId', 'parentId', 'componentType', 'height', 'width', 'id', 'left', 'top', 'text', 'style', 'props'])
    newData.style = {
      ...newData.style,
      width: newData.width,
      height: newData.height,
      left: newData.left,
      top: newData.top,
    }
    // 处理边框圆角
    if (newData.style.borderRadius) {
      const arr = newData.style.borderRadius.split(' ')
      newData.style.borderRadius = arr.map((item: string) => Number(item.replace('px', '')))
    }
    if (newData.style.stroke) {
      newData.style.color = newData.style.stroke
      delete newData.style.stroke
    }
    delete newData.width
    delete newData.height
    delete newData.left
    delete newData.top
    // 加type
    newData.type = newData.componentType
    delete newData.componentType
    // 加status
    newData.status = 'OFF_LINE'
    // 加child_id
    newData.child_id = newData.childId
    delete newData.childId
    // 加parent_id
    newData.parent_id = newData.parentId
    delete newData.parentId

    // 处理线
    if (newData.props) {
      newData.line_points = newData.props.linePoints
      newData.arrow_transform = `translate(${newData.props.arrowMoveX} ${newData.props.arrowMoveY}) rotate(${newData.props.arrowRotate})`
      delete newData.props
    }
    return newData
  })
  return cloneData
}

function exportJson() {
  const data = processData()
  const jsonData = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonData], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'config.json'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <el-button @click="exportJson">
      导出
    </el-button>
  </div>
</template>

<style scoped>

</style>
