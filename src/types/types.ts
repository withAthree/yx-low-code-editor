import type { DragerProps } from 'es-drager'
import type { CSSProperties, ExtractPropTypes } from 'vue'

type DragerType = Partial<ExtractPropTypes<typeof DragerProps>>

export type ComponentType = DragerType & {
  id?: string
  component: string
  text: string
  style: CSSProperties
}
