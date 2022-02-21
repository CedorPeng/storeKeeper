<template>
  <div class="login">
    <div class="loginBox">
      <div class="currentTab">
        <div class="active">登 陆</div>
        <div>注 册</div>
      </div>
      <div class="inputBox">
        <div>
          <i class="iconfont icon-gerenzhongxin1"></i>
          <el-input placeholder="账号/手机号" v-model="username"></el-input>
        </div>
        <div>
          <i class="iconfont icon-suoding"></i>
          <el-input placeholder="密码" show-password v-model="password"></el-input>
        </div>
      </div>
      <div class="forgetPassword">忘记密码？</div>
      <div class="loginBtn" @click="login">登 陆</div>
      <div class="otherLogin">
        <div>
          <i class="iconfont icon-phone1"></i>
        </div>
        <div>
          <i class="iconfont icon-qqdenglu"></i>
        </div>
        <div>
          <i class="iconfont icon-weixindenglu"></i>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return {
        username:'',
        password:'',

      }
    },
    methods:{
      login(){
        if(this.username === ''){
          this.$message.warning('请输入用户名/手机号')
          return
        }
        if(this.password === ''){
          this.$message.warning('请输入密码')
          return
        }
        let params = {
          username:this.username,
          password:this.password,
        }
        console.log(params);
        this.utils.addCookie('token','cedor','1d')
        this.$parent.isLogin = true
      },
    },
    mounted() {

    }
  }
</script>

<style lang="less" scoped>
.login{
  position: fixed;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  background-image: url('../../assets/loginImg.jpeg');
  background-size: 100%;
  .loginBox{
    position: absolute;
    right: 90px;
    width: 400px;
    height: 400px;
    background-color: #000;
    opacity: 0.6;
    border-radius: 8px;
    .currentTab{
      width: 200px;
      margin: 20px auto;
      display: flex;
      font-size: 20px;
      color:#fff;
      div{
        flex:1;
        text-align: center;
        cursor: pointer;
        &.active{
          color: #409eff;
        }
      }
    }
    .inputBox{
      width: 80%;
      margin: 0 auto;
      >div{
        position: relative;
        width: 100%;
        margin-bottom: 20px;
        .iconfont{
          position: absolute;
          top: 10px;
          left: 10px;
          font-size: 20px;
          z-index: 10;
        }
        /deep/.el-input__inner{
          padding-left: 36px;
        }
      }
    }
    .forgetPassword{
      width: 80%;
      margin: 0 auto;
      line-height: 20px;
      text-align: right;
      color: #409eff;
      font-size: 14px;
      /*text-decoration:;*/
    }
    .loginBtn{
      width: 80%;
      margin: 20px auto;
      height: 40px;
      text-align: center;
      line-height: 40px;
      border-radius: 6px;
      background-color: rgba(255,255,255,.5);
      color: #fff;
      cursor: pointer;
      &:hover{
        background: #409eff;
      }
    }
    .otherLogin{
      width: 80%;
      margin: 26px auto;
      display: flex;
      >div {
        flex: 1;
        text-align: center;
        color: #fff;
        cursor: pointer;
        .iconfont{
          font-size: 30px;
        }
        &:hover{
          color: #409eff;
        }
      }
    }


  }
}
</style>
