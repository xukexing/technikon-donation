const isArrayValueOfComponents = (name) => ['DatePicker', 'TimePicker', 'Select', 'Picker'].includes(name)

export default function () {
	const initFormModel = (formSchemas = []) => {
		return formSchemas.reduce((obj, schema) => {
			const { props, name, defaultValue } = schema.itemRender || {};
			let value = (props?.multiple || isArrayValueOfComponents(name)) ? [] : '';
			
			
			if (defaultValue !== undefined) {
				value = typeof defaultValue === 'function' ? defaultValue(schema) : defaultValue;
			}
			
			return {
				...obj,
				[schema.field]: value,
			};
		}, {});
	};

	const generateRulesBySchemas = (formSchemas = []) => {
		const rules =
			formSchemas?.reduce((obj, schema) => {
				const { label, field, required, rules, validateType, itemRender } = schema;
				if (required) {
					const message = ['Input'].includes(itemRender?.name) ? `请输入${label}` : `请选择${label}`;
					const trigger = ['blur', 'change'];
					let type = validateType || 'string';
					if (itemRender?.props?.multiple) {
						type = 'array';
					} else if (isArrayValueOfComponents(itemRender?.name)) {
						type = 'array';
					} else if (['InputNumber'].includes(itemRender?.name)) {
						type = 'number';
					} else if (['Radio'].includes(itemRender?.name)) {
						const value = itemRender?.props?.options[0]?.value;
						type = value !== undefined ? typeof value : 'string';
					} else if (['Switch'].includes(itemRender?.name)) {
						const activeValue = itemRender?.props?.['active-value'] ?? itemRender?.props?.['activeValue'];
						type = activeValue !== undefined ? typeof activeValue : 'boolean';
					}
					obj[field] = [{ required, message, trigger, type }];
				}
				if (rules && Array.isArray(rules)) {
					obj[field] = [...(obj[field] || []), ...rules];
				}
				return obj;
			}, {}) || {};
		return rules;
	};

	return {
		initFormModel,
		generateRulesBySchemas,
	};
}