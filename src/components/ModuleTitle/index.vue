<script setup>
import SvgIcon from '../SvgIcon.vue';

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="module-title">
    <svg-icon icon-class="title-bg" class-name="title-bg-icon"></svg-icon>
    <span class="title-text">
      {{ props.title }}
    </span>
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
.module-title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0 16px 32px;
  box-sizing: border-box;

  .title-bg-icon {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 109.5px;
    height: 42px;
  }

  .title-text {
    font-size: 34px;
    font-weight: 500;
    color: #333;
    position: relative;
  }
}
</style>