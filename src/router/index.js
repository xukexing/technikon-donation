import { createRouter, createWebHashHistory } from 'vue-router';
import { setNavBarState } from '../store/navBar.js';
import { getToken, getUserInfoByStore, setUserInfo } from '@/store/user.js';
import { wxLogin } from '@/utils/wxAuth.js';
import { getUserInfoById } from '@/api/index.js';

const routes = [
	{
		path: '/',
		redirect: '/workTrend',
	},
	{
		path: '/home',
		name: 'home',
		meta: {
			title: '首页',
		},
		component: () => import('@/views/home/index.vue'),
	},
	{
		path: '/workTrend',
		name: 'workTrend',
		meta: {
			title: '工作动态',
		},
		component: () => import('@/views/workTrend/index.vue'),
	},
	{
		path: '/workTrendDetail',
		name: 'workTrendDetail',
		meta: {
			title: '工作动态详情',
		},
		component: () => import('@/views/workTrendDetail/index.vue'),
	},
	{
		path: '/introduction',
		name: 'introduction',
		meta: {
			title: '基金会简介',
		},
		component: () => import('@/views/introduction/index.vue'),
	},
	{
		path: '/contactUs',
		name: 'contactUs',
		meta: {
			title: '联系我们',
		},
		component: () => import('@/views/contactUs/index.vue'),
	},
	{
		path: '/frequentlyAskedQuestions',
		name: 'frequentlyAskedQuestions',
		meta: {
			title: '常见问题',
		},
		component: () => import('@/views/frequentlyAskedQuestions/index.vue'),
	},
	{
		path: '/donationWay',
		name: 'donationWay',
		meta: {
			title: '捐赠方式',
		},
		component: () => import('@/views/donationWay/index.vue'),
	},
	{
		path: '/donationFlows',
		name: 'donationFlows',
		meta: {
			title: '捐赠流程',
		},
		component: () => import('@/views/donationFlows/index.vue'),
	},
	{
		path: '/donationTax',
		name: 'donationTax',
		meta: {
			title: '捐赠免税',
		},
		component: () => import('@/views/donationTax/index.vue'),
	},
	{
		path: '/donationProject',
		name: 'donationProject',
		meta: {
			title: '捐赠项目',
		},
		component: () => import('@/views/donationProject/index.vue'),
	},
	{
		path: '/donationProjectAll',
		name: 'donationProjectAll',
		meta: {
			title: '捐赠项目',
		},
		component: () => import('@/views/donationProjectAll/index.vue'),
	},
	{
		path: '/projectDetail',
		name: 'projectDetail',
		meta: {
			title: '项目详情'
		},
		component: () => import('@/views/projectDetail/index.vue'),
	},
	{
		path: '/projectDonationLogs',
		name: 'projectDonationLogs',
		meta: {
			title: '捐赠记录',
		},
		component: () => import('@/views/projectDonationLogs/index.vue'),
	},
	{
		path: '/share',
		name: 'share',
		meta: {
			title: '朋友一起捐',
			Auth: true
		},
		component: () => import('@/views/share/index.vue'),
	},
	{
		path: '/donationOrder',
		name: 'donationOrder',
		meta: {
			title: '捐赠明细',
		},
		component: () => import('@/views/donationOrder/index.vue'),
	},
	{
		path: '/donationOrderDetail',
		name: 'donationOrderDetail',
		meta: {
			title: '明细详情',
		},
		component: () => import('@/views/donationOrderDetail/index.vue'),
	},
	{
		path: '/donationForm',
		name: 'donationForm',
		meta: {
			title: '在线微捐',
			Auth: true
		},
		component: () => import('@/views/donationForm/index.vue'),
	},
	{
		path: '/ownDonationLogs',
		name: 'ownDonationLogs',
		meta: {
			title: '捐款记录',
			Auth: true
		},
		component: () => import('@/views/ownDonationLogs/index.vue'),
	},
	{
		path: '/issueRequest',
		name: 'issueRequest',
		meta: {
			title: '我要发起',
			Auth: true
		},
		component: () => import('@/views/issueRequest/index.vue'),
	},
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ( { left: 0, top: 0 })
})

// 权限拦截
router.beforeEach(async (to, from, next) => {
	if (to.meta?.Auth) {
		if (!getToken()) {
			await wxLogin()
			next()
			return
		}
		if (!getUserInfoByStore()?.userid) {
			const res = await getUserInfoById(getToken())
			setUserInfo(res)
			next()
			return
		}
	}
	next()
})

// 全局拦截器：设置页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta?.title || import.meta.env.VITE_GLOB_APP_TITLE
  next()
})

// 全局拦截器：设置navbar显示隐藏
router.beforeEach((to, from, next) => {
  setNavBarState(to.query.enableBack)
  next()
})

export default router
