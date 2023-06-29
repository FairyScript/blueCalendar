import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { vitePluginVersionMark } from 'vite-plugin-version-mark'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      plugins: [['@swc/plugin-emotion', {}]],
    }),
    tsconfigPaths({
      root: '.',
    }),
    vitePluginVersionMark({
      // name: 'test-app',
      // version: '0.0.1',
      // command: 'git describe --tags',
      ifGitSHA: true,
      ifShortSHA: true,
      ifMeta: true,
      ifLog: true,
      ifGlobal: true,
    }),
  ],
  server: {
    host: true,
    port: 3000,
  },
})
