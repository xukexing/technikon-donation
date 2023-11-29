<script setup>
import { computed, ref, unref, watchEffect } from 'vue';
import useNormalizeConfig from '../hooks/useNormalizeConfig.js';
import { CustomPickerFieldNamesDefault } from '../model/const.js';

const props = defineProps({
	formModal: {
		type: Object,
		default: () => ({}),
	},
	schema: {
		type: Object,
		default: () => ({}),
	},
	rules: {
		type: Array,
		default: () => [],
	},
  labelWidth: {
    type: [String, Number],
    default: '6.2em',
  }
});

const emit = defineEmits(['change'])

const renderComponentName = computed(() => props.schema?.itemRender?.name);

const needPopupComponentName = ['DatePicker', 'TimePicker', 'Cascader', 'Select', 'Picker', 'Calendar'];
const isFormItemLink = (renderName) => {
	return needPopupComponentName.includes(renderName);
};

const { getDefaultDisabled, getDefaultPlaceholder, getDefaultReadonly, getDefaultClickable } = useNormalizeConfig(isFormItemLink);

const valueSeparator = computed(() => {
	return props.schema?.itemRender?.valueSeparator;
});

const pickerValue = ref('');

const showPicker = ref(false);
const onPickerConfirm = ({ selectedOptions }, fieldName = 'text', separator = '/') => {
	if (['Select', 'Picker'].includes(unref(renderComponentName))) {
		fieldName = props.schema?.itemRender?.props?.columnsFieldNames?.text || CustomPickerFieldNamesDefault.text;
	}
	separator = unref(valueSeparator) || separator || '/';
	pickerValue.value = selectedOptions.map((item) => item[fieldName]).join(separator);

	showPicker.value = false;

  emit('change', {
    field: props.schema.field,
    value: props.formModal[props.schema.field],
    model: props.formModal
  })
};

const calendarPopupShow = ref(false);
const onCalendarConfirm = (value) => {
	pickerValue.value = calendarDateFormatter(value);
	props.formModal[props.schema.field] = calendarDateFormatter(value);
	calendarPopupShow.value = false;
};

const fieldClick = () => {
	if (unref(renderComponentName) === 'Calendar') {
		calendarPopupShow.value = true;
	} else {
		showPicker.value = true;
	}
};

