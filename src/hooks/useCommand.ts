import type { EditorState } from '@/types/types.ts'
import { events } from '@/utils'
import * as lodash from 'lodash'
import { onUnmounted } from 'vue'

interface QueueType {
  redo?: Function
  undo?: Function
}

interface CommandType {
  name: string
  keyboard?: string
  pushQueue?: boolean
  init?: Function
  execute: (...args: any[]) => QueueType
}

export interface CommandStateType {
  current: number
  // queue: QueueType[]
  commands: { [key in string]: any }
  commandArray: CommandType[]
  destroyArray: any[]
}

export function useCommand(store: EditorState) {
  const state: CommandStateType = {
    current: -1, // 当前操作的指针
    commands: [],
    commandArray: [],
    destroyArray: [],
  }

  const registry = (command: CommandType) => {
    state.commandArray.push(command)
    state.commands[command.name] = (...args: any[]) => {
      const { redo, undo } = command.execute(...args)
    }
  }

  registry({
    name: 'drag',
    init() {
      const dragstart = () => {
        (this as any).before = lodash.cloneDeep(store.data.elements)
      }
      const dragend = () => state.commands.drag()
      events.on('dragstart', dragstart)
      events.on('dragend', dragend)
      return () => {
        events.off('dragstart', dragstart)
        events.off('dragend', dragend)
      }
    },
    execute() {
      const before = (this as any).before
      const after = store.data.elements
      return {
        redo() {
          store.data = { ...store.data, elements: after }
        },
        undo() {
          store.data = { ...store.data, elements: before }
        },
      }
    },
  })

  state.commandArray.forEach((command) => {
    if (command.init) {
      const destroyFunc = command.init()
      state.destroyArray.push(destroyFunc)
    }
  })

  onUnmounted(() => {
    state.destroyArray.forEach((destroyFunc) => {
      if (destroyFunc) {
        destroyFunc()
      }
    })
  })

  return state
}
