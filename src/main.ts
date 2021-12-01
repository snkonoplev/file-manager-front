import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import PrimeVue from 'primevue/config';
import Notifications from '@kyvg/vue3-notification'
import { notify } from "@kyvg/vue3-notification";
import VueLoading from 'vue-loading-overlay';

import 'vue-loading-overlay/dist/vue-loading.css';
import 'primeflex/primeflex.min.css';
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primeicons/primeicons.css'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5000/';
axios.interceptors.request.use(function (config) {
    const token = store.getters['login/getToken'];
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    notify({ type: 'error', title: 'HTTP Request Error', text: error.message, duration: 10000 });
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    notify({ type: 'error', title: 'HTTP Response Error', text: error.message, duration: 10000 });
    return Promise.reject(error);
});

const app = createApp(App);
app
    .use(store)
    .use(router)
    .use(PrimeVue)
    .use(Notifications)
    .use(VueLoading)
    .mount('#app');