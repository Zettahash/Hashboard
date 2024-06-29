import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import timeago from 'vue-timeago3'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue'
import 'vue3-toastify/dist/index.css'; // Import the toastify CSS
import { toast } from 'vue3-toastify'; // Import the toast function

const app = createApp(App)

app.use(router)
app.use(store)
app.use(timeago)
app.use(BootstrapIconsPlugin)

// Mount the app
app.mount('#app')

store.dispatch('init').catch(error => {
  console.error('Error during store initialization:', error)
})

// Add toast to the global properties so it can be accessed anywhere
app.config.globalProperties.$toast = toast