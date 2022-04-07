import path, { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import WindiCSS from 'vite-plugin-windicss'
import { VitePWA } from 'vite-plugin-pwa'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Inspect from 'vite-plugin-inspect'
// import analyze from 'rollup-plugin-analyzer'
import visualizer from "rollup-plugin-visualizer"



const markdownWrapperClasses = 'prose prose-sm m-auto text-left'

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

  return defineConfig({
    // build: {
    //   rollupOptions: {
    //     plugins: [analyze()],
    //   },
    // },
    build: {
      target: 'modules',
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      minify: 'esbuild',
      sourcemap: false,
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'index.html'),
        },
        output: {
          // chunkFileNames: 'static/js/[name]-[hash]. JS', // chunkfilenames will be automatically split within rollup. You can use manualchunks to specify the split explicitly.
          // entryFileNames: 'static/js/[name].js',
          // assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              if (id.includes("naive-ui")) {
                return "naive-ui";
              } else if (id.includes("lodash-es")) {
                return "lodash-es";
              }

              return "vendor"; // all other package goes here
            }
          },
        },
        //Limit of chunk size warning
      }
    },
    define: {
      'process.env': {}
    },
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      visualizer({
        brotliSize: true,
        gzipSize: true
      }),
      Vue({
        include: [/\.vue$/, /\.md$/],
      }),

      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        extensions: ['vue', 'md'],
      }),

      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          // 'vue-i18n',
          '@vueuse/head',
          '@vueuse/core',
        ],
        dts: 'src/auto-imports.d.ts',
      }),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md'],

        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],

        // custom resolvers
        resolvers: [
          // auto import icons
          // https://github.com/antfu/unplugin-icons
          IconsResolver({
            componentPrefix: '',
            // enabledCollections: ['carbon']
          }),
          ElementPlusResolver(),
        ],

        dts: 'src/components.d.ts',
      }),

      // https://github.com/antfu/unplugin-icons
      Icons(),

      // https://github.com/antfu/vite-plugin-windicss
      WindiCSS({
        safelist: markdownWrapperClasses,
      }),
      // https://github.com/antfu/vite-plugin-pwa
      VitePWA({

        base: "/",
        srcDir: "src",
        registerType: 'autoUpdate',

        filename: "sw.ts",
        includeAssets: ["/favicon.png"],
        strategies: "injectManifest",
        manifest: {
          name: "LOL Wikis",
          short_name: "Test",
          theme_color: "#ffffff",
          start_url: "/",
          display: "standalone",
          background_color: "#ffffff",
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
      }),


      // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
      // VueI18n({
      //   runtimeOnly: true,
      //   compositionOnly: true,
      //   include: [path.resolve(__dirname, 'locales/**')],
      // }),

      // https://github.com/antfu/vite-plugin-inspect
      Inspect({
        // change this to enable inspect for debugging
        enabled: false,
      }),
    ],

    server: {
      fs: {
        strict: true,
      },
    },

    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        '@vueuse/core',
        '@vueuse/head',
      ],
      exclude: [
        'vue-demi',
      ],
    },

  })
}