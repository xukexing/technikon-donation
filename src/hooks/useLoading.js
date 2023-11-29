import { ref } from 'vue'

export default function useLoading () {
  const loading = ref(false)
  const setLoading = (state) => {
    loading.value = state
  }
  return [loading, setLoading]
}