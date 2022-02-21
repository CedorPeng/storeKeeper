<template>
  <div class="Header clearfix">
    <div class="logo" @click="goHome">STORE KEEPER</div>
    <div class="fr headerIcon">
      <i class="iconfont icon-gerenzhongxin" @click="goCenter"></i>
      <i class="iconfont icon-xiaoxi"></i>
      <span class="msgBox">{{messageNum}}</span>
    </div>

  </div>
</template>

<script>
export default {
  name: "Header",
  data(){
    return {
      messageNum:1
    }
  },
  methods:{
    goHome(){
      this.$router.push({name:'homePage'})
    },
    goCenter(){
      this.$router.push({name:'storeManage'})
    },
  }
}
</script>

<style lang="less" scoped>
.Header{
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  line-height: 50px;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid rgba(238,238,238,.8);
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 5%);
  .logo{
    display: inline-block;
    font-size: 25px;
    font-weight: 700;
    text-indent: 18px;
    cursor: pointer;
  }
  .headerIcon{
    position: relative;
    padding-right: 10px;
    .msgBox{
      height: 16px;
      line-height: 16px;
      text-align: center;
      width: 16px;
      border-radius: 16px;
      background: red;
      color: #FFFFFF;
      position: absolute;
      top: 5px;
      right: 16px;
      font-size: 12px;
      cursor: pointer;
    }
    .iconfont{
      font-size: 26px;
      margin-right: 10px;
      cursor: pointer;
      &.icon-xiaoxi{
        font-size: 24px;
      }
    }
  }
}

</style>
