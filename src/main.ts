import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';

import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primeicons/primeicons.css'

const app = createApp(App);

app.use(store).use(router).use(PrimeVue).mount('#app')
app.component('Dialog', Dialog);