<template>
  <div class="Header clearfix">
    <div class="logo" @click="goHome">STORE KEEPER</div>
    <div class="fr">
      <i class="iconfont icon-gerenzhongxin" @click="goCenter"></i>
    </div>

  </div>
</template>

<script>
export default {
  name: "Header",
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
  .icon-gerenzhongxin{
    font-size: 26px;
    margin: 0 10px;
    cursor: pointer;
  }
}

</style>
