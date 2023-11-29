<script setup>
import { ref } from 'vue'
import FQAItem from './components/FQA-Item.vue';

const list = ref([
  {
    q: '为什么需要社会捐赠？',
    a: '高校的发展需要雄厚的资金作为支持，重庆理工大学一直以来都受到国家在财政上的大力支持。 但随着我国教育体制改革的不断完善与深入，以及高等教育大众化的推进，单一渠道的国家财政拨款 已经无法满足我国公立大学的发展需要，将重庆理工大学建设成为特色鲜明、在国际上有影响的 高水平研究型大学，需要校友及社会爱心人士的大力支持。'
  },
  {
    q: '捐款人能不能决定捐款用途？',
    a: '答：捐赠可以指定用途，也可以不指定用途。对于指定用途的捐赠，我们将根据捐赠人的意愿与 捐赠人签署捐赠协议，重庆理工大学教育基金会保证捐赠款的使用完全符合捐赠人的意愿。 对于非限定用途的捐赠，我们将用于学校教育事业的发展。'
  },
  {
    q: '捐赠有最低限制吗？',
    a: '捐赠金额没有限制，您的每一份爱心都是对重庆理工大学发展的支持，都是温暖的情谊，我们对此表示由衷的感谢。'
  }
])
</script>

<template>
  <GradientPage title-icon="FQA">
    <FQAItem v-for="(item, index) in list" :info="item" :index="index"/>
  </GradientPage>
</template>

<style scoped lang="less">

</style>