let uid = 1

export function useId(prefix = 'yx') {
  return `${prefix}-${Date.now()}-${uid++}`
}

export async function copyContent(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  }
  catch (err) {
    console.error('Failed to copy: ', err)
  }
}
