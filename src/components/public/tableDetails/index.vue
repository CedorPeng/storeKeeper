<template>
  <div class="tableDetails">
    <i class="iconfont icon-fullscreen-shrink" @click="hideCharts('channel')"></i>
  </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return {

      }
    },
    methods:{
      hideCharts(){
        this.$emit('close')
      }
    },
    mounted() {

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
