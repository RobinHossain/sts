import Vue from 'vue'
import App from './App.vue'
import Faker from "vue-faker";

Vue.config.productionTip = false

Vue.use(Faker);

new Vue({
  render: h => h(App),
}).$mount('#app')
