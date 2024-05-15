import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import timeago from 'vue-timeago3'
import { BootstrapIconsPlugin } from "bootstrap-icons-vue";
const app = createApp(App)

app.use(router)
app.use(store)
app.use(timeago)
app.use(BootstrapIconsPlugin)
app.mount('#app')

store.dispatch('init')
