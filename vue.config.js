const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  
  // Asegurar que _redirects se copie a dist
  chainWebpack: config => {
    config.plugin('copy').tap(args => {
      // Verificar si args[0] existe y tiene patterns
      if (args[0] && args[0].patterns) {
        args[0].patterns.push({
          from: 'public/_redirects',
          to: '_redirects',
          toType: 'file',
        })
      } else {
        // Si no existe, crear la estructura
        args[0] = {
          patterns: [
            {
              from: 'public/_redirects',
              to: '_redirects',
              toType: 'file',
            }
          ]
        }
      }
      return args
    })
  }
})