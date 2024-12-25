const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
 transpileDependencies: true,
 publicPath: process.env.NODE_ENV === 'production'
   ? '/front-demo-site-login/'
   : '/',
 devServer: {
   proxy: {
       '/api/kakao': {
           target: 'https://kapi.kakao.com',
           changeOrigin: true,
           pathRewrite: {
               '^/api/kakao': ''
           },
           headers: {
               'Access-Control-Allow-Origin': '*',
               'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
               'Access-Control-Allow-Headers': 'Content-Type, Authorization'
           }
       },
       '/api': {
           target: process.env.KAKAO_REDIRECT_URL || 'http://localhost:8080',
           changeOrigin: true,
           pathRewrite: {
               '^/api': ''
           }
       }
   },
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    }

 }
});