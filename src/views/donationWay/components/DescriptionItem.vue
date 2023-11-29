<script setup>
const props = defineProps({
  label: String
})
</script>

<template>
<div class="description-item">
  <span class="label">{{ props.label }}</span>
  <p class="content">
    <slot></slot>
  </p>
</div>
</template>

<style scoped lang="less">
.description-item {
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
  padding: 8px 0;

  .label {
    display: inline-block;
    width: 170px;
    margin-right: 24px;
    color: var(--666666, #666);
    text-align: right;
    /* T2/28px */
    font-family: PingFang SC;
    font-size: 28px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .content {
    color: var(--333333, #333);
    font-family: PingFang SC;
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
}
</style>