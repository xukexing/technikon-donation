<script setup>
import UserDonationDetailLog from './components/UserDonationDetailLog.vue';
import { ref } from 'vue';

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const onLoad = () => {
  setTimeout(() => {
    if (refreshing.value) {
      list.value = [];
      refreshing.value = false;
    }

    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }
    loading.value = false;

    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 1000);
};

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};
</script>

<template>
  <div class="top-card">
    <div class="left item">
      <span class="classify-name">已筹善款</span>
      <p class="detail">
        <i class="value">26666.09</i>
        <span class="unit">元</span>
      </p>
    </div>
    <div class="right item">
      <span class="classify-name">在捐次数</span>
      <p class="detail">
        <i class="value">10</i>
        <span class="unit">笔</span>
      </p>
    </div>
  </div>
  <div class="page padding-bottom-action-bar">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <UserDonationDetailLog v-for="item in list" />
    </van-list>
  </div>
  <van-action-bar>
    <div class="f-c-b full-w">
      <ActionButton plain style="width: calc(50% - 12px)" type="primary">邀朋友一起捐</ActionButton>
      <ActionButton style="width: calc(50% - 12px)" type="primary">我要捐款</ActionButton>
    </div>
  </van-action-bar>
</template>

<style scoped lang="less">
.top-card {
  padding: 48px;
  background: linear-gradient(167deg, #67BE7A 8.66%, #7EBE67 92.45%);
  &:extend(.f-c-b);

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
    box-sizing: border-box;
    width: 50%;
    height: 100%;
    color: #fff;

    .classify-name {
      font-size: 28px;
      font-style: normal;
      font-weight: 400;
      line-height: 40px;
      margin-bottom: 16px;
    }

    .detail {
      &:extend(.f-c-c);

      .value {
        font-size: 42px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }

      .unit {
        font-size: 28px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin: 6px 0 0 4px;
      }
    }
  }
}
</style>