<template>
  <div class="storeManage">
    <el-tabs v-model="tabActive" @tab-click="tabActiveChange">
      <el-tab-pane label="店铺信息" name="storeMessage"></el-tab-pane>
      <el-tab-pane label="产品管理" name="productManage"></el-tab-pane>
      <el-tab-pane label="角色管理" name="roleManage"></el-tab-pane>
      <el-tab-pane label="员工管理" name="memberManage"></el-tab-pane>
    </el-tabs>
    <div class="storeContent">
      <component :is="currentActive"></component>
    </div>
  </div>
</template>

<script>
import storeMessage from './storeMessage/index'
import productManage from './productManage/index'
import roleManage from './roleManage/index'
import memberManage from './memberManage/index'
export default {
  name: "index",
  components:{
    storeMessage,
    productManage,
    roleManage,
    memberManage
  },
  data(){
    return {
      tabActive:'storeMessage',
      currentActive:'storeMessage',
    }
  },
  methods:{
    tabActiveChange(){
      if(this.currentActive === this.tabActive) return
      this.currentActive = this.tabActive


    }
  },
}
</script>

<style lang="less" scoped>
.storeManage{
  width: 100%;
  height: 100%;
}
</style>
