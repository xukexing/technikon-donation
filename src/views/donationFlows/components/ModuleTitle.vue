<script setup>
const props = defineProps({
  title: String
})
</script>

<template>
<div class="module-title">
  <svg-icon icon-class="title-bg" class-name="title-icon" />
  <span class="title-label">{{ props.title }}</span>
</div>
</template>

<style scoped lang="less">
.module-title {
  display: flex;
  align-items: flex-end;
  position: relative;
  padding-left: 74px;

  .title-label {
    color: var(--color-primary);
    font-family: PingFang SC;
    font-size: 42px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .title-icon {
    width: 109.5px;
    height: 42px;
    flex-shrink: 0;
    position: absolute;
    left: 0;
    bottom: 6px;
  }
}
</style>