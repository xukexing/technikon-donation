import { useRouter } from 'vue-router';

export default function usePushDetail() {
	const router = useRouter();

	const gotoDetail = (query) => {
		router.push({
			path: '/workTrendDetail',
			query: {
				enableBack: true,
				...query,
			},
		});
	};

	return {
		gotoDetail,
	};
}