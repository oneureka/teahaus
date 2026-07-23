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
        },
        'postcss-css-variables': {
          enable: true,
          config: {
            preserve: false,
            variables: {
              // DaisyUI standard
              'color-primary': '#57534E',
              'color-primary-content': '#FAFAF9',
              'color-secondary': '#ABAB9C',
              'color-secondary-content': '#FAFAF9',
              'color-accent': '#FFB900',
              'color-accent-content': '#292524',
              'color-neutral': '#262626',
              'color-neutral-content': '#FAFAF9',
              'color-base-100': '#FAFAF9',
              'color-base-200': '#F5F5F4',
              'color-base-300': '#E7E5E4',
              'color-base-content': '#292524',
              'color-info': '#0084D1',
              'color-info-content': '#F0F9FF',
              'color-success': '#009966',
              'color-success-content': '#ECFDF5',
              'color-warning': '#E17100',
              'color-warning-content': '#292524',
              'color-error': '#C10007',
              'color-error-content': '#FEF2F2',
              // Tailwind taupe scale (Tailwind v4 naming & values)
              'color-taupe-50': '#FAFAF9',
              'color-taupe-100': '#F5F5F4',
              'color-taupe-200': '#E7E5E4',
              'color-taupe-300': '#D6D3D1',
              'color-taupe-400': '#A8A29E',
              'color-taupe-500': '#78716C',
              'color-taupe-600': '#57534E',
              'color-taupe-700': '#44403C',
              'color-taupe-800': '#292524',
              'color-taupe-900': '#1C1917',
              'color-taupe-950': '#0C0A09',
              // Auxiliary morphological colors (Tailwind v4 naming & values)
              'color-orange': '#FF8904',
              'color-green': '#00A63E',
              'color-gold': '#d4a76a',
              'color-gray': '#D1D5DC',
              // Custom extensions (deprecated — gradually replaced by taupe / DaisyUI tokens)
              'gradient-hero':
                'linear-gradient(135deg, #404040 0%, #262626 30%, #171717 100%)',
              'gradient-button':
                'linear-gradient(135deg, #57534E 0%, #404040 100%)',
              'color-shadow-button': 'rgba(87, 83, 78, 0.3)',
              'color-shadow-card': 'rgba(0, 0, 0, 0.05)',
              'color-skeleton': '#E5E5E5',
              'gradient-badge':
                'linear-gradient(135deg, #FFFBEB 0%, #FEF3C6 100%)'
            }
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
