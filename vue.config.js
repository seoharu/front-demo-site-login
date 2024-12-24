const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
 transpileDependencies: true,
 publicPath: process.env.NODE_ENV === 'production'
   ? '/front-demo-site-login/'
   : '/',
 devServer: {
   proxy: {
     '/api': {
       target: process.env.KAKAO_REDIRECT_URL,
       changeOrigin: true,
       pathRewrite: {
         '^/api': ''
       }
     }
   }
 }
});