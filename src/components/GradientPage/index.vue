<script setup>
const props = defineProps({
  showTitle: {
    type: Boolean,
    default: true
  },
  titleIcon: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="gradient-page">
    <PageTitle v-if="showTitle" :icon="titleIcon" class="gradient-page-title" />
    <div class="page-main">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
.gradient-page {
  background: url("../../assets/img/bg-grids.png") repeat 100%, linear-gradient(167deg, #67BE7A 8.66%, #7EBE67 92.45%);
  min-height: 100vh;
  padding: 24px 0;
  box-sizing: border-box;

  .page-main {
    padding: 0 32px;
    box-sizing: border-box;
  }
  .gradient-page-title {
    margin-bottom: 30px;
  }
}
</style>