// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';

import router from './router';
import Main from './frame/Main';

Vue.use(VueRouter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(Main),
});
