<template>
  <div class="purchase">
    <div class="searchBox clearfix">
      <div class="searchItem">
        <div class="searchLabel">采购批次：</div>
        <dropTree
          placeholder="请选择采购批次"
          multiple
          check-all
          clearable
          :options="batchList"
          v-model="purchaseSearch.batch"
        ></dropTree>
      </div>
      <div class="searchItem">
        <div class="searchLabel">采购时间：</div>
        <div class="currentInput">
          <!--          <el-input v-model="purchaseTime" placeholder="请输入客户名称" size="mini" clearable></el-input>-->
          <el-date-picker
            size="mini"
            v-model="purchaseSearch.time"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <div class="searchItem">
        <div class="searchLabel">产品名称：</div>
        <dropTree
          placeholder="请选择产品名称"
          multiple
          check-all
          clearable
          :options="productList"
          v-model="purchaseSearch.product"
        ></dropTree>
      </div>
      <div class="searchItem">
        <div class="searchLabel">采购金额：</div>
        <div>
          <el-input-number size="mini" v-model="purchaseSearch.minMoney" controls-position="right"></el-input-number>
          -
          <el-input-number size="mini" v-model="purchaseSearch.maxMoney" controls-position="right"></el-input-number>
        </div>
      </div>
      <div class="searchItem">
        <div class="searchLabel">采购人员：</div>
        <dropTree
          placeholder="请选择采购人员"
          multiple
          check-all
          clearable
          :options="createByList"
          v-model="purchaseSearch.createBy"
        ></dropTree>
      </div>
      <div class="searchBtn">
        <el-button size="mini" type="primary" @click="addSales">新增采购记录</el-button>
        <el-button size="mini" type="primary" plain>重 置</el-button>
        <el-button size="mini" type="primary">查 询</el-button>
      </div>
    </div>
    <div class="purchaseMain">
      <el-table
        :data="purchaseData"
        border
        style="width: 99%"
        height="calc(100vh - 284px)">
        <el-table-column
          prop="time"
          width="160"
          :resizable="false"
          align="center"
          label="采购批次">
        </el-table-column>
        <el-table-column
          prop="buyer"
          width="160"
          :resizable="false"
          align="center"
          label="采购时间">
        </el-table-column>
        <el-table-column
          prop="productName"
          :resizable="false"
          align="center"
          label="产品名称">
        </el-table-column>
        <el-table-column
          width="160"
          :resizable="false"
          align="center"
          label="采购数量">
          <template slot-scope="scope">
            {{scope.row.channel}}g
          </template>
        </el-table-column>
        <el-table-column
          prop="quantity"
          :resizable="false"
          width="120"
          align="center"
          label="采购金额">
        </el-table-column>
        <el-table-column
          prop="amount"
          :resizable="false"
          width="120"
          align="center"
          label="采购人员">
        </el-table-column>
        <el-table-column
          label="操作"
          :resizable="false"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageChange"
        :current-page.sync="page"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="1000">
      </el-pagination>
    </div>
    <el-dialog
      :title="modelType === 'add' ? '新增采购记录' : '编辑采购记录'"
      :visible.sync="showModel"
      width="580px">
      <span>
        <el-form ref="purchaseForm" label-position="right" :rules="rules" label-width="120px" :model="purchaseForm">
          <el-form-item label="销售日期：" prop="time">
            <el-date-picker
              v-model="purchaseForm.time"
              style="width: 100%;"
              size="mini"
              type="date"
              :clearable="false"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="买家姓名：" prop="buyer">
            <el-input v-model="purchaseForm.buyer" size="mini" placeholder="请输入买家姓名"></el-input>
          </el-form-item>
          <el-form-item label="产品名称：" prop="productName">
            <dropTree
              :class="prodFlag ? 'dropError' : ''"
              placeholder="请选择产品名称"
              clearable
              :options="productList"
              v-model="purchaseForm.productName"
            ></dropTree>
          </el-form-item>
          <el-form-item label="销售途径：" prop="channel">
            <dropTree
              :class="channelFlag ? 'dropError' : ''"
              placeholder="请选择销售途径"
              clearable
              :options="channel.options"
              v-model="purchaseForm.channel"
            ></dropTree>
          </el-form-item>
          <el-form-item class="quantityBox" label="购买数量：" prop="quantity">
            <el-input v-model="purchaseForm.quantity" size="mini" placeholder="请输入购买数量"></el-input>
            <div class="unit">{{currentUnit}}</div>
          </el-form-item>
          <el-form-item label="购买金额：" prop="amount">
            <el-input v-model="purchaseForm.amount" size="mini" placeholder="请输入购买金额"></el-input>
          </el-form-item>
          <el-form-item label="销售人员：" prop="seller">
            <dropTree
              :class="sellerFlag ? 'dropError' : ''"
              placeholder="请选择销售人员"
              clearable
              :options="channel.options"
              v-model="purchaseForm.seller"
            ></dropTree>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showModel = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit('purchaseForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import dropTree from '../public/dropTree/index'
  import Vue from "vue";
  export default {
    name: "index",
    components:{
      dropTree
    },
    data(){
      return {
        minMoney:0,
        maxMoney:0,
        purchaseSearch:{
          batch:[],
          product:[],
          minMoney: 0,
          maxMoney: 0,
          time:'',
          createBy:[],
        },
        batchList:[
          {
            label:'批次1',
            value:'1'
          },
          {
            label:'批次2',
            value:'2'
          },
          {
            label:'批次3',
            value:'3'
          },
        ],
        productList:require('../../util/baseData').default.teaType,
        channel:{
          options:require('../../util/baseData').default.channel,
          value:[]
        },
        buyer:'',
        purchaseTime:'',
        createByList:[
          {
            label:'彭旭灿',
            value:'彭旭灿'
          },
          {
            label:'杨娜',
            value:'杨娜'
          },
          {
            label:'许佩清',
            value:'许佩清'
          },
        ],
        purchaseData:[
          {
            time:'2021-10-20',
            buyer:'xx',
            productName:'绿茶',
            channel:'店面',
            quantity:'1000g',
            amount:360,
            seller:'彭旭灿',
          },
          {
            time:'2021-10-20',
            buyer:'xx',
            productName:'绿茶',
            channel:'店面',
            quantity:'1000g',
            amount:360,
            seller:'彭旭灿',
          },
          {
            time:'2021-10-20',
            buyer:'xx',
            productName:'绿茶',
            channel:'店面',
            quantity:'1000g',
            amount:360,
            seller:'彭旭灿',
          },
          {
            time:'2021-10-20',
            buyer:'xx',
            productName:'绿茶',
            channel:'店面',
            quantity:'1000g',
            amount:360,
            seller:'彭旭灿',
          },
          {
            time:'2021-10-20',
            buyer:'xx',
            productName:'绿茶',
            channel:'店面',
            quantity:'1000g',
            amount:360,
            seller:'彭旭灿',
          },
          {
            time:'2021-10-20',
            buyer:'xx',
            productName:'绿茶',
            channel:'店面',
            quantity:'1000g',
            amount:360,
            seller:'彭旭灿',
          },
          {
            time:'2021-10-20',
            buyer:'xx',
            productName:'绿茶',
            channel:'店面',
            quantity:'1000g',
            amount:360,
            seller:'彭旭灿',
          },
          {
            time:'2021-10-20',
            buyer:'xx',
            productName:'绿茶',
            channel:'店面',
            quantity:'1000g',
            amount:360,
            seller:'彭旭灿',
          },
          {
            time:'2021-10-20',
            buyer:'xx',
            productName:'绿茶',
            channel:'店面',
            quantity:'1000g',
            amount:360,
            seller:'彭旭灿',
          },
          {
            time:'2021-10-20',
            buyer:'xx',
            productName:'绿茶',
            channel:'店面',
            quantity:'1000g',
            amount:360,
            seller:'彭旭灿',
          },
          {
            time:'2021-10-20',
            buyer:'xx',
            productName:'绿茶',
            channel:'店面',
            quantity:'1000g',
            amount:360,
            seller:'彭旭灿',
          },
          {
            time:'2021-10-20',
            buyer:'xx',
            productName:'绿茶',
            channel:'店面',
            quantity:'1000g',
            amount:360,
            seller:'彭旭灿',
          },
        ],


        purchaseForm:{
          time:'',
          buyer:'',
          productName:'',
          channel:'',
          quantity:'',
          amount:'',
          seller:'',
        },
        rules: {
          // time: [{required: true, message: '销售日期必选', trigger: 'blur'}],
          // buyer: [{required: true, message: '必填', trigger: 'blur'}],
          productName: [{required: true, message: '产品名称必选', trigger: 'change'}],
          channel: [{required: true, message: '销售途径必选', trigger: 'change'}],
          quantity: [{required: true, message: '购买数量必填', trigger: 'blur'}],
          amount: [{required: true, message: '购买金额必填', trigger: 'blur'}],
          seller: [{required: true, message: '销售人员必选', trigger: 'change'}],
        },
        editIndex:0,
        modelType:'add',
        showModel:false,
        prodFlag:false,
        channelFlag:false,
        sellerFlag:false,
        currentUnit:'g',
        page:1,


      }
    },
    methods:{
      validateFlag(){
        this.prodFlag = this.purchaseForm.productName === ''
        this.channelFlag = this.purchaseForm.channel === ''
        this.sellerFlag = this.purchaseForm.seller === ''
      },
      confirmEdit(formName) {
        this.validateFlag()
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.showModel = false
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      addSales(){
        this.purchaseForm.time = this.utils.setTimeFilter(new Date())
        console.log(this.purchaseForm.time);
        this.showModel = true
        this.$nextTick(()=>{
          this.$refs.purchaseForm.clearValidate()
        })

      },

      pageSizeChange(){

      },
      pageChange(){

      },
    },
    mounted() {

    }
  }
</script>

<style lang="less" scoped>
  .purchase{
    width: 100%;
    height: 100%;
    /deep/.el-input-number--mini{
      width: 118px;
    }
    .searchBox{
      position: relative;
      background: #fff;
      box-shadow: 0 2px 14px 0 rgba(14, 33, 66, 0.06);
      border-radius: 6px;
      padding: 10px;
      margin-bottom: 10px;
      .searchItem{
        width: 25%;
        height: 44px;
        line-height: 44px;
        display: flex;
        float: left;
        .searchLabel{
          width: 80px;
          text-align: right;
          font-size: 14px;
        }
        .dropTree{
          display: inline-block;
          flex: 1;
        }
        .currentInput{
          padding:0 14px;
          display: inline-block;
          flex: 1;
        }
        /deep/.el-range-editor--mini.el-input__inner{
          width: 100%;
        }

      }
      .searchBtn{
        position: absolute;
        right: 0;
        bottom: 10px;
        padding-right: 24px;
      }
    }
    /deep/.el-form-item__content{
      padding: 0 28px 0 0;
      .dropTree{
        padding: 0;
        &.dropError{
          .dropTree-model{
            border: 1px solid red;
          }
        }
      }
    }
    .quantityBox{
      position: relative;
      .unit{
        position: absolute;
        top: 0;
        right: 10px;
      }

    }
    .purchaseMain{
      position: relative;
      background: #fff;
      box-shadow: 0 2px 14px 0 rgba(14, 33, 66, 0.06);
      border-radius: 6px;
      padding: 10px;
      //width: 100%;
      height:calc(100vh - 240px);
      //box-sizing: border-box;
      /deep/.el-pagination{
        text-align: right;
        padding: 14px 20px;
      }

    }
  }
</style>
