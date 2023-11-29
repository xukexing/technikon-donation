<script setup>

</script>

<template>
<div class="project-donation-item">
  <img src="@/assets/img/project-img.png" class="project-img">
  <div class="right-info">
    <p class="project-name single-text-hidden">林荫大道项目</p>
    <p class="detail">
      <span class="classify">已捐金额：</span>
      <span class="value">71.23</span>
      <span class="unit">元</span>
    </p>
    <p class="detail">
      <span class="classify">捐赠次数：</span>
      <span class="value">3</span>
      <span class="unit">次</span>
    </p>
  </div>
</div>
</template>

<style scoped lang="less">
.project-donation-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 16px;
  border-bottom: 1px solid var(--eeeeee, #EEE);
  background: #FFF;

  .project-img {
    width: 200px;
    height: 150px;
    border-radius: 8px;
    overflow: hidden;
    object-fit: cover;
    margin-right: 16px;
  }

  .right-info {
    width: 438px;
    overflow: hidden;

    .project-name {
      color: var(--333333, #333);
      font-size: 30px;
      font-weight: 500;
    }

    .detail {
      display: flex;
      align-items: center;
      color: var(--666666, #666);
      margin-top: 16px;

      .classify {
        font-size: 24px;
        font-weight: 400;
      }

      .value {
        font-size: 24px;
        font-weight: 500;
        color: var(--color-primary);
      }

      .unit {
        font-size: 28px;
        font-weight: 500;
      }
    }
  }
}
</style>