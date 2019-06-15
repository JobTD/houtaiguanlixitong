// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/reset.css'
// Vue.use(Element, { size: 'small', zIndex: 3000 });
Vue.config.productionTip = false
Vue.use(ElementUI);
import axios from 'axios'
Vue.prototype.$http = axios;
import qs from 'qs'
Vue.prototype.$qs = qs;
import Filter from './filter'
for (var i in Filter) {
    Vue.filter(i, Filter[i])
}
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})