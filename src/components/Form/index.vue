<script setup>
import { unref, watchEffect } from 'vue';
import FormItem from './components/FormItem.vue';
import { baseProps, customProps } from './props.js';
import useInitForm from './hooks/useInitForm.js';
import useBaseMethod from './hooks/useBaseMethod.js';
import useGenerateForm from './hooks/useGenerateForm.js';

const props = defineProps({
	...baseProps,
	...customProps,
});
const emit = defineEmits(['change']);

const { formRef, formModal, formRules } = useInitForm();

const { initFormModel, generateRulesBySchemas } = useGenerateForm();
watchEffect(() => {
	formModal.value = initFormModel(props.formSchemas);
	formRules.value = generateRulesBySchemas(props.formSchemas);
});

const { getValues, getFieldValues, setFieldValues, validate, clearValidate, scrollToField } = useBaseMethod(formRef, formModal);

const getFormItemSlotNames = (schema) => {
	if (typeof schema.slot === 'string') {
		return ['input'];
	}
	return Object.keys(schema.slot || {});
};

const formItemChange = (payload) => {
  emit('change', payload)
}

defineExpose({
	getFormInstance: () => unref(formRef),
	getValues,
  getFieldValues,
  setFieldValues,
	validate,
	clearValidate,
	scrollToField,
});
</script>

<template>
	<van-form ref="formRef" v-bind="{ ...props, ...$attrs }" >
		<template v-for="schema in formSchemas" :key="schema.field">
      <van-row :gutter="24">
        <FormItem :form-modal="formModal" :schema="schema" :rules="formRules[schema.field]" :label-width="labelWidth" @change="formItemChange">
          <template v-for="slotName in getFormItemSlotNames(schema)" #[slotName]="data">
            <slot :name="typeof schema.slot === 'string' ? schema.slot : schema.slot[slotName]" v-bind="data"></slot>
          </template>
        </FormItem>
      </van-row>
		</template>
	</van-form>
</template>

<style scoped lang="less"></style>