<script setup>
import SvgIcon from '../SvgIcon.vue';

const props = defineProps({
  icon: String
})
</script>

<template>
  <div class="header">
    <SvgIcon :icon-class="props.icon" class-name="title-icon" />
  </div>
</template>

<style scoped lang="less">
.header {
  display: flex;
  align-items: center;
  justify-content: center;

  .title-icon {
    height: 160px;
    width: 100%;
  }
}
</style>