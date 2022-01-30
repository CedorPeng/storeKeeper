<template>
  <div class="storeMessage">
    <div class="setBox">
      <el-button type="primary" plain size="mini" @click="edit">编 辑<i class="el-icon-edit-outline"></i></el-button>
    </div>
    <div>
      <div class="storeLabel">店铺名称：</div>
      <div class="storeValue">{{storeName}}</div>
    </div>
    <div>
      <div class="storeLabel">店铺负责人：</div>
      <div class="storeValue">{{name}}</div>
    </div>
    <div>
      <div class="storeLabel">负责人手机号：</div>
      <div class="storeValue">{{phone}}</div>
    </div>
    <div>
      <div class="storeLabel">店铺地址：</div>
      <div class="storeValue">{{address}}</div>
    </div>
    <div>
      <div class="storeLabel">销售途径：</div>
      <div class="storeValue">
        <span class="typeItem" v-for="(item,index) in allSaleType" :key="index">{{item}}</span>
      </div>
    </div>
    <el-dialog
      title="编辑"
      :visible.sync="isEdit"
      width="30%">
      <span>
        <el-form ref="editForm" label-position="right" :rules="rules" label-width="120px" :model="editForm">
          <el-form-item label="店面名称：" prop="storeName">
            <el-input v-model="editForm.storeName"></el-input>
          </el-form-item>
          <el-form-item label="店面负责人：" prop="name">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
<!--          <el-form-item label="负责人手机号：">-->
<!--            <el-input v-model="editForm.phone"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="店铺地址：" prop="address">
            <el-input v-model="editForm.address"></el-input>
          </el-form-item>
        </el-form>
        <div class="typeManage">
          <div class="editLabel"> <span style="color: #F56C6C">*</span> 销售途径：</div>
          <div class="storeValue">
            <span class="typeItem" v-for="(item,index) in editSaleType" :key="index">{{item}} <i @click="removeType(index)" class="el-icon-remove"></i></span>
            <i @click="clickAddType" v-show="!isAddType" class="el-icon-circle-plus-outline"></i>
            <div v-show="isAddType">
              <el-input clearable v-model="addValue" placeholder="请输入销售途径" class="input-with-select" @keyup.native="searchValueDown">
                <el-button slot="append" icon="el-icon-edit" @click="addType"></el-button>
              </el-input>
            </div>
          </div>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isEdit = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit('editForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return {
      isEdit:false,
      isAddType:false,
      storeName:'XX店铺',
      name:'彭旭灿',
      phone:'13269923383',
      address:'灵宝市XXXXXXXXX',
      allSaleType:['店面','淘宝','京东','拼多多'],
      editForm:{
        storeName:'',
        name:'',
        phone:'',
        address:''
      },
      rules: {
        storeName: [
          {
            required: true,
            message: '店面名称必填',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '店面负责人必填',
            trigger: 'blur'
          }
        ],
        // phone: [
        //   { validator: checkAge, trigger: 'blur' }
        // ],
        address: [
          {
            required: true,
            message: '店面地址必填',
            trigger: 'blur'
          }
        ],
      },
      editSaleType:['店面','淘宝','京东','拼多多'],
      addValue:'',
    }
  },
  methods:{
    edit(){
      for (let key in this.editForm ){
        this.editForm[key] = this[key]
      }
      this.isEdit = true
    },
    clickAddType(){
      this.addValue = ''
      this.isAddType = true
    },
    removeType(index){
      this.editSaleType.splice(index, 1);
    },
    addType(){
      this.editSaleType.push(this.addValue)
      this.isAddType = false
    },
    searchValueDown(event){
      let e = event || window.event
      if (e.keyCode === 13) {
        this.addType()
      }
    },
    confirmEdit(formName) {
      if(this.editSaleType.length === 0) {
        this.$message.warning('销售途径为必填项')
        return false
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          for (let key in this.editForm ){
            this[key] = this.editForm[key]
          }
          this.allSaleType = this.editSaleType
          this.isEdit = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.storeMessage{
  width: 100%;
  height: 100%;
  position: relative;
  .setBox{
    position: absolute;
    top: -60px;
    right: 0;
  }
  >div{
    line-height: 50px;
    font-size: 14px;
    .storeLabel{
      display: inline-block;
      width: 140px;
      text-align: right;
      margin-right: 12px;

    }
    .storeValue{
      display: inline-block;
      .typeItem{
        font-size: 12px;
        display: inline-block;
        margin-right: 8px;
        padding: 0 10px;
        height: 24px;
        line-height: 24px;
        border-radius: 4px;
        background-color: #eee;
        position: relative;
        i{
          position: absolute;
          top: -6px;
          right: -6px;
          font-size: 16px;
          border-radius: 16px ;
          cursor: pointer;
        }
      }
    }
    .typeManage{
      width: 100%;
      display: flex;
      .editLabel{
        display: inline-block;
        width: 108px;
        text-align: right;
        margin-right: 12px;

      }
      .storeValue{
        flex: 1;
      }

    }
    .el-icon-circle-plus-outline{
      font-size: 16px;
      cursor: pointer;
    }
  }

}
</style>
