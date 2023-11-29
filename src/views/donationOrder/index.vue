<script setup>
import { ref, unref } from 'vue'
import useLoadMore from '../../hooks/useLoadMore.js';
import ProjectItem from './components/ProjectItem.vue';
import { useRouter, useRoute } from 'vue-router';
import { getAllProject } from '@/views/donationProject/api/index.js';
import { ProjectType } from '@/views/issueRequest/model/enum.js';

const router = useRouter()
const route = useRoute()

const previewAllLogs = (info) => {
  router.push({
    path: '/donationOrderDetail',
    query: {
      enableBack: true,
      id: info.prj_id
    }
  })
}

const { list, loading, finished, error, onLoad, onRefresh } = useLoadMore((params) => {
  return getAllProject({
    ...params,
    proName: unref(searchValue),
    donation_type: ProjectType.DONATION
  })
})


const searchValue = ref('')

const onSearch = () => {
  onRefresh()
}
</script>

<template>
  <van-sticky>
    <van-search v-model="searchValue" show-action shape="round" placeholder="请输入捐赠方关键字" @search="onSearch">
      <template #action>
        <div class="search-action" @click="onSearch">搜索</div>
      </template>
    </van-search>
  </van-sticky>
  <div class="page">
   <div class="title-wrapper">
     <ModuleTitle title="所有项目">
       <div class="look-all" @click="previewAllLogs">
         <span class="look-all-text">所有捐赠记录</span>
         <svg-icon class-name="arrow-right-icon" icon-class="arrow-right"></svg-icon>
       </div>
     </ModuleTitle>
   </div>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      v-model:error="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <ProjectItem v-for="item in list" :info="item"/>
    </van-list>
  </div>
</template>

<style scoped lang="less">
.search-action {
  color: var(--color-primary, #33C27B);
  font-size: 32px;
  font-weight: 400;
  line-height: 48px;
  margin: 0 16px;
  padding: 0 16px;
}

.page {
  padding-top: 0;
  background: #f5f5f5;
  min-height: calc(100vh - 80px);
}


.look-all {
  color: var(--color-primary, #33C27B);
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

.title-wrapper {
  padding: 16px 0;
}
</style>