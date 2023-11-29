<script setup>
defineProps({
  info: Object,
  index: Number
})
</script>

<template>
<div class="FQA-item">
  <div class="question">
    <svg-icon icon-class="question" class-name="question-icon"/>
    <p>{{ index }}.{{ info.q }}</p>
  </div>
  <div class="answer">
    <svg-icon icon-class="answer" class-name="answer-icon"/>
    <p>
      答：{{ info.a }}
    </p>
  </div>
</div>
</template>

<style scoped lang="less">
.FQA-item {
  margin-bottom: 30px;
}
.question {
  display: flex;
  align-items: flex-end;
  margin-bottom: 48px;

  .question-icon {
    font-size: 80px;
    flex-shrink: 0;
    position: relative;
    bottom: -6px;
  }

  p {
    width: 100%;
    margin-left: -6px;
    padding-left: 20px;
    padding-bottom: 13.5px;
    border-bottom: 4px solid #fff;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    color: #FFF;
    font-family: PingFang SC;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    box-sizing: border-box;
  }
}

.answer {
  position: relative;
  border-radius: 48px;
  border: 8px solid #479355;
  background: linear-gradient(180deg, #FFF 0%, #F9FFFA 61.98%, #DCEDDC 100%);
  box-shadow: 0px 4px 4px 0px #50B160;
  padding: 48px;
  box-sizing: border-box;

  color: var(--666666, #666);
  text-align: justify;
  font-family: PingFang SC;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: 42px;

  .answer-icon {
    position: absolute;
    top: -32px;
    right: -14px;
    font-size: 80px;
  }
}
</style>