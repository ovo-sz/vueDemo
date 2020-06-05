<template>
  <div class="msite_shop_list">
    <div class="shop_header">
      <i class="iconfont icon-xuanxiang"></i>
      <span class="shop_header_title">附近商家</span>
    </div>
    <div class="shop_container">
      <ul class="shop_list" v-if="shops.length > 0">
        <li
          class="shop_li border-1px"
          v-for="(item, index) in shops"
          :key="item.id + index"
        >
          <router-link to='/shop'>
            <div class="shop_left">
              <img
                class="shop_img"
                v-lazy="'https://fuss10.elemecdn.com' + item.image_path"
              />
            </div>
            <div class="shop_right">
              <section class="shop_detail_header">
                <h4 class="shop_title ellipsis">{{ item.name }}</h4>
                <ul class="shop_detail_ul">
                  <li
                    class="supports"
                    v-for="supports in item.supports"
                    :key="supports.icon_name"
                  >
                    {{ supports.icon_name }}
                  </li>
                </ul>
              </section>
              <section class="shop_rating_order">
                <section class="shop_rating_order_left">
                  <div class="star star-24">
                    <van-rate
                      icon="like"
                      void-icon="like"
                      class="star-item"
                      size="17"
                      v-model="item.rating"
                      allow-half
                      readonly
                      void-color="#eee"
                    />
                  </div>
                  <div class="rating_section">
                    {{ item.rating }}
                  </div>
                  
                  <div class="order_section">月销{{ item.rating_count }}单</div>
                </section>
                 <section class="shop_rating_order_right">
                        <span class="delivery_style delivery_right">美么专送</span>
                      </section>
                <section class="shop_distance">
                  
                  <p class="shop_delivery_msg">
                    <span>${{ item.float_minimum_order_amount }}起送</span>
                    <span class="segmentation"> / </span>
                    <span>{{ item.piecewise_agent_fee.tips }}</span>
                  </p>
                </section>
               
              </section>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
 
  

<script>
import Vue from "vue";
import { Rate } from "vant";
import { Loading } from "vant";

Vue.use(Rate);
import { mapState } from "vuex";
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.$store.dispatch("getShops");
  },
  update() {},
  methods: {},
  computed: {
       ...mapState({
        shops: state => state.msite.shops, 
      }),
  }
};
</script>

<style lang="stylus"  rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/mixins';

.msite_shop_list {
  top-border-1px(#e4e4e4);
  margin-top: 10px;
  padding-bottom: 40px;
  background: #fff;

  .shop_header {
    padding: 10px 10px 0;

    .shop_icon {
      margin-left: 5px;
      color: #999;
    }

    .shop_header_title {
      color: #999;
      font-size: 14px;
      line-height: 20px;
    }
  }

  .shop_container {
    .shop_list {
      .shop_li {
        bottom-border-1px(#f1f1f1);
        width: 100%;

        >a {
          clearFix();
          display: block;
          box-sizing: border-box;
          padding: 15px 8px;
          width: 100%;

          .shop_left {
            float: left;
            box-sizing: border-box;
            width: 23%;
            height: 75px;
            padding-right: 10px;

            .shop_img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }

          .shop_right {
            float: right;
            width: 77%;

            .shop_detail_header {
              clearFix();
              width: 100%;

              .shop_title {
                float: left;
                width: 200px;
                color: #333;
                font-size: 16px;
                font-weight: 700;

                &::before {
                  content: '品牌';
                  font-size: 12px;
                  line-height: 10px;
                  color: #333;
                  background-color: #ffd930;
                  padding: 3px 2px;
                  border-radius: 2px;
                  margin-right: 5px;
                }
              }

              .shop_detail_ul {
                float: right;
                margin-top: 3px;

                .supports {
                  float: left;
                  font-size: 10px;
                  color: #999;
                  border: 1px solid #f1f1f1;
                  padding: 0 2px;
                  border-radius: 2px;
                }
              }
            }

            .shop_rating_order {
              clearFix();
              width: 100%;
              margin-top: 18px;
              margin-bottom: 8px;

              .shop_rating_order_left {
                float: left;
                color: #ff9a0d;

                .star { // 2x图 3x图
                  float: left;
                  font-size: 0;

                  .star-item {
                    padding-bottom: 10px;
                    background-repeat: no-repeat;
                  }
                }

                .rating_section {
                  float: left;
                  font-size: 13px;
                  color: #ff6000;
                  margin-left: 4px;
                  margin-top: 2px;
                }

                .order_section {
                  float: left;
                  font-size: 13px;
                  color: #666;
                  margin-top: 2px;
                }
              }

              .shop_rating_order_right {
                float: right;
                font-size: 0;

                .delivery_style {
                  transform-origin: 35px 0;
                  transform: scale(0.7);
                  display: inline-block;
                  font-size: 15px;
                  padding: 4px;
                  border-radius: 2px;
                }

                .delivery_left {
                  color: #fff;
                  margin-right: -10px;
                  background-color: #01affd;
                  border: 1px solid #01affd;
                }

                .delivery_right {
                  color: #01affd;
                  border: 1px solid #01affd;
                }
              }
            }

            .shop_distance {
              clearFix();
              width: 100%;
              font-size: 12px;

              .shop_delivery_msg {
                float: left;
                transform-origin: 0;
                transform: scale(0.9);
                color: #666;
              }

              .segmentation {
                color: #ccc;
              }
            }
          }
        }
      }
    }
  }
}
</style>
