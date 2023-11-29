<script setup>
import { ref, unref } from 'vue'
import ProjectItem from './components/ProjectItem.vue'
import { getAllProject, getDonationTAmount } from '@/views/donationProject/api/index.js';
import useLoadMore from '@/hooks/useLoadMore.js';
import { useRouter } from 'vue-router';
import { ProjectType } from  '@/views/issueRequest/model/enum.js'

const router = useRouter()

const topInfo = ref({})
const getDonationTAmountFetch = async () => {
  const res = await getDonationTAmount()
  topInfo.value = res || {}
}
getDonationTAmountFetch()


const { list: list1, onLoad: onLoad1 } = useLoadMore((params) => {
  return getAllProject({ ...params, donation_type: ProjectType.DONATION })
});

const { list: list2, onLoad: onLoad2 } = useLoadMore((params) => {
  return getAllProject({ ...params, donation_type: ProjectType.ADMIT })
});

Promise.all([onLoad1(), onLoad2()])


const previewAll = (type) => {
  router.push({
    path: '/donationProjectAll',
    query: {
      enableBack: true,
      type,
    }
  })
}

const gotoDonation = () => {
  router.push({
    path: '/donationForm'
  })
}
</script>

<template>
<div class="page padding-bottom-action-bar">
  <div class="card-container">
    <div class="aggregate-amount-text">捐款总金额</div>
    <div class="aggregate-amount-value">
      <span class="amount">{{ $moneyFormatter(topInfo.tAmount * 1) }}</span>
      <span class="unit">元</span>
    </div>
    <div class="number-participants-value">
      <span class="participants">{{ topInfo.tPerson }}</span>
      <span class="unit">人</span>
    </div>
    <div class="number-participants-text">参与人数</div>

    <svg-icon icon-class="love-maker" class-name="love-maker-mini"></svg-icon>
    <svg-icon icon-class="love-maker" class-name="love-maker-small"></svg-icon>
  </div>
  <ModuleTitle title="爱心捐" style="margin-bottom: 8px" >
    <div class="look-all" @click="previewAll(ProjectType.DONATION)">
      <span class="look-all-text">查看全部</span>
      <svg-icon class-name="arrow-right-icon" icon-class="arrow-right"></svg-icon>
    </div>
  </ModuleTitle>
  <ProjectItem v-for="item in list1" :info="item" />

  <ModuleTitle title="我要认捐" style="margin-bottom: 8px">
    <div class="look-all" @click="previewAll(ProjectType.ADMIT)">
      <span class="look-all-text">查看全部</span>
      <svg-icon class-name="arrow-right-icon" icon-class="arrow-right"></svg-icon>
    </div>
  </ModuleTitle>
  <ProjectItem v-for="item in list2" :info="item" />
  <van-action-bar>
    <ActionButton type="primary" style="width: 100%;" @click="gotoDonation">我要捐款</ActionButton>
  </van-action-bar>
</div>
</template>

<style scoped lang="less">
.page {
  background: #F4F5FB;
  padding-bottom: var(--van-action-bar-height);
}

.card-container {
  position: relative;
  height: 330px;
  padding: 24px;
  margin-bottom: 24px;
  box-sizing: border-box;
  border-radius: 16px;
  color: #FFF;
  backdrop-filter: blur(2px);
  background: url('../../assets/icons/project-card-bg.svg') 50% / cover no-repeat;

  .aggregate-amount-text {
    font-size: 32px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .aggregate-amount-value {
    margin-top: 8px;

    .amount {
      font-size: 60px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    .unit {
      font-size: 42px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin-left: 8px;
    }
  }

  .number-participants-value {
    margin-top: 54px;

    .participants {
      font-size: 48px;
      font-style: italic;
      font-weight: 700;
      line-height: normal;
    }

    .unit {
      font-size: 34px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin-left: 10px;
    }
  }

  .number-participants-text {
    margin-top: 8px;
    font-size: 32px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .love-maker-mini {
    position: absolute;
    right: 409px;
    bottom: 14px;
    width: 106px;
    height: 87px;
    opacity: 0.2;
  }

  .love-maker-small {
    position: absolute;
    right: 294px;
    bottom: 15px;
    width: 176px;
    height: 145px;
    opacity: 0.2;
  }
}

.button {
  display: flex;
  padding: 24px 97px;
  justify-content: center;
  align-items: center;
  color: var(--ffffff, #FFF);
  text-align: center;
  font-family: PingFang SC;
  border-radius: 8px;
  background: var(--color-primary, #33C27B);
  width: 100%;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>