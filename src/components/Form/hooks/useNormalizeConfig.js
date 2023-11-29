export default function useNormalizeConfig (isFormItemLink) {
  const getDefaultDisabled = ({ disabled } = {}) => {
    return disabled !== undefined ? disabled : false;
  }
  
  const getDefaultPlaceholder = ({ name, props } = {}) => {
    if (props?.placeholder) return props.placeholder;
    return ['Input'].includes(name) ? '请输入' : '请选择';
  };
  
  const getDefaultReadonly = ({ name, props } = {}) => {
    if (props?.readonly !== undefined) return props?.readonly;
    if (isFormItemLink(name)) {
      return true
    }
    return false
  };
  
  const getDefaultClickable =  ({ name, props } = {}) => {
    if (props?.clickable !== undefined) return props?.clickable;
    if (isFormItemLink(name)) {
      return true
    }
    return false
  };
  
  return {
    getDefaultDisabled,
    getDefaultPlaceholder,
    getDefaultReadonly,
    getDefaultClickable
  }
}