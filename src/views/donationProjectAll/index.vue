<script setup>
import ProjectItem from '@/views/donationProject/components/ProjectItem.vue';
import useLoadMore from '@/hooks/useLoadMore.js';
import { getAllProject } from '@/views/donationProject/api/index.js'
import { useRoute, useRouter } from 'vue-router';
import { computed, unref } from 'vue';
import { getSelectedProject } from '@/store/selectedProject.js';
import { showToast } from 'vant';

const route = useRoute()
const router = useRouter()

const { list, refreshing, loading, finished, error,  onLoad, onRefresh } = useLoadMore((params) => {
  return getAllProject({
    ...params,
    donation_type: route.query.type
  })
})


const isSelectProject = computed(() => {
  return route.query.choose
})

const currentProject = computed(() => {
  return unref(getSelectedProject())
})

const shareFriend = () => {
  router.push({
    path: '/share',
    query: {
      id: unref(currentProject).prj_id
    }
  })
}

const gotoShare = () => {
  if (unref(currentProject)) {
    showToast('请选择要分享的项目')
    return
  }

  shareFriend()
}
</script>

<template>
 <div :class="['page', { 'padding-bottom-action-bar': isSelectProject }]">
   <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
     <van-list
       v-model:loading="loading"
       :finished="finished"
       finished-text="没有更多了"
       v-model:error="error"
       error-text="请求失败，点击重新加载"
       @load="onLoad"
     >
       <ProjectItem v-for="item in list" :info="item" :is-select="isSelectProject"/>
     </van-list>
   </van-pull-refresh>
   <van-action-bar>
     <ActionButton v-if="isSelectProject" type="primary" style="width: 100%;" @click="gotoShare">下一步</ActionButton>
   </van-action-bar>
 </div>
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