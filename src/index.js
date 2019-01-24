import Vue from 'vue';

import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from "bootstrap-vue"
// import VueRouter from 'vue-router'

//CSS
import 'normalize.css/normalize.css'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-vue/dist/bootstrap-vue.css"

import '../assets/scss/app.scss'

import Vuelidate from 'vuelidate'

import * as Vuetable from 'vuetable-2'

import VueSweetalert2 from 'vue-sweetalert2';

import { i18n } from './plugins/i18n';

Vue.use(VueSweetalert2);

Vue.use(Vuetable)

Vue.use(Vuelidate);

Vue.use(BootstrapVue);

import { clickOutside } from './directives';

new Vue({
    el: '#app',
    i18n,
    router,
    store,
    render: h => h(App)
});