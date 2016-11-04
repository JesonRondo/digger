<template>
  <div class="header-bar">
    <div class="sp-top">
      <div class="left">
        <router-link to="/games" class="item iconfont icon-list"></router-link>
      </div>
      <div class="right">
        <div class="item iconfont icon-search"></div>
        <router-link to="/" class="item iconfont icon-boxlist"></router-link>
      </div>
    </div>
    <div class="sp-bottom">
      <div class="title">{{title}}</div>
      <div class="sub-title">{{subTitle}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    subTitle: String,
  },
};
</script>

<style scoped>
.header-bar {
  flex-direction: column;
  background: #fff;
}
.item {
  width: 42px;
  height: 42px;
  font-size: 24px;
  justify-content: center;
  align-items: center;
}
.sp-top {
  justify-content: space-between;
}
.sp-bottom {
  padding: 12px;
  justify-content: space-between;
  align-items: center;
}
.title {
  font-size: 24px;
}
.sub-title {
  font-size: 12px;
}
.sub-title, .title {
  color: rgb(239, 60, 41)
}
</style>
