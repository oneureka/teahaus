import { defineConfig, type UserConfigExport } from '@tarojs/cli'
import { devConfig, prodConfig } from './base'
import { resolve } from 'path'

export default defineConfig<'vite'>(async (merge, {}) => {
  const baseConfig: UserConfigExport<'vite'> = {
    projectName: 'teahaus',
    date: '2026-3-30',
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: ['@tarojs/plugin-generator'],
    defineConstants: {},
    alias: {
      '@': resolve(__dirname, '../src'),
      '@/assets': resolve(__dirname, '../src/assets'),
      '@/components': resolve(__dirname, '../src/components'),
      '@/stores': resolve(__dirname, '../src/stores'),
      '@/datasets': resolve(__dirname, '../src/datasets'),
      '@/constants': resolve(__dirname, '../src/constants')
    },
    copy: {
      patterns: [],
      options: {}
    },
    framework: 'vue3',
    compiler: 'vite',
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false,
          config: {
            namingPattern: 'module',
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css'
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false,
          config: {
            namingPattern: 'module',
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    }
  }

  process.env.BROWSERSLIST_ENV = process.env.NODE_ENV

  if (process.env.NODE_ENV === 'development') {
    return merge({}, baseConfig, devConfig)
  }
  return merge({}, baseConfig, prodConfig)
})
