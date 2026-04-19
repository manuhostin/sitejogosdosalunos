import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { mockApiPlugin } from './mock-api.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  const defaultApiTarget = mode === 'development'
    ? 'http://localhost:8000'
    : 'https://sitejumperbd.onrender.com'
  const apiTarget = env.VITE_API_TARGET || defaultApiTarget
  const useMock = env.VITE_USE_MOCK === 'true'

  return {
    plugins: [
      vue(),
      vueDevTools(),
      ...(useMock ? [mockApiPlugin()] : []),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
})
