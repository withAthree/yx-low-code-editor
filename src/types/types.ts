import type { DragerProps } from 'es-drager'
import type { CSSProperties, ExtractPropTypes } from 'vue'

type DragerType = Partial<ExtractPropTypes<typeof DragerProps>>

export type ComponentType = DragerType & {
  id?: string
  component: string
  text: string
  parent_id?: string
  children_id?: string
  status?: string
  width: number
  height: number
  style: CSSProperties
}

export interface EditorDataType {
  // container: {
  //   snapToGrid: boolean
  //   markline: {
  //     color?: string
  //     show?: boolean
  //   }
  //   gridSize: number
  //   gridColor?: string
  //   style: CSSProperties
  //   scaleRatio?: number
  // }
  elements: ComponentType[]
}

export interface EditorState {
  data: EditorDataType
  current: ComponentType
  preview: boolean
}
