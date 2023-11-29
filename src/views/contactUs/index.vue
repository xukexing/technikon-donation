<script setup>

</script>

<template>
  <GradientPage title-icon="contact-us">
    <Card>
      <div class="info-item">
        <span class="label">地址</span>：
        <p class="content">重庆市巴南区红光大道69号重庆理工大学明德楼524室、526室</p>
      </div>
      <div class="info-item">
        <span class="label">电话</span>：
        <p class="content">023-62563029</p>
      </div>
      <div class="info-item">
        <span class="label">传真</span>：
        <p class="content">023-62563029</p>
      </div>
      <div class="info-item">
        <span class="label">联系人</span>：
        <p class="content">杨老师、侯老师</p>
      </div>
      <div class="info-item">
        <span class="label">邮政编码</span>：
        <p class="content">400054</p>
      </div>
      <div class="info-item">
        <span class="label">邮箱</span>：
        <p class="content">jjh@vip.cqut.edu.cn</p>
      </div>
      <div class="footer">
        <img src="@/assets/img/weixin-qrcode.png"/>
        <span>微信二维码</span>
      </div>
    </Card>
  </GradientPage>

</template>

<style scoped lang="less">
.info-item {
  display: flex;
  align-items: flex-start;
  padding: 8px 0;
  margin-bottom: 24px;
  box-sizing: border-box;
  font-family: PingFang SC;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:last-child {
    margin-bottom: 0;
  }

  .label {
    display: inline-block;
    flex-shrink: 0;
    width: 140px;
    padding-left: 20px;
    box-sizing: border-box;
    color: var(--666666, #666);
    text-align:justify;
    text-align-last:justify
  }

  .content {
    margin-left: 24px;
    color: var(--333333, #333);
    font-family: PingFang SC;
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 48px;

  img {
    width: 344px;
    height: 344px;
    object-fit: cover;
    border: 4px solid var(--color-primary, #33C27B);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
  }

  span {
    display: inline-block;
    margin-top: 16px;
    color: var(--color-primary);
    font-family: PingFang SC;
    font-size: 30px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
}
</style>