<template>
<div class="module-container">
  <slot></slot>
</div>
</template>

<style scoped lang="less">
.module-container {
  padding: 48px 32px;
  box-sizing: border-box;
  border-radius: 48px;
  border: 8px solid #479355;
  background: linear-gradient(180deg, #FFF 0%, #F9FFFA 61.98%, #DCEDDC 100%);
  box-shadow: 0px 4px 4px 0px #50B160;
  margin-bottom: 30px;
}
</style>