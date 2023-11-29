import { unref } from 'vue'

export default function (formRef, formModal) {
  const getValues = () => unref(formRef)?.getValues()
  
  const getFieldValues = () => unref(formModal)
  
  const setFieldValues = (data) => {
    formModal.value = {
      ...unref(formModal),
      ...data
    }
  }
  
  const validate = (field) => unref(formRef)?.validate(field)
  
  const clearValidate = (field) => unref(formRef)?.resetValidation(field)
  
  const scrollToField = (name, alignToTop = true) => unref(formRef)?.scrollToField(name, alignToTop)
  
  return {
    getValues,
    getFieldValues,
    setFieldValues,
    validate,
    clearValidate,
    scrollToField
  }
}