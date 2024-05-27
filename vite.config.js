/* eslint-disable no-undef */
import { defineConfig } from "vite";
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue' // vue 3
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import path from 'path'
import git from 'git-rev-sync'
 // https://vitejs.dev/config/
 export default defineConfig({
   plugins: [
    vue(),
    nodePolyfills(),
   ],
   resolve: {
     alias: {
       '@': fileURLToPath(new URL('./src', import.meta.url)),
       jsbi: path.resolve(__dirname, "./node_modules/jsbi/dist/jsbi-cjs.js"),
       "~@fontsource/inter": "@fontsource/inter",
       "~@fontsource/ibm-plex-mono": "@fontsource/ibm-plex-mono",
     },
   },
   build: {
    commonjsOptions: {
       esmExternals: true,
       transformMixedEsModules: true,
    },
    optimizeDeps: {
      include: ['snapshot'], // Specify dependencies to include in the optimized bundle
      // exclude: ['vue'], // Specify dependencies to exclude from optimization
    },
  

  },
 });

process.env.VITE_GIT_HASH = git.tag()
