<script setup>
import { ref, onMounted, unref } from 'vue'
import { getQueryParams, initShare } from '@/utils/wxAuth.js'
import { getUserInfoById } from '@/api/index.js';
import { getProjDetail } from '@/views/projectDetail/api/index.js';
import { useRoute, useRouter } from 'vue-router';
import { getUserInfoByStore, getToken } from '@/store/user.js';
import useDonationAction from '@/hooks/useDonationAction.js';

const route = useRoute()
const router = useRouter()

const shareInfo = ref({})
const shareUserId = ref('')
const getShareInfo = async () => {
  shareUserId.value = getQueryParams('shareId')
  const res = unref(shareUserId) ? await getUserInfoById(shareUserId) : await getUserInfoByStore()
  shareInfo.value = res || {}
}


const projectInfo = ref({})
const getProjectDetail = async () => {
  if (route.query.id) {
    const res = await getProjDetail(route.query.id)
    projectInfo.value = res
  }
}

const initShareConfig = () => {
  const params = {
    title: '我已为这个公益项目捐款，只要人人都献出一点爱，爱就是改变世界的力量。',
    desc: unref(projectInfo).priName,
    imgUrl: unref(projectInfo).background_url,
    link: `${location.href}&shareId=${getToken()}`
  }
  initShare(params)
}

onMounted(async () => {
  await Promise.all([getShareInfo(), getProjectDetail()])
  initShareConfig()
})


const { donationAction, actionDonationText } = useDonationAction(projectInfo)

const overlayShow = ref(true)
</script>

