<script setup>
import { showNavBar } from './store/navBar.js';
</script>

<template>
  <van-sticky>
    <van-nav-bar
      v-show="showNavBar"
      :title="$route.meta.title"
      left-arrow
      @click-left="$router.back()"
    />
  </van-sticky>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" v-if="$route.meta?.keepAlive" :key="$route.fullPath" />
    </keep-alive>
    <component :is="Component" v-if="!$route.meta?.keepAlive" :key="$route.fullPath" />
  </router-view>

  <van-back-top :offset="300"/>
</template>
<style lang="less">
.page {
  padding: 24px 32px;
  box-sizing: border-box;
  background-color: #fff;
  min-height: 100vh;
}

.m-b-30 {
  margin-bottom: 30px;
}

input,
textarea {
  caret-color: var(--color-primary);
}

.look-all {
  color: var(--666666, #666);
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .look-all-text {
    display: block;
    font-family: PingFang SC;
    font-size: 30px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .arrow-right-icon {
    margin-left: 10px;
    width: 38px;
    height: 36px;
    margin-top: 0.17em;
  }
}

</style>
