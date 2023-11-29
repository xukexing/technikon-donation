<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps({
  info: {
    type: Object,
    default: () => ({})
  }
})
const gotoDetail = () => {
  router.push({
    path: '/donationOrderDetail',
    query: {
      enableBack: true,
      id: props.info.prj_id
    }
  })
}
</script>

<template>
<div class="project-container" @click="gotoDetail">
  <div class="left">
    <img class="project-img" :src="info?.background_url" />
    <div class="info">
      <p class="name single-text-hidden">{{ info?.prj_name || '' }}</p>
      <p class="content single-text-hidden">{{ info?.reason }}</p>
    </div>
  </div>
  <van-icon class="arrow-right" name="arrow" />
</div>
</template>

<style scoped lang="less">
.project-container {
  padding: 24px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 16px;
  border-bottom: 1px solid var(--eeeeee, #EEE);
  margin-bottom: 16px;
  &:extend(.f-c-b);

  .left {
    display: flex;
    align-items: center;
    width: 590px;
    overflow: hidden;


    .project-img {
      width: 160px;
      height: 120px;
      object-fit: cover;
      border-radius: 8px;
      margin-right: 16px;
    }

    .name {
      width: 414px;
      color: var(--333333, #333);
      font-size: 30px;
      font-weight: 500;
    }

    .content {
      width: 414px;
      color: var(--999999, #999);
      font-size: 24px;
      font-weight: 400;
      margin-top: 16px;
    }
  }

  .arrow-right {
    margin-left: 16px;
    font-size: 32px;
    color: #999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>