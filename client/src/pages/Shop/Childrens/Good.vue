 1.实现滚动
 2.实现商品列表滚动是 左侧分类滚动到对应的分类
 3.实现点击分类 商品列表滚动到对应商品

开始:1.设计当前分类下表 currentIndex === 循环的index  滚动来确定currentIndex(计算属性)
2.实现滚动事件 
---- scrollY右侧滚动y坐标  初始为0  滚动实时改变
---- tops数组存放商品列表的每个分类(li) 高度的数组 固定不变
tops[0,5,8,12]  [top,nextTop)   currentIndex=2  8-11都为2 12为3
可以得出👇
current= currentIndex===index
-1-currentIndex=tops.findIndex((top,index)=>{scrollY>=top && scrollY<top[index+1]})
来确定类名current是否选中
-2-进行滚动事件监听 scroll库的scroll和scrollEnd事件监听 实时跟新scrollY从而选中右侧类名
-3-点击左侧按钮 右侧菜单滑动到制定为位置 绑定点击事件传入index 根据点击的index 选中tops数组 进行-移动
-4-滑动右侧列表坐车需要显示在可视范围内 而不是我们手动滑下去才看的到, 我们将左侧选中的一直为最顶部显示,下面空间不够了才往下选中
--才计算currentIndex时 使用scrollToElement 滚动到目标元素 我们通过判断移动时 上一个index是否和index不同,不同就执行这个方法即可
-5-完毕接下来完成 CartControl 组件 按钮组件 为全局组件
<template >
  <div class="goods" >
    <div class="menu-wrapper" ref="left">
      <ul ref='leftUL'>
        <li class="menu-item" 
        :class="{current:currentIndex===index}" 
        @click='selectItem(index)'
        v-for="(good,index) in goods" :key="good.name">
          <span class="text bottom-border-1px">
            <img class="icon" v-if="good.icon" v-lazy="good.icon" />
          {{good.name}}
            </span
          >
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="right">
      <ul ref='rightUL'>
        <li class="food-list-hook" v-for="good in goods" :key="good.name">
          <h1 class="title">{{ good.name }}</h1>
          <ul>
            <li
              class="food-item bottom-border-1px"
              v-for="food in good.foods"
              :key="food.name"
              @click="showFood(food)"
            >
              <div class="icon">
                <img width="57" height="57" v-lazy="food.icon" />
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售{{ food.sellCount }}份</span>
                  <span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span>
                  <span class="old" v-if="food.oldPrice"
                    >￥{{ food.oldPrice }}</span
                  >
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food='food'></CartControl>
                </div>
              </div>
            </li>

          </ul>
        </li>
      </ul>
    </div>
    <ShopCart></ShopCart>
  <FoodImage ref='foodImg' :food="food"></FoodImage>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BScroll from "@better-scroll/core";
import ShopCart from "../../../components/ShopCart/ShopCart";
import FoodImage from "../../../components/FoodImage/FoodImage";

export default {
  components: {
    ShopCart,
    FoodImage
  },
  props: {},
  data() {
    return {
      scrollY: 0,
      tops: [], //所有li的高度
      food: {} //点击时的当前food
    };
  },
  created() {},
  mounted() {
    this.$store.dispatch("getGoods", () => {
      this.$nextTick(() => {
        this._initScroll(); //进行滚动初始化   这里进行对left right滚动初始化
        this._initTops(); //进行对每个食品li计算
      });
    });
  },
  update() {},
  methods: {
    // 选中li数组 初始化
    _initTops() {
      const tops = []; //li高度数组
      let top = 0; //累加的li高度
      tops.push(top);
      // Array.of()
      const lis = [...this.$refs.rightUL.children]; //伪数组来的 ...变为真数组
      lis.forEach((lis, li) => {
        top += lis.clientHeight; //获取每个li可视高度
        tops.push(top);
      });
      this.tops = tops;
    },
    // 滚动实例 初始化
    _initScroll() {
      this.leftScroll = new BScroll(this.$refs.left, {
        click: true //默认阻止了点击事件 我们将它开启
      });
      this.rightScroll = new BScroll(this.$refs.right, {
        click: true, //默认阻止了点击事件 我们将它开启
        probeType: 1 //允许开启scroll实施监听
        // 1为 非实时监听  为按住时触摸才触发  稍微节流性能好
        // 2为实时 监听滚动触摸
        // 3为实时监听滚动触摸 + 监听惯性滑动 + 编码移动
      });
      // 给rightScroll绑定scroll监听
      this.rightScroll.on("scroll", ({ x, y }) => {
        this.scrollY = Math.abs(y); //*获取右侧滚动的坐标
      });
      // 滚动结束时
      this.rightScroll.on("scrollEnd", ({ x, y }) => {
        this.scrollY = Math.abs(y);
      });
    },
    // ~左侧选中分类 右侧li滚动到指定商品列表
    selectItem(index) {
      const y = this.tops[index];
      // 立即更新scrollY 让左侧类名选中 解决延迟问题
      this.scrollY = y;
      //根据点击的index 让右侧编码滑动到指定位置 注意时 - 的
      this.rightScroll.scrollTo(0, -y, 500);
    },
    // 被点击时  显示指定food的图片预览
    showFood(food) {
      const img = this.$refs.foodImg;
      img.toggleShow(); //触发子组件的 food隐藏显示事件
      this.food = food; //传入点击的food
    }
  },
  computed: {
    ...mapState({
      goods: state => state.shop.goods
    }),
    //*currentIndex作用:右侧li滚动到指定位置时左侧选中指定样式
    // 当前分类下标
    currentIndex() {
      const { scrollY, tops } = this; //获取单前右侧滚动位置 以及 li位置数组
      // 计算得到新的下标
      const index = tops.findIndex(
        //*返回单前滚动位置 大于某一项且小于某一项的位置
        (top, index) => scrollY >= top && scrollY < tops[index + 1] //当前li滚动范围的index
      );
      // 需要判断leftScroll是否有有因为第一次数据渲染 会延迟
      if (this.leftScroll) {
        //需要初始化后才允许你滚动
        //  让左侧列表滑动到对应的li
        const li = this.$refs.leftUL.children[index]; //获得右侧列表的index,然后用其获取left li标签
        this.leftScroll.scrollToElement(li, 200); //让左侧列表滚动到li指定位置
      }
      return index; //返回右侧滚动到了哪个li的index 让左侧的类名也选中
    }
  },
  watch: {
    goods(){
      console.log(123)
    }
  }
};
</script>

<style lang="stylus"  rel="stylesheet/stylus" scoped>
@import '../../../assets/stylus/mixins';

.goods {
  display: flex;
  position: absolute;
  top: 235px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 60px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 18px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>

