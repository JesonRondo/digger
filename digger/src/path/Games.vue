<template>
  <div class="list">
    <div class="item" v-for="game in games">
      <img class="item-img" :src="game.cover" :alt="game.name">
      <div class="item-detail">
        <p class="item-title">{{game.name}}</p>
        <p>{{game.com}}</p>
        <p>
          <span>{{game.time}}</span>
          <span>{{game.ver}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      offset: 0,
      games: [],
    };
  },
  created() {
    fetch(`/api/games?offset=${this.offset}`)
      .then(response => response.json())
      .then((res) => {
        this.games = this.games.concat(res);
        this.offset = this.offset + res.length;
      });
  },
};
</script>

<style scoped>
.list {
  margin: 10px 4px 0;
  flex-direction: column;
}
.item {
  border-left: 3px solid rgb(53, 166, 253);
  padding: 10px 8px;
  background: #fff;
  margin-bottom: 10px;
}
.item-img {
  width: 90px;
  height: 113px;
}
.item-detail {
  padding-left: 10px;
  flex: 1;
  flex-direction: column;
}
.item-title {
  padding: 4px 0;
  color: #333;
  font-size: 14px;
}
</style>
