<script setup>
import ModuleTitle from './components/ModuleTitle.vue';
import DescriptionItem from './components/DescriptionItem.vue';

// const info = rea
</script>

<template>
  <GradientPage title-icon="donation-way">
    <Card class="m-b-30">
      <ModuleTitle title="方式一：银行汇款" />
      <div class="bank-item">
        <DescriptionItem label="户名：">
          重庆理工大学教育发展基金会
        </DescriptionItem>
        <DescriptionItem label="账号：">
          50001033600050241742
        </DescriptionItem>
        <DescriptionItem label="开户行：">
          建行重庆杨家坪支行营业部
        </DescriptionItem>
      </div>

      <div class="bank-item">
        <DescriptionItem label="户名：">
          重庆理工大学教育发展基金会
        </DescriptionItem>
        <DescriptionItem label="账号：">
          123907835010802
        </DescriptionItem>
        <DescriptionItem label="开户行：">
          招商银行重庆分行九龙坡支行
        </DescriptionItem>
      </div>
    </Card>

    <Card class="m-b-30">
      <ModuleTitle title="方式二：支付宝捐赠" />
      <DescriptionItem label="支付宝户名：">
        重庆理工大学教育发展基金会
      </DescriptionItem>
      <DescriptionItem label="支付宝账号：">
        jjh@vip.cqut.edu.cn
      </DescriptionItem>
    </Card>

    <Card class="m-b-30">
      <ModuleTitle title="方式三：邮局汇款" />
      <DescriptionItem label="地址：">
        重庆市巴南区红光大道69号
      </DescriptionItem>
      <DescriptionItem label="邮政编码：">
        400054
      </DescriptionItem>
      <DescriptionItem label="收款人：">
        重庆理工大学教育发展基金会
      </DescriptionItem>
    </Card>

    <Card class="m-b-30">
      <ModuleTitle title="方式四：现金捐赠" />
      <DescriptionItem label="地址：">
        重庆市巴南区红光大道69号明德楼524室
      </DescriptionItem>
      <DescriptionItem label="联系人：">
        杨老师 侯老师
      </DescriptionItem>
      <DescriptionItem label="联系电话：">
        023-62563029
      </DescriptionItem>
    </Card>
  </GradientPage>

</template>

<style scoped lang="less">
.page {
  min-height: 100vh;
  background-blend-mode: multiply
}
.header {
  display: flex;
  align-items: center;
  justify-content: center;
}
.donation-flow-icon {
  width: 385.015px;
  height: 160px;
}

.module {
  padding: 48px 32px;
  box-sizing: border-box;
  border-radius: 48px;
  border: 8px solid #479355;
  background: linear-gradient(180deg, #FFF 0%, #F9FFFA 61.98%, #DCEDDC 100%);
  box-shadow: 0px 4px 4px 0px #50B160;
}

.bank-item {
  margin-top: 16px;

  &:first-child {
    margin-top: 0;
  }
}
</style>