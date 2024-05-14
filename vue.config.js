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
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "path": require.resolve("path-browserify")
      }
    }
  }
})

// eslint-disable-next-line no-unused-vars
const {gitDescribe, gitDescribeSync} = require('git-describe');
process.env.VUE_APP_GIT_HASH = gitDescribeSync().raw
