import { ref, onUnmounted } from 'vue'
import Taro from '@tarojs/taro'

interface MockSubmitOptions {
  loadingText?: string
  successText?: string
  delay?: number
}

export function useMockSubmit(options: MockSubmitOptions = {}) {
  const submitting = ref(false)

  const submit = async (task?: () => void | Promise<void>) => {
    if (submitting.value) return
    submitting.value = true
    Taro.showLoading({ title: options.loadingText ?? '提交中...' })

    await new Promise<void>((resolve) => {
      setTimeout(resolve, options.delay ?? 1000)
    })

    try {
      await task?.()
    } finally {
      Taro.hideLoading()
      Taro.showToast({
        title: options.successText ?? '提交成功',
        icon: 'success'
      })
      submitting.value = false
    }
  }

  return { submitting, submit }
}

interface PullRefreshOptions {
  delay?: number
}

export function usePullRefresh(
  task?: () => void | Promise<void>,
  options: PullRefreshOptions = {}
) {
  let timer: ReturnType<typeof setTimeout> | null = null

  onUnmounted(() => {
    if (timer) clearTimeout(timer)
  })

  return () => {
    if (timer) clearTimeout(timer)
    const run = async () => {
      try {
        await task?.()
      } finally {
        Taro.stopPullDownRefresh()
      }
    }
    timer = setTimeout(run, options.delay ?? 1500)
  }
}
