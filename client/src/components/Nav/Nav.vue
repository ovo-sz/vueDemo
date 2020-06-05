/**
页面重点
1.读取vux的actions函数 获取分类列表
2.进行自定义回调 然后通过怕$nextTilk 获取分类列表后立马调用回调 在出发tilk 对数组进行切割
3.切割后 用一个值接受 遍历即可
 */

<template>
  <nav class="msite_nav">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <van-swipe
          style="height:185px;"
          show-indicators
          indicator-color="#01affd"
        >
          <van-swipe-item
            class="swiper-slide"
            v-for="(item, index) in categorysArr"
            :key="index"
          >
            <a
              href="javascript:"
              v-for="(v, index) in item"
              :key="index"
              class="link_to_food"
            >
              <div class="food_container">
                <img v-lazy="'https://fuss10.elemecdn.com' + v.image_url" />
              </div>
              <span>{{ v.title }}</span>
            </a>
          </van-swipe-item>
        </van-swipe>
        <div></div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
  </nav>
</template>
<script>
import Vue from "vue";
import chunk from 'lodash/chunk'
import { Swipe, SwipeItem } from "vant";
import { mapState } from "vuex";
Vue.use(Swipe).use(SwipeItem);
export default {
  components: {},
  props: {},
  data() {
    return {
      categorysArr:[]
    };
  },
  created() {},
  computed: {},
  methods: {
  },
  mounted() {
    this.$store.dispatch("getCategorys", () => {
      this.$nextTick(() => {
        this.categorysArr = chunk(this.$store.state.msite.categorys, 8);
      });
    });
  }
};
</script>

<style lang="stylus"  rel="stylesheet/stylus" scoped>
>>>.van-swipe__indicator {
  background-color: #333;
}

.msite_nav {
  bottom-border-1px(#e4e4e4);
  margin-top: 45px;
  height: 170px;
  background: #fff;

  .swiper-container {
    width: 100%;
    height: 100%;

    .swiper-wrapper {
      width: 100%;
      height: 100%;

      .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;

        .link_to_food {
          width: 25%;

          .food_container {
            display: block;
            width: 100%;
            text-align: center;
            padding-bottom: 10px;
            font-size: 0;

            img {
              display: inline-block;
              width: 50px;
              height: 50px;
            }
          }

          span {
            display: block;
            width: 100%;
            text-align: center;
            font-size: 13px;
            color: #666;
          }
        }
      }
    }

    .swiper-pagination {
      >span.swiper-pagination-bullet-active {
        background: #01affd;
      }
    }
  }
}
</style>
