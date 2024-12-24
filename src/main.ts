import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

// Font Awesome imports
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFilm, faUser, faSignOutAlt, faSignInAlt, faTable, faList } from '@fortawesome/free-solid-svg-icons'

// Add icons to the library
library.add(faFilm, faUser, faSignOutAlt, faSignInAlt, faTable, faList)

app.use(pinia)

// Create Vue app instance and register FontAwesomeIcon globally
createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .use(store)
  .mount('#app')
