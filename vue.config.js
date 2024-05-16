const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    https: false,
  },
  transpileDependencies: true,

})

// eslint-disable-next-line no-unused-vars
const {gitDescribe, gitDescribeSync} = require('git-describe');
import.meta.env.VITE_GIT_HASH = gitDescribeSync().raw
