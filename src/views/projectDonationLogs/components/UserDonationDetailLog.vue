<script setup>
import headPortrait from '@/assets/img/head-portrait.png'
</script>

<template>
<div class="user-donation-log">
  <img class="head-portrait" :src="headPortrait" />
  <div class="info">
    <div class="top">
      <p class="nickname">爱嗑瓜子的猫爱嗑瓜子的猫</p>
      <p class="money">
        <span class="value">36.22</span>
        <span class="unit">元</span>
      </p>
    </div>
    <p class="time">2022/09/11</p>
    <p class="message">
      支持！
    </p>
  </div>
</div>
</template>

<style scoped lang="less">

.user-donation-log {
  &:extend(.f-c-b);
  margin: 8px 0;
  padding: 16px 0;
  box-sizing: border-box;
  border-bottom: 1px solid var(--eeeeee, #EEE);
  background: var(--ffffff, #FFF);
  width: 100%;
}

.head-portrait {
  display: block;
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 16px;
  flex-shrink: 0;
}

.info {
  flex: 1;
  flex-shrink: 0;

  .top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 12px;

    .nickname {
      color: var(--333333, #333);
      font-family: PingFang SC;
      font-size: 30px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      flex: 1;
    }

    .money {
      display: flex;
      align-items: center;

      .value {
        color: #33C27B;
        font-size: 32px;
        font-weight: 700;
        margin-right: 4px;
      }

      .unit {
        font-size: 28px;
        font-weight: 500;
      }
    }
  }

  .time {
    color: var(--666666, #666);
    font-family: PingFang SC;
    font-size: 26px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .message {
    color: var(--333333, #333);
    font-family: PingFang SC;
    font-size: 26px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 10px;
  }
}
</style>