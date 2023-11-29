<script setup>
import ProjectDonationLog from './components/ProjectDonationLog.vue';
import useLoadMore from '../../hooks/useLoadMore.js';

const { list, loading, finished, error, onLoad } = useLoadMore();
</script>

<template>
	<div class="page">
		<ModuleTitle title="捐款记录"> </ModuleTitle>
		<van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      v-model:error="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
			<ProjectDonationLog v-for="item in list" />
		</van-list>
	</div>
</template>

<style scoped lang="less"></style>