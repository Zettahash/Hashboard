import {createApp, h} from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import timeago from 'vue-timeago3'


const app = createApp({
  // store: store,
  // router: router,
  render: () => h(App),
})
app.use(store)
app.use(router)
app.use(timeago)
app.mount('#app')

store.dispatch('init')