const calendarDateFormatter = (value) => {
	const date = new Date(value);
	const year = String(date.getFullYear()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return [year, month, day].join(unref(valueSeparator) || '/');
};

watchEffect(() => {
  if (['Select', 'Picker'].includes(unref(renderComponentName))) {
    const { options = [], columnsFieldNames = {} } = props.schema.itemRender?.props || {}
    const text = options?.find(item => item[columnsFieldNames.value || CustomPickerFieldNamesDefault.value] === props.formModal[props.schema.field])?.[columnsFieldNames.text || CustomPickerFieldNamesDefault.text]
    pickerValue.value = text || ''
    console.log(pickerValue.value, options)
  }
})
</script>

<template>
  <van-col :span="schema.span || 24">
    <van-field
      v-if="!isFormItemLink(renderComponentName)"
      v-model="formModal[schema.field]"
      :name="schema.field"
      :type="schema.itemRender?.props?.type"
      :placeholder="getDefaultPlaceholder(schema.itemRender)"
      :disabled="getDefaultDisabled(schema.itemRender)"
      :readonly="getDefaultReadonly(schema.itemRender)"
      :clickable="getDefaultClickable(schema.itemRender)"
      :rules="rules || []"
      required="auto"
      :clearable="schema.itemRender?.props?.clearable || true"
      :is-link="isFormItemLink(renderComponentName)"
      :label="schema.label || ''"
      :label-width="schema.labelWidth || labelWidth"
      v-bind="schema.itemRender?.props || {}"
    >
      <template v-if="$slots.label" #label>
        <slot name="label"></slot>
      </template>
      <template v-if="$slots.leftIcon" #left-icon>
        <slot name="leftIcon"></slot>
      </template>
      <template v-if="$slots.rightIcon" #right-icon>
        <slot name="rightIcon"></slot>
      </template>
      <template v-if="$slots.button" #button>
        <slot name="button"></slot>
      </template>
      <template v-if="$slots.input" #input>
        <slot name="input" v-bind="{ model: formModal, field: schema.field, value: formModal[schema.field] }"></slot>
      </template>
      <template v-if="renderComponentName === 'Radio'" #input>
        <van-radio-group v-model="formModal[schema.field]" direction="horizontal" v-bind="schema.itemRender?.props?.radioGroupProps || {}">
          <van-radio v-for="radio in schema.itemRender?.props?.options || []" :name="radio.value" v-bind="schema.itemRender?.props?.radioProps || {}">{{
            radio.label
            }}</van-radio>
        </van-radio-group>
      </template>
      <template v-if="renderComponentName === 'Checkbox'" #input>
        <van-checkbox-group v-model="formModal[schema.field]" direction="horizontal" a>
          <van-checkbox
            v-for="checkbox in schema.itemRender?.props?.options || []"
            :name="checkbox.value"
            shape="square"
            v-bind="schema.itemRender?.props?.checkboxProps || {}"
          >{{ checkbox.label }}</van-checkbox
          >
        </van-checkbox-group>
      </template>
      <template v-if="renderComponentName === 'Switch'" #input>
        <van-switch v-model="formModal[schema.field]" v-bind="schema.itemRender?.props || {}" />
      </template>
    </van-field>
    <van-field
      v-else
      v-model="pickerValue"
      :name="schema.field"
      :placeholder="getDefaultPlaceholder(schema.itemRender)"
      :disabled="getDefaultDisabled(schema.itemRender)"
      :readonly="getDefaultReadonly(schema.itemRender)"
      :clickable="getDefaultClickable(schema.itemRender)"
      :rules="rules || []"
      required="auto"
      :clearable="schema.itemRender?.props?.clearable || true"
      :is-link="isFormItemLink(schema.itemRender.name)"
      :label="schema.label || ''"
      :label-width="schema.labelWidth || labelWidth"
      @click="fieldClick"
    >
      <template v-if="$slots.label" #label>
        <slot name="label"></slot>
      </template>
      <template v-if="$slots.leftIcon" #left-icon>
        <slot name="leftIcon"></slot>
      </template>
      <template v-if="$slots.rightIcon" #right-icon>
        <svg-icon icon-class="calendar"></svg-icon>
      </template>
      <template v-if="$slots.button" #button>
        <slot name="button"></slot>
      </template>
      <template v-if="$slots.input" #input>
        <slot name="input" v-bind="{ model: formModal, field: schema.field, value: formModal[schema.field] }"></slot>
      </template>
      <template v-else #input>
        <span :class="{ 'placeholder-class': !pickerValue }">{{ pickerValue ? pickerValue : getDefaultPlaceholder(schema.itemRender) }}</span>
      </template>
    </van-field>
  </van-col>

	<van-popup v-model:show="showPicker" round position="bottom">
		<van-picker
			v-if="['Select', 'Picker'].includes(renderComponentName)"
			v-model="formModal[schema.field]"
			:columns="schema.itemRender.props?.options || []"
			:columns-field-names="schema.itemRender.props?.columnsFieldNames || CustomPickerFieldNamesDefault"
			@confirm="onPickerConfirm"
			@cancel="showPicker = false"
		/>

		<van-time-picker
			v-if="renderComponentName === 'TimePicker'"
			v-model:value="formModal[schema.field]"
			:columns-type="schema.itemRender?.props?.columnsType || ['hour', 'minute', 'second']"
			v-bind="schema.itemRender?.props || {}"
			@confirm="onPickerConfirm"
			@cancel="showPicker = false"
		/>

		<van-date-picker
			v-if="renderComponentName === 'DatePicker'"
			v-model:value="formModal[schema.field]"
			:columns-type="schema.itemRender?.props?.columnsType || ['year', 'month', 'day']"
			v-bind="schema.itemRender?.props"
			@confirm="onPickerConfirm"
			@cancel="showPicker = false"
		/>
	</van-popup>

	<van-calendar
		v-if="renderComponentName === 'Calendar'"
		v-model:show="calendarPopupShow"
		v-bind="schema.itemRender?.props || {}"
		@confirm="onCalendarConfirm"
		@cancel="calendarPopupShow = false"
	/>
</template>

<style scoped lang="less">
.placeholder-class {
	color: var(--cccccc, #ccc);
}
</style>