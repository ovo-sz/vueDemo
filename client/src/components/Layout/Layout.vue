<template>
  <div id="nav">
    <!-- $route.meta.showFooter 为表示显示底部导航的路由 -->
    <keep-alive>
      <footer-guide v-show="$route.meta.showFooter"></footer-guide>
      <router-view v-if="$route.meta.nokeepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.nokeepAlive" />
  </div>
</template>

<script>
import FooterGuide from "@/components/FooterGuide/FooterGuide.vue";
export default {
  name: "",
  components: {
    "footer-guide": FooterGuide
  },
  props: {},
  data() {
    return {};
  },
  mouted() {}
};
</script>

<style lang="stylus" rel='stylesheet/stylus' scoped></style>

