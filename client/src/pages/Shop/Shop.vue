

<template>
  <div>
    <ShopHeader></ShopHeader>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/good" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import ShopHeader from "../../components/ShopHeader/ShopHeader";
export default {
  components: {
    ShopHeader
  },
  props: {},
  data() {
    return {};
  },
  created() {},
  mounted() {
    // this.$store.dispatch('getGoods')
    this.$store.dispatch("getInfo");
    this.$store.dispatch("getRatings");
  },
  update() {},
  methods: {},
  computed: {}
};
</script>

<style lang="stylus"  rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/mixins';

.tab {
  height: 40px;
  line-height: 40px;
  background: #fff;
  bottom-border-1px(rgba(7, 17, 27, 0.1));
  display: flex;

  .tab-item {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: rgb(77, 85, 93);

    a {
      display: block;
      position: relative;

      &.active {
        color: #01affd;

        &::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 1px;
          width: 35px;
          height: 2px;
          transform: translateX(-50%);
          background: #01affd;
        }
      }
    }
  }
}
</style>
