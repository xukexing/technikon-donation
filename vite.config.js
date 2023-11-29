import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import px2vw from 'postcss-px-to-viewport';

import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

const resolve = (dir) => path.resolve(__dirname, dir);

export default defineConfig({
  base: '/web/dist-wx/',
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
    createSvgIconsPlugin({
      // 指定要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 执行icon name的格式
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${resolve("src/style/utils.less")}";`,
      },
    },
    postcss: {
      plugins: [
        px2vw({
          viewportWidth: 750,
          viewportUnit: 'vw',
          exclude: [/node_modules\/vant/]
        }),
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  },
  server: {
    port: 8080,
    host: "0.0.0.0",
    proxy: {
      '/api': {
        target: 'http://guykm3.natappfree.cc',
        ws: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
})
