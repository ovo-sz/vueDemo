//1.从外界接受 food 每个食品对象
//2.加和减在food对象中操作 food.count
//3.绑定事件 +- 然后在vuex的mutations处理数据 用vue.set对对象的属性进行修改
//4.再给按钮 点动画 完成
//接下来去完成 ShopCart组件 他们两要互相配合
<template>
  <div class="cartcontrol">
    <transition name="move">
      <!-- 减号 -->
      <div
        class="iconfont iconremove"
        @click.stop="updateFoodCount(false)"
        v-if="food.count > 0"
      ></div>
    </transition>
    <!-- 加号 -->
    <div class="iconfont iconjia" @click.stop="updateFoodCount(true)"></div>
    <!-- 计数 -->
    <div class="cart-count" v-if="food.count > 0">{{ food.count }}</div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    food: Object
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  update() {},
  methods: {
    updateFoodCount(isAdd) {
      //点击 + 时 isAdd为true 触发redux的 ADD_FOOD_COUNT
      console.log(this.food.description, this.food.count);
      if (isAdd) {
        this.$store.dispatch("updateFoodCount", { isAdd, food: this.food });
      }
      //点击 - 时 isAdd为false 触发redux的 REDUCE_FOOD_COUNT
      else {
        this.$store.dispatch("updateFoodCount", { isAdd, food: this.food });
      }
    }
  },
  computed: {}
};
</script>

<style lang="stylus"  rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/mixins';

.cartcontrol {
  font-size: 0;

  .cart-decrease {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }

  .iconremove {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: $green;

    &.move-enter-active, &.move-leave-active {
      transition: all 0.5s;
    }

    &.move-enter, &.move-leave-to {
      opacity: 0;
      transform: translateX(20px) rotate(180deg);
    }
  }

  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-weight: 600;
    font-size: 15px;
    color: rgb(147, 153, 159);
  }

  .iconjia {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: $green;
  }
}
</style>

