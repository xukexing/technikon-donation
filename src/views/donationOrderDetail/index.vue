<script setup>
import useLoadMore from '../../hooks/useLoadMore.js';
import { moneyFormatter, dateFormatter } from '@/utils/formatter.js'
import { donationDetail } from './api/index.js';
import { useRoute } from 'vue-router';

const route = useRoute();

const columns = [
	{
		key: 'donateTime',
		title: '时间',
		formatter: ({ cellValue }) => {
			if (!cellValue) return '-';
			return dateFormatter(cellValue);
		},
	},
	{
		key: 'donateParty',
		title: '捐赠方',
	},
	{
		key: 'donatePro',
		title: '捐赠项目',
	},
	{
		key: 'donateAmount',
		title: '捐赠金额',
		formatter: ({ cellValue }) => {
			return moneyFormatter(cellValue);
		},
	},
];
const fetch = async (params) => {
	return await donationDetail({
		...params,
    pro_id: route.query.id || '',
	});
};

const { list, loading, finished, error, onLoad } = useLoadMore(fetch);
</script>

<template>
	<div class="page">
    <van-sticky offset-top="11.73333vw">
      <div class="table-header-tr">
        <div v-for="item in columns" :key="item.key" class="table-header-th">
          {{ item.title }}
        </div>
      </div>
    </van-sticky>
		<van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      v-model:error="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
			<div v-for="row in list" class="table-body-tr" >
				<div v-for="column in columns" :key="column.key" class="table-body-td">
					<p class="content two-line-text-hidden">
						{{ column.formatter ? column.formatter({ cellValue: row[column.key] }) : (row[column.key] || '-') }}
					</p>
				</div>
			</div>
		</van-list>
	</div>
</template>

<style scoped lang="less">
:deep(.van-list__finished-text),
:deep(.van-list__loading) {
	margin-top: 16px;
}

.content {
  width: 100%;
  text-align: center;
}


.table-body-tr,
.table-header-tr {
  display: flex;
  align-items: center;
  height: 98px;

  &:nth-of-type(even) {
    background: #F5F5F5;
  }
}

.table-header-tr {
  background: var(--color-primary);
}

.table-header-th {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 500;
  color: #fff;
  width: 25%;
  height: 100%;
  padding: 16px 8px;
  box-sizing: border-box;
}

.table-body-td {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 100%;
  padding: 16px 8px;
  box-sizing: border-box;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.90);
  font-size: 24px;
  font-weight: 400;
}
</style>