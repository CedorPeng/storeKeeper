<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <div class="menu" :style="{width : toggleTrue ? '266px' : '60px'}">
<!--        <p>-->
<!--          <i :class="toggleTrue ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="toggleTrue = !toggleTrue"></i>-->
<!--        </p>-->
        <div :class="menuActive === 'homePage' ? 'active' : ''" @click="changeMenu('homePage')">
          <i class="iconfont icon-home"></i>
          <span v-show="toggleTrue">首页</span>
        </div>
        <div :class="menuActive === 'sale' ? 'active' : ''" @click="changeMenu('sale')">
          <i class="iconfont icon-salecanter"></i>
          <span v-show="toggleTrue">销售管理</span>
        </div>
        <div :class="menuActive === 'stock' ? 'active' : ''" @click="changeMenu('stock')">
          <i class="iconfont icon-cangkukucun"></i>
          <span v-show="toggleTrue">库存</span>
        </div>
        <div :class="menuActive === 'purchase' ? 'active' : ''" @click="changeMenu('purchase')">
          <i class="iconfont icon-rukudan"></i>
          <span v-show="toggleTrue">采购管理</span>
        </div>
        <div :class="menuActive === 'storeManage' ? 'active' : ''" @click="changeMenu('storeManage')">
          <i class="iconfont icon-setting"></i>
          <span v-show="toggleTrue">店铺设置</span>
        </div>
      </div>
      <div class="content">
        <router-view/>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/homePage/header/index'
import Footer from './components/homePage/Footer/index'
export default {
  name: 'App',
  components:{
    Header,
    Footer,
  },
  data(){
    return {
      menuActive:'',
      toggleTrue:true,
    }
  },
  watch:{
    $route:{
      handler(val,oldval){
        this.menuActive = val.name
      },
      // 深度观察监听
      deep: true
    }
  },
  methods:{
    changeMenu(type){
      if(this.menuActive === type) return
      this.menuActive = type
      this.$router.push({name:type})
    }
  },
  mounted() {
    this.menuActive = this.$route.name
  }
}
</script>

<style lang="less">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*{
  margin: 0;
  padding: 0;
  font-family: Roboto-Medium;
}
.fl{
  float:left;
}
.fr{
  float:right;
}
.main{
  display: flex;
  box-sizing: border-box;
  height: 100vh;
  padding: 50px 0 28px;
  .menu{
    height: 100%;
    box-sizing: border-box;
    //width: 200px;
    background: #fff;
    transition: all .3s;
    >p{
      line-height: 56px;
      padding: 0 10px;
      cursor: pointer;
      i{
        margin: 0 12px;
      }
    }
    >div{
      line-height: 56px;
      padding: 0 10px;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      i{
        margin: 0 12px;
      }
      &.active{
        color: #409eff;
      }
      &:hover{
        background-color: rgba(64,158,255,.2);
        box-shadow: 0 0 8px 0 rgba(232,237,250,.6),0 2px 4px 0 rgba(232,237,250,.6);
      }
    }

  }
  .content{
    width: 100%;
    height: 100% ;
    overflow: hidden;
    padding: 18px;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0 0 0 2px rgb(0 0 0 / 5%);

  }
}

.clearfix {
  &:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }
}

</style>
