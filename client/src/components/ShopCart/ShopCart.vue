>1. +符号进行对food的添加时,将添加的食品放入 state的cartFoods[]数组中 在mutatios操作
>2.入state的cartFoods[] 时 只存入一个food对象 在进行+事件时 从0->1时 将food存入cartFoods[]中,1->2  2->3 都是同一个对象 我们都不重新获取对象 所以放在 +时才进行push数组
>3.在进行-时 判断count是否为0 如果为0 就将count属性从 food对象移除 且 也从 cartFoods[] 移除它
>4.进行对类名的动态切换
>5.处理购物车列表显示与隐藏
>6.让购物车列表进行滚动  
>>>>>>>>>7.使用滚动插件时切记 相关元素只能用 v-show 不能用v-if 否则可能会失效因为插件类名的关系
>8.进行购物车的清空 调用dispatch/commit 清空cartFoods

<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShow()">
          <div class="logo-wrapper">
            <div class="logo" :class="{ highlight: totalCount > 0 }">
              <i
                class="iconfont iconShoppingcartfinancebusiness "
                :class="{ highlight: totalCount > 0 }"
              ></i>
            </div>
            <div class="num" v-if="totalCount > 0">{{ totalCount }}</div>
          </div>
          <div class="price" :class="{ highlight: totalCount > 0 }">
            ￥{{ totalPrice }}
          </div>
          <div class="desc">另需配送费￥{{ info.deliveryPrice }}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">{{ payText }}</div>
        </div>
      </div>
      <transition name="move">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clear">清空</span>
          </div>
          <div class="list-content" ref="foods">
            <ul>
              <li class="food" v-for="food in cartFoods" :key="food.name">
                <span class="name">{{ food.name }}</span>
                <div class="price">
                  <span>￥{{ food.price }}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food"></CartControl>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <!-- list-mask理解为一个蒙层 点击弹出菜单列表 -->
      <div class="list-mask" v-show="listShow" @click="isShow = !isShow"></div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { Dialog } from "vant";
import BScroll from "@better-scroll/core";

export default {
  components: {
    [Dialog.name]: Dialog
  },
  props: {},
  data() {
    return {
      isShow: false //是否显示 已点外卖列表
    };
  },
  created() {},
  mounted() {},
  update() {},
  methods: {
    toggleShow() {
      // 只有当总数量>0才取反 为了避免bug
      if (this.totalCount > 0) {
        this.isShow = !this.isShow;
      }
    },
    clear() {
      Dialog.confirm({
        title: "提示",
        message: "确认清空购物车吗?"
      }).then(() => {
        // 试一下不用actions
        this.$store.commit("clear_cart");
      });
    }
  },
  computed: {
    ...mapState({
      cartFoods: state => state.shop.cartFoods,
      info: state => state.shop.info //商家信息
    }),
    ...mapGetters(["totalCount", "totalPrice"]),
    payClass() {
      //显示 背景颜色切换 达到起送为 绿色 否则 为 灰色
      const { totalPrice, info } = this; //总价格
      const { minPrice } = info; //最低起送
      if (minPrice && totalPrice) {
        //避免刷新时undefined 然后选错类名
        return minPrice > totalPrice ? "no-enough" : "enough";
      } else {
        return "no-enough";
      }
    },
    payText() {
      //显示 还差多少起送 达到起送 变为结算 按钮
      const { totalPrice, info } = this; //总价格
      const { minPrice } = info; //最低起送
      if (totalPrice === 0) {
        if (minPrice) {
          //避免刷新时undefined
          return `还差￥${minPrice}元起送`;
        }
        return `还差￥20元起送`;
      } else if (minPrice > totalPrice) {
        return `还差￥${minPrice - totalPrice}元起送`;
      } else {
        return "去结算";
      }
    },
    listShow() {
      //购物车列表 隐藏触发条件
      if (this.totalCount === 0) {
        //总数量为0时 隐藏
        // 也就是 最后一件商品你去掉之后就会隐藏
        // 且需要watch 监听cartFoods 长度为0也进行隐藏
        return false;
      }
      // 在显示购物车列表才实例化滚动
      this.$nextTick(() => {
        let self = this;
        if (this.isShow) {
          //且购物车时显示状态才进行实例化
          //只调用一次 避免多次调用
          if (!this.scroll) {
            self.scroll = new BScroll(this.$refs.foods, {
              click: true //默认阻止了点击事件 我们将它开启
            });
          } else {
            this.scroll.refresh(); //*刷新滚动对象刷新 重新计算是否需要滑动
          }
        }
      });
      return this.isShow;
    }
  },
  watch: {
    cartFoods() {
      // 当商品列表长度为0时 进行隐藏
      if (this.cartFoods.length === 0) {
        this.isShow = false;
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/mixins';

.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;

  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);

    .content-left {
      flex: 1;

      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;

        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;

          &.highlight {
            background: $green;
          }

          .iconShoppingcartfinancebusiness {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;

            &.highlight {
              color: #fff;
            }
          }
        }

        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #ffffff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }

      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 16px;
        font-weight: 700;

        &.highlight {
          color: #fff;
        }
      }

      .desc {
        display: inline-block;
        vertical-align: top;
        margin: 12px 0 0 12px;
        line-height: 24px;
        font-size: 10px;
      }
    }

    .content-right {
      flex: 0 0 105px;
      width: 105px;

      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;

        &.not-enough {
          background: #2b333b;
        }

        &.enough {
          background: #01affd;
          color: #fff;
        }
      }
    }
  }

  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translateY(-100%);

    &.move-enter-active, &.move-leave-active {
      transition: all 0.5s;
    }

    &.move-enter, &.move-leave-to {
      transition: all 0.5s;
      opacity: 0;
      transform: translateY(0);
    }

    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);

      .title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }

      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
      }
    }

    .list-content {
      padding: 0 18px;
      max-height: 217px;
      overflow: hidden;
      background: #fff;

      .food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        bottom-border-1px(rgba(7, 17, 27, 0.1));

        .name {
          line-height: 24px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 6px;
        }
      }
    }
  }
}

.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  backdrop-filter: blur(10px);
  opacity: 1;
  background: rgba(7, 17, 27, 0.6);

  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.5s;
  }

  &.fade-enter, &.fade-leave-to {
    opacity: 0;
  }
}
</style>
