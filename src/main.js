import {createApp, h} from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

const app = createApp({
  store: store,
  router: router,
  render: () => h(App),
})
app.mount('#app')

store.dispatch('init')
