import VueRouter from 'vue-router';
import Home from './path/Home';

export default new VueRouter({
  base: '/',
  routes: [
    { path: '/', component: Home },
  ],
});
