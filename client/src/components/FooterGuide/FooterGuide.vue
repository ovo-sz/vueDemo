<template>
  <div class="footer_guide border-1px">
    <router-link tag="li" class="guide_item" to="/home">
      <span class="item_icon">
        <i class="iconfont iconmei"> </i>
      </span>
      <span>外卖</span>
    </router-link>
    <router-link tag="li" class="guide_item" to="/search">
      <span class="item_icon">
        <i class="iconfont iconsearch"> </i>
      </span>
      <span>搜索</span></router-link
    >

    <router-link tag="li" class="guide_item" to="/order">
      <span class="item_icon">
        <i class="iconfont iconwode"> </i>
      </span>
      <span>订单</span>
    </router-link>
    <router-link tag="li" class="guide_item" to="/profile">
      <span class="item_icon">
        <i class="iconfont icondingdan"> </i>
      </span>
      <span>我的</span></router-link
    >
  </div>
</template>


<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  update() {},
  methods: {},
  computed: {}
};
</script>

<style lang="stylus"  rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/mixins.styl';

.footer_guide { // footer
  top-border-1px(#e4e4e4); // 使用混合 引入混合
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  height: 50px;
  display: flex;

  .guide_item {
    display: flex;
    flex: 1;
    text-align: center;
    flex-direction: column;
    align-items: center;
    margin: 5px;
    color: #999999;
    border: none;

    &.active {
      color: #01affd;
    }

    span {
      font-size: 12px;
      margin-top: 2px;
      margin-bottom: 2px;

      .iconfont {
        font-size: 22px;
      }
    }
  }
}
</style>