<template>
  <van-overlay :show="overlayShow" @click="overlayShow = false">
    <div class="overlay-content">
      <p>点击右上角分享给朋友一起捐！</p>
      <svg-icon icon-class="share-icon" class="share-icon" />
    </div>
  </van-overlay>

  <div class="padding-bottom-action-bar">
    <img class="banner" src="@/assets/img/share-banner.png"/>
    <div class="page">
      <div class="card">
        <img class="head-portrait" :src="shareInfo.headimgurl" />
        <p class="nickname">{{ shareInfo.nickname }}</p>
        <p class="share-action-text">
          邀您一起捐
        </p>
        <p class="share-tips">
          “我已为这个公益项目捐款，只要人人都献出一点爱，爱就是改变世界的力量。”
        </p>
        <p class="target-text">筹款目标</p>
        <p class="target-value">{{ $moneyFormatter(projectInfo.goal) }} {{ projectInfo.unit }}</p>
        <div class="current-state">
          <div class="right item">
            <span class="classify-name">参与人数</span>
            <p class="detail">
              <i class="value">{{ projectInfo.pCount || 0 }}</i>
              <span class="unit">人</span>
            </p>
          </div>
          <div class="left item">
            <span class="classify-name">捐款金额</span>
            <p class="detail">
              <i class="value">{{ $moneyFormatter(projectInfo.tAmount) }}</i>
              <span class="unit">{{ projectInfo.unit }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="module-container m-t-24">
        <ModuleTitle title="项目情况" />
        <div class="project-container">
          <img class="project-img" :src="projectInfo.background_url">
          <div class="right-info">
            <p class="title single-text-hidden">{{ projectInfo.priName }}</p>
            <p class="content single-text-hidden">{{ projectInfo.reason }}</p>
            <div class="target">
              <div class="item">
                <span class="label">目标</span>
                <span class="value">{{ $moneyFormatter(projectInfo.goal) }} {{ projectInfo.unit }}</span>
              </div>
              <div class="item">
                <span class="label">已筹</span>
                <span class="value">{{ $moneyFormatter(projectInfo.tAmount) }} {{ projectInfo.unit }}</span>
              </div>
            </div>
          </div>
        </div>
        <p class="content-detail" v-html="projectInfo.reason"></p>
      </div>
      <!--<div class="module-container m-t-24">-->
      <!--  <ModuleTitle title="TA的支持者" />-->
      <!--  <UserDonationSimpleLog v-for="item in 10"/>-->
      <!--  <div class="bottom-load-more f-c-c">-->
      <!--    <svg-icon class-name="load-more" icon-class="load-more"></svg-icon>-->
      <!--  </div>-->
      <!--</div>-->
    </div>
  </div>
  <van-action-bar v-if="shareUserId">
    <div class="f-c-b full-w">
      <ActionButton class="full-w" type="primary" @click="donationAction">{{ actionDonationText }}</ActionButton>
    </div>
  </van-action-bar>
</template>

<style lang="less" scoped>
.padding-bottom-action-bar {
  background: #eee;
}
.banner {
  height: 306px;
  width: 100%;
  display: block;
  object-fit: cover;
}

.page {
  background: linear-gradient(180deg, #F4EDE7 8.24%, rgba(244, 237, 231, 0.00) 50%);
  min-height: calc(100vh - 306px);

  .module-container {
    padding: 24px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.90);

    .project-container {
      border-radius: 16px;
      border: 1px solid var(--eeeeee, #EEE);
      background: #FFF;
      margin-top: 8px;
      display: flex;
      align-items: center;
      padding: 16px;
      box-sizing: border-box;

      .project-img {
        width: 200px;
        height: 150px;
        border-radius: 16px;
        border: 1px solid var(--eeeeee, #EEE);
        background: #FFF;
        object-fit: cover;
        margin-right: 16px;
      }

      .right-info {
        flex: 1;
        overflow: hidden;

        .title {
          color: var(--333333, #333);
          font-size: 30px;
          font-weight: 500;
        }

        .content {
          color: var(--999999, #999);
          font-size: 24px;
          font-weight: 400;
          padding: 16px 0;
        }

        .target {
          color: var(--999999, #999);
          font-size: 24px;
          font-weight: 400;
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          .item {
            margin-right: 32px;

            &:last-child {
              margin-right: 0;
            }
          }

          .value {
            color: var(--color-primary, #33C27B);
            font-size: 26px;
            font-weight: 500;
            margin-left: 8px;
          }
        }
      }
    }
  }
}

.content-detail {
  margin-top: 16px;
  color: var(--333333, #333);
  text-align: justify;
  font-size: 28px;
  font-weight: 400;
  line-height: 42px;
}


.bottom-load-more {
  padding: 12px 0;

  .load-more {
    width: 32px;
    height: 32px;
    color: var(--color-primary);
  }
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  box-sizing: border-box;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.90);

  .head-portrait {
    display: block;
    width: 118px;
    height: 118px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 16px;
  }
  .nickname {
    color: var(--333333, #333);
    font-family: PingFang SC;
    font-size: 30px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .share-action-text {
    color: var(--color-primary);
    font-family: PingFang SC;
    font-size: 30px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    padding: 8px;
  }

  .share-tips {
    color: var(--666666, #666);
    text-align: center;
    font-size: 28px;
    font-weight: 400;
    margin-bottom: 16px;
  }

  .target-text {
    color: var(--666666, #666);
    font-size: 28px;
    font-weight: 400;
    padding: 8px;
  }

  .target-value {
    color: var(--color-primary);
    font-family: PingFang SC;
    font-size: 40px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    padding-bottom: 8px;
  }

  .current-state {
    &:extend(.f-c-b);
    position: relative;
    padding: 24px 0px;
    margin-top: 24px;
    border-radius: 16px;
    background: #F9F8FD;
    box-sizing: border-box;
    width: 100%;

    &::before {
      content: '';
      display: inline-block;
      position: absolute;
      top: -16px;
      left: 50%;
      width: 36px;
      height: 36px;
      background: #F9F8FD;
      transform: translateX(-50%) rotate(-45deg);
      border-radius: 8px;
    }

    &::after {
      display: block;
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0;
      height: 68%;
      border-left: 1px solid var(--eeeeee, #EEE);
    }

    .item {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .classify-name {
        color: var(--666666, #666);
        font-size: 28px;
        font-weight: 400;
        margin-bottom: 8px;
      }

      .detail {
        &:extend(.f-c-c);

        .value {
          color: var(--color-primary, #33C27B);
          font-size: 42px;
          font-weight: 700;
        }

        .unit {
          color: var(--333333, #333);
          font-size: 28px;
          font-weight: 500;
          margin-left: 8px;
        }
      }
    }
  }
}


.overlay-content {
  color: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 24px;
  box-sizing: border-box;
  font-size: 28px;
  p {
    padding-top: 20px;
  }

  .share-icon {
    width: 46px;
    height: 46px;
    margin-left: 4px;
  }
}
</style>