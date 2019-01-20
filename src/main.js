import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.filter('lowerCase', (value => value.toLowerCase()));

new Vue({
  render: h => h(App),
}).$mount('#app')

// // Runtime + Compiler
// const vm = new Vue({
//   template: '<App/>',
//   components: { App }
// });

// if (document.getElementById('app')) {
//   vm.$mount('#app');
// }
