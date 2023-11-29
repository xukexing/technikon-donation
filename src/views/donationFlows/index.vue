<script setup>
import { ref } from 'vue'

const flowNodes = ref([
  {
    content: '捐赠方与基金会秘书处联系。\n联系人：杨老师，侯老师；\n联系电话：023-62563029。'
  },
  {
    content: '捐赠方与基金会一起协商并达成初步捐赠意向。'
  },
  {
    content: '捐赠方与基金会协商捐赠金额、用途及支付方式，制定捐赠协议书。'
  },
  {
    content: '捐赠方与基金会签署捐赠协议。'
  },
  {
    content: '捐赠方按照捐赠协议的要求将捐赠资金转入基金会账户或将所捐赠物品运至双方指定位置。'
  },
  {
    content: '基金会在收到捐赠资金或实物10日内向捐赠方开具公益事业捐赠收据，并根据捐赠方意愿，在基金会官网上予以公布。（根据捐赠方意愿，双方视情况举行捐赠仪式，颁发捐赠证书。）'
  },
  {
    content: '基金会监督捐赠项目的实施，并向捐赠方及时汇报项目的实施情况。捐赠方接收项目执行报告。'
  }
])
</script>

<template>
  <GradientPage title-icon="donation-flow">
    <div v-for="(item, index) in flowNodes" :key="index" class="node-wrapper">
      <span class="node-tail">{{ index + 1 }}</span>
      <i class="flow-border-line"></i>
      <Card class="node-content">
        <div class="flow-node">
          <!--<span class="sequence">{{ index + 1 }}.</span>-->
          <pre class="content">{{ item.content }}</pre>
        </div>
      </Card>
    </div>
  </GradientPage>

</template>

<style scoped lang="less">
.node-wrapper {
  padding-bottom: 32px;
  position: relative;
  display: flex;

  .flow-border-line {
    display: inline-block;
    position: absolute;
    left: 24px;
    top: 40px;
    height: 100%;
    width: 6px;
    background: linear-gradient(#fff 50%, transparent 50%) repeat;
    background-size: 6px 30px;
    // ios上不显示
    //border-left: 6px dotted #fff;
    z-index: 1;
  }

  &:last-child .flow-border-line {
    display: none;
  }

  .node-tail {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 54px;
    height: 54px;
    margin: 40px 10px 0 0;
    border: 8px solid #fff;
    border-radius: 50%;
    font-size: 28px;
    font-weight: 500;
    color: #fff;
    box-sizing: border-box;
    background: var(--color-primary);
    box-shadow: 0px 4px 4px 0px #50B160;;
    z-index: 2;
  }

  .node-content {
    flex: 1;
    flex-shrink: 0;

    .flow-node {
      display: flex;
      align-items: flex-start;


      .sequence {
        display: inline-block;
        margin-right: 8px;
        flex-shrink: 0;
        color: var(--color-primary, #33C27B);
        font-size: 38px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }

      .content {
        color: var(--333333, #333);
        font-family: PingFang SC;
        font-size: 28px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
  }
}
</style>