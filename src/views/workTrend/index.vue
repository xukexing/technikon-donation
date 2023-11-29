<script setup>
import { computed, unref, toRaw } from 'vue';
import WorkTrendItem from './components/WorkTrendItem.vue';
import useLoadMore from '../../hooks/useLoadMore.js';
import usePushDetail from './hooks/usePushDetail.js';
import { queryAll } from './api/index.js'

const { list, loading, finished, error, onLoad } = useLoadMore(queryAll);

const firstTrend = computed(() => {
  return unref(list).slice(0, 1)
})

const otherTrend = computed(() => {
  return unref(list).slice(1) || []
})

const { gotoDetail } = usePushDetail();
</script>
<template>
	<div class="page">
		<div class="top" @click="gotoDetail({ id: firstTrend[0]?.workstateId })">
			<img class="trend-img" :src="firstTrend[0]?.imgUrl" />
			<p class="trend-title single-text-hidden">{{ firstTrend[0]?.title }}</p>
		</div>
		<ModuleTitle title="全部动态" />
		<van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      v-model:error="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
			<WorkTrendItem v-for="item in otherTrend" :key="item.workstateId" :info="item" />
		</van-list>
	</div>
</template>

<style scoped lang="less">
.top {
	position: relative;
	height: 385.88px;
	border-radius: 16px;
	overflow: hidden;
	margin-bottom: 24px;

	.trend-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 16px;
		overflow: hidden;
	}

	.trend-title {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 80px;
		padding: 20px 32px;
		box-sizing: border-box;
		border-radius: 0px 0px 6px 6px;
		font-size: 28px;
		font-weight: 500;
		color: #fff;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000 100%);
	}
}

.not-more-tips {
	padding: 24px 0;
	color: var(--cccccc, #ccc);
	text-align: center;
	font-family: PingFang SC;
	font-size: 26px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
}
</style>