<script setup>
import { computed, ref, unref } from 'vue'
import UserDonationSimpleLog from './components/UserDonationSimpleLog.vue';
import { useRouter, useRoute } from 'vue-router';
import useLoadMore from '@/hooks/useLoadMore.js';
import { getDoPerById, getProjDetail } from './api/index.js';
import { ProjectType } from '@/views/issueRequest/model/enum.js';
import useDonationAction from '@/hooks/useDonationAction.js';

const router = useRouter()
const route = useRoute()

const targetValue = ref(0)
const currentRate = ref(0);
const text = computed(() => currentRate.value.toFixed(2) + '%');

const previewAllLogs = () => {
  router.push({
    path: '/projectDonationLogs',
    query: {
      enableBack: true,
      id: ''
    }
  })
}

const shareFriend = () => {
  router.push({
    path: '/share',
    query: {
      id: route.query.id
    }
  })
}

const { list, loading, finished, onLoad } = useLoadMore((params) => {
  return getDoPerById({ ...params, proId: route.query.id })
});


const info = ref({})
const getProjectDetail = async () => {
 const res = await getProjDetail(route.query.id)
  info.value = res
  targetValue.value = res.tAmount / res.goal * 100
}

Promise.all([onLoad(), getProjectDetail()])

const { donationAction, actionDonationText, isDonationProject } = useDonationAction(info)

</script>

<template>
  <div class="project-detail-page padding-bottom-action-bar">
    <img class="project-img" :src="info.background_url"/>
    <div class="project-progress-wrapper">
      <p class="project-title">{{ info.priName }}</p>
      <div class="module-container">
        <ModuleTitle title="项目筹款情况"/>
        <div class="progress-info">
         <div class="left" v-if="info.donation_type === ProjectType.DONATION">
           <van-circle
             v-model:current-rate="currentRate"
             :color="{
              '0%': '#67BE7A',
              '100%': '#7EBE67',
            }"
             :rate="targetValue"
             :speed="30"
             :stroke-width="140"
             :text="text"
             layer-color="#eee"
           />
         </div>
          <div class="right">
            <div class="item">
              <span class="label">项目目标：</span>
              <span class="value">{{ $moneyFormatter(info.goal, { precision: info.unit !== '元' ? 0 : 2 }) }}</span>
              <span class="unit">{{ info.unit }}</span>
            </div>
            <div class="item">
              <span class="label">已筹善款：</span>
              <span class="value">{{ $moneyFormatter(info.tAmount, { precision: info.unit !== '元' ? 0 : 2 }) }}</span>
              <span class="unit">{{ info.unit }}</span>
            </div>
            <div class="item">
              <span class="label">在捐次数：</span>
              <span class="value">{{ info.count }}</span>
              <span class="unit">笔</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-padding m-b-24">
      <div class="module-container">
        <ModuleTitle title="项目情况"/>
        <p class="project-intro" v-html="info.reason">
        </p>
      </div>

      <div class="module-container m-t-24">
        <ModuleTitle title="TA们在参与">
          <!--<div class="look-all" @click="previewAllLogs">-->
          <!--  <span class="look-all-text">查看全部</span>-->
          <!--  <svg-icon class-name="arrow-right-icon" icon-class="arrow-right"></svg-icon>-->
          <!--</div>-->
        </ModuleTitle>
        <UserDonationSimpleLog v-for="(item, index) in list" :key="index" :info="item"/>
        <div class="bottom-load-more f-c-c">
          <van-loading v-if="loading" type="spinner" color="#33C27B" />
          <svg-icon v-else-if="!finished && !loading" class-name="load-more" icon-class="load-more" @click="onLoad"></svg-icon>
        </div>
      </div>
    </div>
  </div>

  <van-action-bar>
    <div class="f-c-b full-w">
      <ActionButton v-if="isDonationProject" plain style="width: calc(50% - 12px)" type="primary" @click="shareFriend">邀朋友一起捐</ActionButton>
      <ActionButton :style="{width: isDonationProject ? 'calc(50% - 12px)' : '100%'}" type="primary" @click="donationAction">{{ actionDonationText }}</ActionButton>
    </div>
  </van-action-bar>
</template>

<style lang="less" scoped>
.project-detail-page {
  background: #eee;
  min-height: 100vh;
}

.page-padding {
  padding: 0 32px;
  box-sizing: border-box;
}

.project-img {
  display: block;
  height: 420px;
  width: 100%;
  object-fit: cover;
}

.project-progress-wrapper {
  padding: 24px 32px;
  background: linear-gradient(180deg, #67BE7A 21.27%, rgba(255, 255, 255, 0.00) 93.48%);


  .project-title {
    color: var(--ffffff, #FFF);
    font-family: PingFang SC;
    font-size: 42px;
    font-style: normal;
    font-weight: 600;
    line-height: 60px; /* 142.857% */
    margin-bottom: 24px;
  }

  .progress-info {
    margin-top: 8px;
    display: flex;
    align-items: center;

    .left {
      margin-right: 24px;
      box-sizing: border-box;
      overflow: visible;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .right {
      flex: 1;

      .item {
        display: flex;
        align-items: center;
        padding: 8px 0;
        margin-bottom: 16px;

        &:last-child {
          margin-bottom: 0;
        }

        .value {
          color: var(--color-primary, #33C27B);
          font-size: 42px;
          font-weight: 700;
          margin: 0 4px 0 16px;
        }

        .unit {
          color: var(--333333, #333);
          font-weight: 500;
        }
      }
    }
  }
}

.module-container {
  padding: 24px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.90);
}

.project-intro {
  margin-top: 8px;
  color: var(--333333, #333);
  text-align: justify;
  font-family: PingFang SC;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: 42px;
}

.look-all {
  color: var(--666666, #666);
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .look-all-text {
    display: block;
    font-family: PingFang SC;
    font-size: 30px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .arrow-right-icon {
    margin-left: 10px;
    width: 38px;
    height: 36px;
    margin-top: 0.17em;
  }
}

.bottom-load-more {
  padding: 12px 0;

  .load-more {
    width: 32px;
    height: 32px;
    color: var(--color-primary);
  }
}
</style>