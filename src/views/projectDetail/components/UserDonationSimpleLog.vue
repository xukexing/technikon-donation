<script setup>
defineProps({
  info: Object,
  default: () => ({})
})
</script>

<template>
<div class="user-trend-simple-log">
  <div class="left">
    <img class="head-portrait" :src="info.headimgurl" />
    <span class="nickname single-text-hidden">{{ info.nickname }}</span>
    <p class="trend-detail">
      捐出<span class="money">{{ $moneyFormatter(info.donation_amount) }}</span>元
    </p>
  </div>
  <span class="right">{{ $dayjs(info.create_time).format('YYYY/MM/DD') }}</span>
</div>
</template>

<style scoped lang="less">

.user-trend-simple-log {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0;
  padding: 16px 0;
  box-sizing: border-box;
  border-bottom: 1px solid var(--eeeeee, #EEE);
  background: var(--ffffff, #FFF);
  width: 100%;

  .right {
    display: inline-block;
    color: var(--666666, #666);
    font-family: PingFang SC;
    font-size: 26px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    flex-shrink: 0;
    width: 180px;
    text-align: right;
  }

  .left {
    display: flex;
    align-items: center;
    width: calc(100% - 180px);
  }
}
.head-portrait {
  display: block;
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 16px;
  flex-shrink: 0;
}

.nickname {
  display: inline-block;
  color: var(--333333, #333);
  font-family: PingFang SC;
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  max-width: 260px;
}

.trend-detail {
  margin-left: 12px;
  color: var(--666666, #666);
  font-family: PingFang SC;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.money {
  margin-left: 12px;
  color: var(--color-primary, #33C27B);
}
</style>