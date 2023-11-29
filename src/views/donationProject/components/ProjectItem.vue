<script setup>
import { useRouter } from 'vue-router';
import { setSelectedProject } from '@/store/selectedProject.js';
import { unref } from 'vue';

const router = useRouter()

const props = defineProps({
  info: Object,
  isSelect: false
})

const gotoDetail = () => {
  router.push({
    path: '/projectDetail',
    query: {
      enableBack: true,
      id: props.info?.['prj_id']
    }
  })
}

const projectClick = () => {
  if (!props.isSelect) {
    gotoDetail()
  } else {
    setSelectedProject(unref(props.info))
  }
}

</script>

<template>
<div class="project-item-wrapper" @click="projectClick">
  <img :src="info?.background_url" />
  <div class="project-info">
    <p class="project-name single-text-hidden">{{ info?.prj_name || '' }}</p>
    <p class="project-content single-text-hidden">{{ info?.reason }}</p>
    <div class="bottom-target">
      <div class="item">
        <span class="label">目标金额：</span>
        <span class="value">{{ info?.goal === 0 ? '不限' : info?.goal + info?.unit }}</span>
      </div>
      <div class="item">
        <span class="label">已筹：</span>
        <span class="value">{{ $moneyFormatter(info?.donation_total || 0, { precision: info?.unit !== '元' ? 0 : 2  }) }}{{ info?.unit }}</span>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="less">
.project-item-wrapper {
  display: flex;
  width: 100%;
  height: 182px;
  padding: 16px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border-radius: 16px;
  border-bottom: 1px solid var(--eeeeee, #EEE);
  background: #FFF;
  overflow: hidden;

  img {
    display: block;
    flex-shrink: 0;
    width: 200px;
    height: 100%;
    border-radius: 8px;
    margin-right: 16px;
  }

  .project-info {
    flex: 1;
    overflow: hidden;

    .project-name {
      color: var(--333333, #333);
      font-family: PingFang SC;
      font-size: 30px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    .project-content {
      margin: 16px 0;
      color: var(--999999, #999);
      font-family: PingFang SC;
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .bottom-target {
      display: flex;
      align-items: flex-end;

      .item {
        display: flex;
        align-items: flex-end;
        color: var(--999999, #999);
        font-family: PingFang SC;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-right: 32px;

        &:last-child {
          margin-right: 0;
        }

        .value {
          color: var(--color-primary, #33C27B);
          font-size: 26px;
          font-weight: 500;
        }
      }
    }
  }
}
</style>