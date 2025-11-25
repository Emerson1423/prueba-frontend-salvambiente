const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  
  // Asegurar que _redirects se copie a dist
  chainWebpack: config => {
    config.plugin('copy').tap(([options]) => {
      options[0].patterns.push({
        from: 'public/_redirects',
        to: '_redirects',
        toType: 'file',
      })
      return [options]
    })
  }
})