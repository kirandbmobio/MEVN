import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import {
    routes
} from './routes';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueSession from 'vue-session';
import Axios from 'axios';

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueSession);
Vue.prototype.$http = Axios;

let router = new VueRouter({
    routes,
    mode: 'history'
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})