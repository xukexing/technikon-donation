<script setup>
defineEmits(['click'])
</script>

<template>
<div class="card-button" @click="$emit('click')">
<div class="inner">
  <slot name="default" />
  <slot v-if="$slots['right-icon']" name="right-icon"/>
  <svg-icon v-else icon-class="arrow-right-face" class-name="card-button-arrow"></svg-icon>
</div>
</div>
</template>

<style scoped lang="less">
.card-button {
  display: inline-block;
  padding: 16px 24px;
  color: var(--color-primary, #33C27B);
  border-radius: 48px;
  background: #FFF;
  /* 阴影 */
  box-shadow: 0px 4px 10px 0px rgba(51, 51, 51, 0.20);

  .inner {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }
  .card-button-arrow {
    width: 24px;
    height: 24px;
  }
}
</style>