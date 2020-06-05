<template>
  <section class="profile">
    <header class="header">
      <a class="header_title">
        <span class="header_title_text">我的</span>
      </a>
    </header>
    <section class="profile-number">
      <router-link
        tag="a"
        :to="{}"
        replace
        class="profile-link"
      >
        <div class="profile_image">
          <i class="iconfont icontouxiang"></i>
        </div>
        <div class="user-info">
          <p v-if="!user.phone" class="user-info-top">
            {{ user.name ? user.name : "登录 / 注册" }}
          </p>
          <p v-if="!user.name">
            <span class="user-icon">
              <i class="iconfont icon-shouji iconiphone"></i>
            </span>
            <span class="icon-mobile-number">{{
              user.phone ? user.phone : "暂无绑定手机号"
            }}</span>
          </p>
        </div>
        <span class="arrow">
          <i class="iconfont icon-jiantou1"></i>
        </span>
      </router-link>
    </section>
    <section class="profile_info_data border-1px">
      <ul class="info_data_list">
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"
            ><span>0.00</span>
            <p>元</p>
          </span>
          <span class="info_data_bottom">我的余额</span>
        </a>
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"
            ><span>0</span>
            <p>个</p>
          </span>
          <span class="info_data_bottom">我的优惠</span>
        </a>
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"
            ><span>0</span>
            <p>分</p>
          </span>
          <span class="info_data_bottom">我的积分</span>
        </a>
      </ul>
    </section>
    <section class="profile_my_order border-1px">
      <!-- 我的订单 -->
      <router-link tag="span" to="" class="my_order">
        <span>
          <i class="iconfont icontubiaolunkuo-"></i>
        </span>
        <div class="my_order_div">
          <span>我的订单</span>
          <span class="my_order_icon">
            <i class="iconfont iconjiantou"></i>
          </span>
        </div>
      </router-link>
      <!-- 积分商城 -->
      <router-link tag="span" to="" class="my_order">
        <span>
          <i class="iconfont iconjifen"></i>
        </span>
        <div class="my_order_div">
          <span>积分商城</span>
          <span class="my_order_icon">
            <i class="iconfont iconjiantou"></i>
          </span>
        </div>
      </router-link>
      <!-- 美么外卖会员卡 -->
      <router-link tag="span" to="" class="my_order">
        <span>
          <i class="iconfont iconiconjp"></i>
        </span>
        <div class="my_order_div">
          <span>美了吗会员卡</span>
          <span class="my_order_icon">
            <i class="iconfont iconjiantou"></i>
          </span>
        </div>
      </router-link>
    </section>
    <section class="profile_my_order border-1px">
      <!-- 服务中心 -->
      <router-link tag="span" to="" class="my_order">
        <span>
          <i class="iconfont iconfuwu"></i>
        </span>
        <div class="my_order_div">
          <span>服务中心</span>
          <span class="my_order_icon">
            <i class="iconfont iconjiantou"></i>
          </span>
        </div>
      </router-link>
    </section>
    <van-button v-if="user._id" class="out" @click="loginOut" type="info"
      >退出登录</van-button
    >
  </section>
</template>

<script>
import { mapState } from "vuex";
import { Button, Dialog } from "vant";
export default {
  components: {
    [Button.name]: Button
  },
  props: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  update() {},
  methods: {
    loginOut() {
      Dialog.confirm({
        title:'提示',
        message: "确定退出登陆吗"
      })
        .then(() => {
          this.$store.dispatch('logout')
          this.$router.push('/login')
          console.log(1)
        })
        .catch(() => {
          console.log(2)

        });
    }
  },
  computed: {
    ...mapState({
        user: state => state.user.user
      }),
  }
};
</script>

<style lang="stylus"  rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/mixins';

header();

.profile { // 我的
  width: 100%;

  .profile-number {
    margin-top: 45.5px;

    .profile-link {
      clearFix();
      position: relative;
      display: block;
      background: #01affd!important;
      padding: 20px 20px;

      .profile_image {
        float: left;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        vertical-align: top;

        .icontouxiang {
          background: #eee;
          font-size: 60px;
        }
      }

      .user-info {
        float: left;
        margin-top: 8px;
        margin-left: 25px;

        p {
          font-weight: 700;
          font-size: 18px;
          color: #fff;

          &.user-info-top {
            padding-bottom: 8px;
          }

          .user-icon {
            display: inline-block;
            margin-left: -15px;
            margin-right: 5px;
            width: 20px;
            height: 20px;

            .icon-mobile {
              font-size: 30px;
              vertical-align: text-top;
            }
          }

          .icon-mobile-number {
            font-size: 14px;
            color: #fff;
          }
        }
      }

      .arrow {
        width: 12px;
        height: 12px;
        position: absolute;
        right: 15px;
        top: 40%;

        .icon-jiantou1 {
          color: #fff;
          font-size: 5px;
        }
      }
    }
  }

  .profile_info_data {
    bottom-border-1px(#e4e4e4);
    width: 100%;
    background: #fff;
    overflow: hidden;

    .info_data_list {
      clearFix();

      .info_data_link {
        float: left;
        width: 33%;
        text-align: center;
        border-right: 1px solid #f1f1f1;

        .info_data_top {
          display: block;
          width: 100%;
          font-size: 14px;
          color: #333;
          padding: 15px 5px 10px;

          span {
            display: inline-block;
            font-size: 30px;
            color: #f90;
            font-weight: 700;
            line-height: 30px;
          }

          p {
            padding-left: 5px;
            font-size: 20px;
            display: inline-block;
          }
        }

        .info_data_bottom {
          display: inline-block;
          font-size: 14px;
          color: #666;
          font-weight: 400;
          padding-bottom: 10px;
        }
      }

      .info_data_link:nth-of-type(2) {
        .info_data_top {
          span {
            color: #ff5f3e;
          }
        }
      }

      .info_data_link:nth-of-type(3) {
        border: 0;

        .info_data_top {
          span {
            color: #01affd;
          }
        }
      }
    }
  }

  .profile_my_order {
    margin-top: 10px;
    background: #fff;

    .my_order {
      display: flex;
      align-items: center;
      padding-left: 35px;

      >span {
        display: flex;
        align-items: center;
        width: 20px;
        height: 20px;
        padding-right: 10px;

        >.iconfont {
          margin-left: -10px;
          font-size: 30px;
        }

        .icontubiaolunkuo- {
          color: #01affd;
        }

        .iconjifen {
          color: #ff5f3e;
        }

        .iconiconjp {
          color: #f90;
        }

        .iconfuwu {
          color: #01affd;
        }
      }

      .my_order_div {
        width: 100%;
        border-bottom: 1px solid #f1f1f1;
        padding: 18px 10px 18px 0;
        font-size: 16px;
        color: #333;
        display: flex;
        justify-content: space-between;

        span {
          display: block;
        }

        .my_order_icon {
          width: 10px;
          height: 10px;

          .icon-jiantou1 {
            color: #fff;
            font-size: 10px;
          }
        }
      }
    }
  }

  .out {
    margin-top: 20px;
    width: 100%;
  }
}
</style>
