import type { UserConfig } from '@farmfe/core'
import tsPath from 'farm-plugin-tspaths'

function defineConfig(config: UserConfig) {
  return config
}

export default defineConfig({
  plugins: [
    [
      '@farmfe/plugin-react',
      { runtime: 'automatic', importSource: '@emotion/react' },
    ],
    tsPath,
  ],
  compilation: {
    output: {
      targetEnv: 'browser',
      format: 'esm',
    },
    resolve: {
      mainFields: ['main', 'module'],
    },
    script: {
      plugins: [
        {
          name: '@swc/plugin-emotion',
          options: {},
          filters: {
            moduleTypes: ['tsx', 'jsx'],
          },
        },
      ],
    },
  },
})
