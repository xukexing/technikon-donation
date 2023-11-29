<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { queryDetail } from './api/index.js'

const route =  useRoute()

const info = ref({})

const queryDetailFetch = async () => {
  const res = await queryDetail(route.query.id)
  info.value = res?.[0] || {}
}
queryDetailFetch()
</script>

<template>
<div class="page">
  <p class="title">
    {{ info?.title }}
  </p>
  <span class="author">重庆理工大学教育发展基金会</span>
  <span class="time">{{ info?.updateTime }}</span>
  <p class="content" v-html="info?.body"></p>
</div>
</template>

<style scoped lang="less">
.title {
  color: #000;
  font-family: PingFang SC;
  font-size: 42px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 2px;
}

.author, .time {
  display: block;
}

.author {
  margin-top: 24px;
  color: #576B95;
  font-family: PingFang SC;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
}

.time {
  margin-top: 16px;
  color: var(--999999, #999);
  font-family: PingFang SC;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
}

.content {
  margin-top: 24px;
  font-family: "PingFang SC", "Microsoft YaHei", "SimHei", Arial, sans-serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: 42px;
}
</style>