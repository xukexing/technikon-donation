import { ref } from "vue";

export default function () {
  const formRef = ref(null);

  const formModal = ref({});
  const formRules = ref({});

  return {
    formRef,
    formModal,
    formRules,
  };
}