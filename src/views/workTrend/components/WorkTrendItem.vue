<script setup>
import usePushDetail from '@/views/workTrend/hooks/usePushDetail.js';

const props = defineProps({
  info: Object
})

const { gotoDetail } = usePushDetail();
</script>

<template>
	<div class="work-trend-item" @click="gotoDetail({ id: info?.workstateId })">
		<img :src="info?.imgUrl" />
		<div class="left">
			<p class="content">{{ info?.title }}</p>
			<span class="time">{{ info?.updateTime }}</span>
		</div>
	</div>
</template>

<style scoped lang="less">
.work-trend-item {
	display: flex;
	align-items: flex-start;
	padding: 24px 0;
	height: 150px;
	border-bottom: 1px solid var(--eeeeee, #eee);
	margin-bottom: 24px;

	img {
		border-radius: 8px;
		object-fit: cover;
		width: 200px;
		height: 100%;
		flex-shrink: 0;
	}

	.left {
		flex: 1;
		margin-left: 18px;

		.content {
			margin-bottom: 16px;
			font-size: 30px;
			font-weight: 400;
			line-height: normal;
			&:extend(.two-line-text-hidden);
		}

		.time {
			font-size: 24px;
			font-weight: 400;
			color: var(--999999, #999);
		}
	}
}
</style>