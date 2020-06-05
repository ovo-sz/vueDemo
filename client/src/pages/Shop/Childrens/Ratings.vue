>1.读取vuex的Ratings进行数据渲染
>2.使用子组件RatingsFilter 让它充当过滤器 且需要传入 2个数值 2个事件函数
 属性值:点击显示只有评论内容的数值 /  全部,推进,吐槽 3个分类的点击的数值
 事件值:点击分类 触发emit 然后传回给这个组件 / 点击是否只看有内容的评论 事件 emit
>3.在子组件进行操作 触发父组件的事件然后 在父组件进行判断 filterRatings 计算属性进行过滤
对 rating.filter 进行过滤 最后return  然后进行for
>4.进行滚动插件 滚动 且每次切换分类的时候 重新判断滚动高度
this.$nextTick(() => {
  this.scroll.refresh(); //重新判断滚动高度
});
<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{ info.score }}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{ info.rankRate }}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <van-rate
              icon="like"
              void-icon="like"
              class="star-item"
              size="17"
              v-model="info.serviceScore"
              allow-half
              readonly
              void-color="#eee"
            />
            <span class="score">{{ info.serviceScore }}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <van-rate
              icon="like"
              void-icon="like"
              class="star-item"
              size="17"
              v-model="info.foodScore"
              allow-half
              readonly
              void-color="#eee"
            />
            <span class="score">{{ info.foodScore }}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{ info.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>

      <Split />
      <!-- <RatingsFilter :onlyText="onlyText" :selectType="selectType" /> -->
            <!--         
        :onlyText="onlyText" //*传入是否选中显示有内容给子组件
        :selectType="selectType"//*传入默认选中的是哪个分类
        @setSelectType="setSelectType"//*监听是否点击了显示有内容按钮
        @toggleOnlyText="toggleOnlyText"//*监听是否选中了 全部 好评 差评 其中之一
         -->
      <RatingsFilter
        :onlyText="onlyText" 
        :selectType="selectType"
        @setSelectType="setSelectType"
        @toggleOnlyText="toggleOnlyText"
      />

      <div class="rating-wrapper">
        <ul>
          <li
            class="rating-item"
            v-for="(rating, index) in filterRatings"
            :key="index"
          >
            <div class="avatar">
              <img width="28" height="28" v-lazy="rating.avatar" />
            </div>
            <div class="content">
              <h1 class="name">{{ rating.username }}</h1>
              <div class="star-wrapper">
                <van-rate
                  icon="like"
                  void-icon="like"
                  class="star-item"
                  size="10"
                  v-model="rating.score"
                  allow-half
                  readonly
                  void-color="#eee"
                />
                <span class="delivery">{{
                  rating.deliveryTime ? rating.deliveryTime + "分钟送达" : ""
                }}</span>
              </div>
              <p class="text">{{ rating.text }}</p>
              <div class="recommend">
                <span
                  class="iconfont"
                  :class="rating.rateType === 0 ? 'icondianzan' : 'iconcai1'"
                ></span>
              </div>
              <div class="time">{{ rating.rateTime | date-format }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import BScroll from "@better-scroll/core";
import { Rate } from "vant";
import RatingsFilter from "./RatingsFilter.vue";

export default {
  name: "Ratings",

  data() {
    return {
      onlyText: true, // 是否只显示有内容的
      selectType: 2 // 默认为全部 2: 全部, 0: 推荐, 1: 吐槽
    };
  },

  async mounted() {
    // 绑定自定义监听
    // this.$eventBus.$on("setSelectType", this.setSelectType);
    // this.$eventBus.$on("toggleOnlyText", this.toggleOnlyText);

    if (this.ratings.length > 0) {
      // 从其它路由切换过来, 数据已经有了
      this.scroll = new BScroll(".ratings", {
        click: true
      });
    }
  },

  computed: {
    ...mapState({
      info: state => state.shop.info,
      ratings: state => state.shop.ratings
    }),

    // 过滤后的数组
    filterRatings() {
      // 取出相关数据
      const { ratings, onlyText, selectType } = this;
      // 计算产生结果数据, 并返回
      // 进行ratings的过滤
      return ratings.filter(rating => {
        const { rateType, text } = rating;
        // rateType 评论是否点赞   text 评论内容
        return (
          //是否点了全部  2 是的话 再看   是否为推荐
          (selectType === 2 || selectType === rateType) &&
          //是否为只看内容  是的话 再看 text是否有长度  
          (!onlyText || text.length > 0)
        );
      });
    }
  },

  watch: {
    ratings() {
      // 在当前路由刷新: 初始显示没有数据, 后面才有了数据
      this.$nextTick(() => {
        this.scroll = new BScroll(".ratings", {
          click: true
        });
      });
    },
    // 每次进行切换分类的时候 scroll插件重新计算高度
    selectType() {
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    }
  },

  methods: {
    //子组件点击触发  修改当前父组件点击的分类
    setSelectType(type) {
      console.log("setSelectType()", this);
      this.selectType = type;
    },
    toggleOnlyText() {
      this.onlyText = !this.onlyText;
    }
  },

  components: {
    RatingsFilter,
    [Rate.name]: Rate
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../assets/stylus/mixins';

.ratings {
  position: absolute;
  top: 250px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  background: #fff;

  .overview {
    display: flex;
    padding: 18px 0;
    .overview-left {
      flex: 0 0 137px;
      padding: 6px 0;
      width: 137px;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      text-align: center;

      @media only screen and (max-width: 320px) {
        flex: 0 0 120px;
        width: 120px;
      }

      .score {
        margin-bottom: 6px;
        line-height: 28px;
        font-size: 24px;
        color: rgb(255, 153, 0);
      }

      .title {
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: rgb(7, 17, 27);
      }

      .rank {
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }

    .overview-right {
      flex: 1;
      padding: 6px 0 6px 24px;

      @media only screen and (max-width: 320px) {
        padding-left: 6px;
      }

      .score-wrapper {
        margin-bottom: 8px;
        font-size: 0;

        .title {
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }

        .star {
          display: inline-block;
          margin: 0 12px;
          vertical-align: top;
        }

        .score {
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          font-size: 12px;
          color: rgb(255, 153, 0);
        }
      }

      .delivery-wrapper {
        font-size: 0;

        .title {
          line-height: 18px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }

        .delivery {
          margin-left: 12px;
          font-size: 12px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }

  .rating-wrapper {
    padding: 0 18px;

    .rating-item {
      display: flex;
      padding: 18px 0;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      .avatar {
        flex: 0 0 28px;
        width: 28px;
        margin-right: 12px;

        img {
          border-radius: 50%;
        }
      }

      .content {
        position: relative;
        flex: 1;

        .name {
          margin-bottom: 4px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(7, 17, 27);
        }

        .star-wrapper {
          margin-bottom: 6px;
          font-size: 0;

          .star {
            display: inline-block;
            margin-right: 6px;
            vertical-align: top;
          }

          .delivery {
            display: inline-block;
            vertical-align: top;
            line-height: 12px;
            font-size: 10px;
            padding-left 7px
            color: rgb(147, 153, 159);
          }
        }

        .text {
          margin-bottom: 8px;
          line-height: 18px;
          color: rgb(7, 17, 27);
          font-size: 12px;
        }

        .recommend {
          line-height: 16px;
          font-size: 0;

          .icondianzan, .iconcai1, .item {
            display: inline-block;
            margin: 0 8px 4px 0;
            font-size: 9px;
          }

          .icondianzan {
            color: $yellow;
          }

          .iconcai1 {
            color: rgb(147, 153, 159);
          }

          .item {
            padding: 0 6px;
            border: 1px solid rgba(7, 17, 27, 0.1);
            border-radius: 1px;
            color: rgb(147, 153, 159);
            background: #fff;
          }
        }

        .time {
          position: absolute;
          top: 0;
          right: 0;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}
</style>
