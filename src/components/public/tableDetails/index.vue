<template>
  <div class="tableDetails">
    <i class="iconfont icon-fullscreen-shrink" @click="hideCharts('channel')"></i>
    <h2>销售额-{{typeObject[type]}}</h2>

  </div>
</template>

<script>
  import dropTree from '../dropTree/index'
  export default {
    name: "index",
    props:{
      type:[String],
    },
    components:{
      dropTree
    },
    data(){
      return {
        typeObject:{
          channel:'销售途径',
          product:'产品类型',
          time:'时间',
        },
        timeType:'days',
      }
    },
    methods:{
      hideCharts(){
        this.$emit('close')
      },
      //获取销售途径
      getChannel(){
        this.channelOptions = require('../../../util/baseData').default.channel
        this.channelOptions.forEach(item=>this.mapObject.channel[item.value] = item.label)
      },
      //获取产品名称选项和产品chart的map
      getProduct(){
        this.productOptions = require('../../../util/baseData').default.teaType
        //处理map todo
      },
    },
    mounted() {
      this.getChannel()
      this.getProduct()



    }
  }
</script>

<style lang="less" scoped>
  .tableDetails{
    width: 100%;
    height: calc(100vh - 30px);
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    h2{
      line-height: 70px;
      padding-left: 20px;
    }
    .icon-fullscreen-shrink{
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 30px;
      color: #606266;
      cursor: pointer;
      &:hover{
        color: #409eff;
      }
    }
  }

</style>
