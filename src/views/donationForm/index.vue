<script setup>
import { ref, unref, onMounted } from 'vue';
import { Anonymity, DonorSubject, Gender } from './model/const.js';
import { donorSubjectOptions, genderOptions } from './model/data.js';
import { phoneNumberRegex } from '../../utils/regExp.js';
import { useRouter, useRoute } from 'vue-router';
import useLoadMore from '@/hooks/useLoadMore.js';
import { getAllProject } from '@/views/donationProject/api/index.js';
import { ProjectType } from '@/views/issueRequest/model/enum.js';
import { addRecordInfoAndWxPay, getMyDonation } from '@/views/donationForm/api/index.js';
import { chooseWXPay } from '@/utils/wxAuth.js';
import { showToast } from 'vant';
import { getToken } from '@/store/user.js'
import useLoading from '@/hooks/useLoading.js';

const router = useRouter();

const route = useRoute();

const { list, onLoad } = useLoadMore((params) => {
  return getAllProject({
    ...params,
    pageSize: 1000,
    donation_type: ProjectType.DONATION
  })
})
onLoad()

const formRef = ref(null);
const formSchemas = ref([
	{
		field: 'prj_id',
		label: '捐赠项目',
		required: true,
		itemRender: {
			name: 'Picker',
			props: {
				options: unref(list),
        columnsFieldNames: {
          text: 'prj_name',
          value: 'prj_id'
        }
			},
		},
	},
	{
		field: 'donation_amount',
		label: '捐赠金额',
		required: true,
		slot: {
			button: 'moneyFieldUnit',
		},
		itemRender: {
			name: 'Input',
			props: {
				type: 'number',
			},
		},
	},
	{
		field: 'persional',
		label: '捐赠主体',
		required: true,
		itemRender: {
			name: 'Radio',
			defaultValue: DonorSubject.SELF,
			props: {
				options: donorSubjectOptions,
			},
		},
	},
	{
		field: 'nouse_name',
		label: '是否匿名',
		required: true,
		itemRender: {
			name: 'Switch',
			defaultValue: Anonymity.NO,
			props: {
				activeValue: Anonymity.YES,
				inactiveValue: Anonymity.NO,
			},
		},
	},
	{
		field: 'donation_name',
		label: '您的姓名',
		required: true,
		itemRender: {
			name: 'Input',
		},
	},
	{
		field: 'tellphone',
		label: '联系电话',
		required: true,
		rules: [
			{
				pattern: phoneNumberRegex,
				message: '请输入正确的手机号',
			},
		],
		itemRender: {
			name: 'Input',
			props: {
				type: 'tel',
			},
		},
	},
	{
		field: 'sex',
		label: '您的性别',
		itemRender: {
			name: 'Radio',
			defaultValue: Gender.MAN,
			props: {
				options: genderOptions,
			},
		},
	},
	{
		field: 'relation',
		label: '您是重理工',
		itemRender: {
			name: 'Picker',
			props: {
				options: [
					{ label: '在校生', value: '0' },
					{ label: '校友', value: '1' },
					{ label: '社会爱心人士', value: '2' },
				],
			},
		},
	},
	{
		field: 'school_info',
		label: '在校信息',
		itemRender: {
			name: 'Input',
		},
	},
	{
		field: 'message',
		label: '捐赠留言',
		itemRender: {
			name: 'Input',
			props: {
				labelAlign: 'top',
				inputAlign: 'left',
				type: 'textarea',
				autosize: true,
				maxlength: '200',
				showWordLimit: true,
			},
		},
	},
]);

const lookDonationLogs = () => {
	router.push({
		path: '/ownDonationLogs',
		query: {
			enableBack: true,
		},
	});
};

const initFormData = () => {
  const prj_id = route.query.id || ''
  unref(formRef).setFieldValues({
    prj_id
  })
}

const topMyDonationInfo = ref({})
const getMyDonationHandle = async () => {
  const res = await getMyDonation()
  topMyDonationInfo = res
}

onMounted(() => {
  initFormData()
})


const [loading, setLoading] = useLoading()
const submit = async () => {
  await unref(formRef).validate();
  setLoading(true)
  const params = unref(formRef).getFieldValues();
  params.relation = params.relation ? params.relation[0] : ''
  params.prj_id = params.prj_id ? params.prj_id[0] : ''
  const prj_name = unref(list).find(item => item.prj_id === params?.prj_id)?.prj_name || ''
  try {
    const res = await addRecordInfoAndWxPay({ ...params, prj_name, userid: getToken() })
    try {
      await chooseWXPay({ ...res, packageStr: res.package })
      showToast({
        message: '支付成功！',
        type: 'success'
      })
    } catch (e) {
      showToast({
        message: '支付失败！',
        type: 'fail'
      })
    }
  } catch (e) {
    showToast({
      message: '提交失败！',
      type: 'fail'
    })
  } finally {
    setLoading(false)
  }
}
</script>

<template>
	<div class="page">
		<div class="card">
			<div class="left">
				<div class="item">
					<div class="title">我的捐款</div>
					<div class="detail">
						<span class="value">{{ $moneyFormatter(topMyDonationInfo.myDonationAmount || 0) }}</span>
						<span class="unit">元</span>
					</div>
				</div>
				<div class="item">
					<div class="title">参与项目</div>
					<div class="detail">
						<span class="value">{{ topMyDonationInfo.myDonation }}</span>
						<span class="unit">个</span>
					</div>
				</div>
			</div>
			<!--<CardButton @click="lookDonationLogs" class="right">捐款记录</CardButton>-->
		</div>
		<x-form ref="formRef" :form-schemas="formSchemas">
			<template #moneyFieldUnit>
				<span class="form-field-unit">元</span>
			</template>
		</x-form>
	</div>
	<van-action-bar>
		<div class="f-c-b full-w">
			<!--<ActionButton color="#00A0E9" style="width: calc(50% - 12px)" type="primary">-->
			<!--	<div class="f-c-c"><svg-icon icon-class="alipay" class-name="pay-icon"></svg-icon>支付宝支付</div>-->
			<!--</ActionButton>-->
			<ActionButton  @click="submit" :loading="loading" style="width: 100%" type="primary">
				<div class="f-c-c"><svg-icon icon-class="wxpay" class-name="pay-icon"></svg-icon>微信支付</div>
			</ActionButton>
		</div>
	</van-action-bar>
</template>

<style scoped lang="less">
.page {
	padding-bottom: calc(var(--van-action-bar-height) + 16px);
}
.card {
	position: relative;
	padding: 24px;
	box-sizing: border-box;
	color: #fff;
	border-radius: 16px;
	backdrop-filter: blur(2px);
	min-height: 158px;
	background: url('../../assets/icons/donation-form-card.svg') 50% / contain no-repeat;

	display: flex;
	align-items: flex-end;
	justify-content: space-between;

	.left {
		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;
		flex: 1;

		.item {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			margin-right: 24px;
			max-width: 100%;

			.title {
				font-size: 32px;
				font-weight: 500;
				margin-bottom: 8px;
			}

			.detail {
				display: flex;
				align-items: center;
				max-width: 100%;

				.value {
					font-size: 48px;
					font-weight: 700;
					white-space: pre-wrap;
					word-break: break-all;
				}

				.unit {
					color: #fff;
					margin-left: 8px;
					font-size: 34px;
					font-weight: 500;
				}
			}
		}
	}

	.right {
		flex-shrink: 0;
	}
}

.form-field-unit {
	color: var(--color-primary);
}

.pay-icon {
	width: 42px;
	height: 42px;
	margin-right: 8px;
}
</style>