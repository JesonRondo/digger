<template>
  <div id="app">
    <header-bar :title="title" :subTitle="subTitle"></header-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderBar from '../components/HeaderBar';

export default {
  components: {
    HeaderBar,
  },
  data() {
    return {
      title: 'Games',
      subTitle: 'Total 218',
    };
  },
};
</script>

<style>
#app {
  flex-direction: column;
}
</style>
