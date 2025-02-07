let uid = 1

export function useId(prefix = 'yx') {
  return `${prefix}-${Date.now()}-${uid++}`
}
