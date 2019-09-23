//required packages and files
import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import {routes} from './routes'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueSession from 'vue-session';
import Axios from 'axios';
import store from './store/store';
import URL from '../config/dev.env';
import toast from '../src/plugins/toast';
import DataTableFactory from 'vuejs-datatable'

//set packages globally
Vue.use(DataTableFactory)
Vue.use(toast);
Vue.use(Buefy, {
    defaultIconPack: 'fa'
});
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueSession);

Vue.config.productionTip = false;

//set default axios url
Axios.defaults.baseURL = URL.API_URL;

Vue.prototype.$http = Axios;
const token = localStorage.getItem('access_token');
  if (token) {
      Vue.prototype.$http.defaults.headers.common['Authorization'] = token
  }

//create vue-router instance
let router = new VueRouter({
    routes,
    mode: 'history'
})
router.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
          next()
          return
        }
        next('/login')
      } else {
        next()
      }
    })
//create vue instance
new Vue({
    el: '#app', //template element
    router, //for direction of page
    store, //it store state , getters , mutations and actions
    render: h => h(App) //for rendering page
})