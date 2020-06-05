<template>
  <div id="app">
      <router-view />
  </div>
</template>

<style></style>

<script>
export default {
  mounted() {
    this.$store.dispatch("autoLogin"); //维持登陆
    this.$store.dispatch("getAddress"); //获取分类列表
    this.$store.dispatch("getShops"); //获取商品列表

  }
};
</script>