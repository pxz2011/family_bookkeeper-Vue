const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer:{
    port:80
  },
  publicPath: './',
  productionSourceMap: false,
  transpileDependencies: true
})
