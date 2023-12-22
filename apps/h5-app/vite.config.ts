/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-macros', 'babel-plugin-styled-components']
      }
    }),
    // https://github.com/vbenjs/vite-plugin-mock
    viteMockServe({
      localEnabled: true,
      mockPath: 'mock'
    }),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      eslintrc: {
        enabled: true
      },
      // targets to transform
      include: [
        /\.[tj]sx?$/ // .ts, .tsx, .js, .jsx
      ],
      imports: [
        'ahooks',
        'react',
        'react-router',
        'react-router-dom',
        // custom
        {
          zustand: [
            'create' // import { create } from 'zustand'
          ],
          'zustand/shallow': ['shallow'],
          axios: [
            'AxiosRequestConfig',
            'AxiosResponse',
            // default imports
            ['default', 'axios'] // import { default as axios } from 'axios',
          ],
          immer: [
            'enableMapSet',
            'produce',
            'useImmer',
            'castImmutable',
            'original',
            'current',
            'immerable'
          ],
          'react-i18next': ['useTranslation'],
          'fp-ts/Either': [
            ['default', 'E'],
            'Either',
            'right',
            'left',
            'isLeft',
            'isRight'
          ],
          'fp-ts/function': ['pipe']
        }
      ],
      dts: './types/auto-imports.d.ts',
      dirs: ['src/utils', 'src/stores', 'src/api']
    })
    // // 按需加载
    // demandImport({
    //   lib: 'antd-mobile',
    //   resolver: {
    //     js({ name }) {
    //       return `antd-mobile/es/components/${name}`
    //     }
    //   }
    // }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
