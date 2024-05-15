const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    https: false,
  },
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        "fs":false,
        "crypto": require.resolve("crypto-browserify"), 
        "stream": require.resolve("stream-browserify"), 
        "assert": require.resolve("assert"), 
        "http": require.resolve("stream-http"), 
        "https": require.resolve("https-browserify"), 
        "os": require.resolve("os-browserify"), 
        "qs": require.resolve("qs"), 
        "url": require.resolve("url"),
        "path": require.resolve("path-browserify")
      }
    }
  },
})

// eslint-disable-next-line no-unused-vars
const {gitDescribe, gitDescribeSync} = require('git-describe');
import.meta.env.VITE_GIT_HASH = gitDescribeSync().raw
