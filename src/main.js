import {createApp, h} from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import timeago from 'vue-timeago3'
import { BootstrapIconsPlugin } from "bootstrap-icons-vue";


const app = createApp({
  render: () => h(App),
})
app.use(store)
app.use(router)
app.use(timeago)
app.use(BootstrapIconsPlugin)
app.mount('#app')

store.dispatch('init')
