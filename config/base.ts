import type { UserConfigExport } from '@tarojs/cli'

export const devConfig = {
  mini: {},
  h5: {}
} satisfies UserConfigExport<'vite'>

export const prodConfig = {
  mini: {},
  h5: {
    legacy: true
  }
} satisfies UserConfigExport<'vite'>
