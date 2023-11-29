export const customProps = {
  formSchemas: {
    type: Array,
    default: () => ([])
  },
  formData: {
    type: Object,
    default: () => ({})
  }
}

export const baseProps = {
  labelWidth: {
    type: [String, Number],
    default: '6.2em'
  },
  labelAlign: {
    type: String,
    default: 'left'
  },
  inputAlign: {
    type: String,
    default: 'right'
  },
  colon: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: [Boolean, 'String'],
    default: false
  },
  scrollToError: {
    type: Boolean,
    default: true
  },
  showError: {
    type: Boolean,
    default: true
  },
  showErrorMessage: {
    type: Boolean,
    default: true
  },
  errorMessageAlign: {
    type: String,
    default: 'right'
  }
}