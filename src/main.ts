import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import VueVirtualScroller from 'vue-virtual-scroller'



const app = createApp(App)

app.use(VueVirtualScroller);
app.component('RecycleScroller', VueVirtualScroller.RecycleScroller)

app.mount('#app');