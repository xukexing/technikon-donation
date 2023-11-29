import { ref } from 'vue';

export const showNavBar = ref(false)

export const getNavBarState = () => {
  return showNavBar
}

export const setNavBarState = (state) => {
  showNavBar.value = state
}