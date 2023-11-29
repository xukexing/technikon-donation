import { ref, unref } from 'vue';

function useLoadMore(fetch) {
	const pageSize = ref(10);
	const page = ref(1);

	const list = ref([]);
	const loading = ref(false);
	const finished = ref(false);
	const refreshing = ref(false);
	const error = ref(false)
	
	// const onLoad = () => {
	// 	// 异步更新数据
	// 	// setTimeout 仅做示例，真实场景中一般为 ajax 请求
	// 	setTimeout(() => {
	// 		for (let i = 0; i < 10; i++) {
	// 			list.value.push(list.value.length + 1);
	// 		}
	//
	// 		// 加载状态结束
	// 		loading.value = false;
	//
	// 		// 数据全部加载完成
	// 		if (list.value.length >= 40) {
	// 			finished.value = true;
	// 		}
	// 	}, 1000);
	// };
	const onLoad = async () => {
		if (refreshing.value) {
			list.value = [];
			refreshing.value = false;
		}
		try {
			const payload = {
				pageSize: unref(pageSize),
				page: unref(page),
			};
			const { list: reqList, isLastPage } = await fetch(payload);
			list.value.push(...reqList);
			if (isLastPage) {
				finished.value = true;
			} else {
				page.value++;
			}
		} catch (e) {
			error.value = true
			console.log(e)
		} finally {
			loading.value = false;
		}
	};

	const onRefresh = () => {
		// 清空列表数据
		finished.value = false;

		// 重新加载数据
		// 将 loading 设置为 true，表示处于加载状态
		loading.value = true;
		onLoad();
	};

	return {
		list,
		loading,
		finished,
		error,
		refreshing,
		onLoad,
		onRefresh,
	};
}

export default useLoadMore