import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { createPinia } from 'pinia';


// Kakao SDK 초기화
if (typeof window.Kakao !== 'undefined') {
  const kakao = window.Kakao;
  if (!kakao.isInitialized()) {
    const kakaoKey = process.env.VUE_APP_KAKAO_CLIENT_ID;
    if (kakaoKey) {
      kakao.init(kakaoKey);
      console.log('Kakao SDK initialized:', kakao.isInitialized());
    } else {
      console.error('Kakao JavaScript Key is not provided in the environment variables.');
    }
  }
}

// Create Vue app instance
const app = createApp(App);

// Register plugins and components
app.use(router);
app.use(store);
app.use(createPinia());

// Mount the app
app.mount('#app');
