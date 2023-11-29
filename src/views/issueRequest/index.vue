<script setup>
import { ref, unref } from 'vue';
import { showSuccessToast, showToast } from 'vant'
import { phoneNumberRegex } from '../../utils/regExp.js';
import useLoading from '@/hooks/useLoading.js';
import { addProInfo, uploadFile } from '@/views/issueRequest/api/index.js';
import { ProjectType } from './model/enum.js'
import { getToken } from '@/store/user.js';

const unitOptions = [
  { label: '元', value: '元' },
  { label: '棵', value: '棵' }
]

const formRef = ref('');
const formSchemas = ref([
  {
    field: '"prj_name',
    label: '项目名称',
    required: true,
    itemRender: {
      name: 'Input',
    },
  },
  {
    field: 'donation_type',
    label: '项目类型',
    required: true,
    itemRender: {
      name: 'Select',
      props: {
        options: [
          { label: '捐赠项目', value: ProjectType.DONATION },
          { label: '认捐项目', value: ProjectType.ADMIT }
        ]
      }
    },
  },
  {
    field: '"background_url',
    label: '项目图片',
    required: true,
    slot: 'projectImg'
  },
  {
    field: 'goal',
    label: '众筹目标',
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
  // {
  //   field: 'unit',
  //   label: '目标单位',
  //   required: true,
  //   itemRender: {
  //     name: 'Input',
  //     defaultValue: '元'
  //   },
  // },
  {
    field: 'end_date',
    label: '筹资时间',
    required: true,
    itemRender: {
      name: 'Calendar',
    },
  },
  {
    field: 'create_person',
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
    field: 'email',
    label: '邮箱地址',
    itemRender: {
      name: 'Input',
      props: {
        type: 'email',
      },
    },
  },
  {
    field: 'reason',
    label: '申请简介',
    itemRender: {
      name: 'Input',
      props: {
        labelAlign: 'top',
        inputAlign: 'left',
        type: 'textarea',
        autosize: true,
        maxlength: 500,
        showWordLimit: true,
      },
    },
  },
]);

const unit = ref('元')

const formChange = ({ field, value }) => {
  // if (field === 'donation_type') {
  //   unit.value = value?.[0] === ProjectType.DONATION ? '元' : '棵'
  // }
}

const [loading, setLoading] = useLoading()

const fileList = ref([])

const beforeRead = (file) => {
  if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
    showToast('请上传 jpg/png/jpeg 格式图片');
    return false;
  }
  return true;
}
const afterRead = async (file, { model, field }) => {
  console.log(file)
  file.status = 'uploading';
  file.message = '上传中...';
  try {
    const res = await uploadFile(file.file)
    model[field] = res['file-url'] || ''
    file.status = 'done'
    file.message = '';
  } catch (e) {
    file.status = 'failed';
    file.message = '上传失败';
  }
}

const submit = async () => {
  try {
    setLoading(true)
    await unref(formRef)?.validate()
    const { donation_type, end_date, ...reset } = unref(formRef)?.getFieldValues()
    await addProInfo({
      ...reset,
      donation_type: donation_type[0],
      unit: unref(unit),
      end_date: end_date.replaceAll('/', '-'),
      userid: getToken()
    })
    showSuccessToast('提交成功！')
  } finally {
    setLoading(false)
  }
}
</script>

<template>
  <div class="page">
    <img class="banner" src="@/assets/img/share-banner.png" />
    <p class="tips">
      说明：可以以个人名义或团体名义申请发起爱心众筹项目。需填 写以下信息，点击“提交申请”，待基金会审核并认证通过后， 发起项目才生效。
    </p>
    <div class="form-container">
      <x-form ref="formRef" :form-schemas="formSchemas" @change="formChange">
        <template #moneyFieldUnit>
        	<span class="form-field-unit">{{ unit || '元' }}</span>
        </template>
        <template #projectImg="data">
          <van-uploader v-model="fileList" :before-read="beforeRead" :after-read="$event => afterRead($event, data)" reupload max-count="1" />
        </template>
      </x-form>
    </div>
  </div>
  <van-action-bar>
    <div class="f-c-b full-w">
      <ActionButton :loading="loading" class="full-w" type="primary" @click="submit"> 提交申请 </ActionButton>
    </div>
  </van-action-bar>
</template>

<style scoped lang="less">
.page {
  background: linear-gradient(167deg, #67be7a 8.66%, #7ebe67 92.45%);
  padding-bottom: calc(var(--van-action-bar-height) + 24px);
}

.banner {
  width: 686px;
  height: 280px;
  border-radius: 16px;
  object-fit: cover;
}

.tips {
  padding: 40px 0;
  color: var(--ffffff, #fff);
  text-align: justify;
  font-size: 30px;
  font-weight: 500;
}

.form-container {
  border-radius: 16px;
  background: #fff;
  padding: 24px;
  box-sizing: border-box;
}

.form-field-unit {
  color: var(--color-primary);
}
</style>
