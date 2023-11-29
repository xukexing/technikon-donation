import { ref, unref } from 'vue'
const selectedProject = ref({})

export const getSelectedProject = () => {
  return unref(selectedProject)
}

export const setSelectedProject = (project) => {
  selectedProject.value = project
}