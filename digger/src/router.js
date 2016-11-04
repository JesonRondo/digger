import VueRouter from 'vue-router';

import Home from './path/Home';
import Games from './path/Games';

export default new VueRouter({
  base: '/',
  routes: [
    { path: '/', component: Home },
    { path: '/games', component: Games },
  ],
});
