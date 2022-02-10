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
        <el-button size="mini" type="primary" @click="addSales">新增采购</el-button>
        <el-button size="mini" type="primary" plain>重 置</el-button>
        <el-button size="mini" type="primary" @click="searchTable">查 询</el-button>
      </div>
    </div>
    <div class="purchaseMain">
      <el-table
        :data="purchaseData"
        style="width: 99%"
        height="calc(100vh - 284px)"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          width="120"
          :resizable="false"
          label="采购批次">
          <template slot-scope="scope">
            {{scope.row.children ? scope.row.batch : ''}}
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          width="160"
          :resizable="false"
          label="采购时间">
        </el-table-column>
        <el-table-column
          prop="product"
          :resizable="false"
          label="产品名称">
        </el-table-column>
        <el-table-column
          width="160"
          :resizable="false"
          align="center"
          label="采购数量">
          <template slot-scope="scope">
            {{scope.row.weight}}{{scope.row.unit}}
          </template>
        </el-table-column>
        <el-table-column
          prop="amount"
          :resizable="false"
          width="120"
          align="right"
          label="采购金额">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          :resizable="false"
          width="120"
          align="center"
          label="采购人员">
        </el-table-column>
        <el-table-column
          label="操作"
          :resizable="false"
          width="100">
          <template slot-scope="scope" v-if="scope.row.children">
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
      :title="modelType === 'add' ? '新增' : '编辑'"
      :visible.sync="showModel"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="880px">
      <span>
        <el-form ref="purchaseForm" label-position="right" :rules="rules" label-width="120px" :model="purchaseForm">
          <el-form-item label="采购日期：" prop="time">
            <el-date-picker
              v-model="purchaseForm.time"
              style="width: 288px;"
              size="small"
              type="date"
              :clearable="false"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="采购人员：">
            <el-select style="width: 288px;" size="small" v-model="purchaseForm.people" placeholder="请选择">
              <el-option
                v-for="item in createByList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div>
          <span class="detailsTitle">采购明细</span>
          <el-button class="fr" style="margin-top: 10px" type="primary" size="small" @click="clickAddDetails">添加采购明细</el-button>
        </div>
        <el-table
          :data="formTable"
          border
          style="width: 100%">
          <el-table-column
            prop="address"
            label="产品名称">
          </el-table-column>
          <el-table-column
            prop="name"
            label="采购数量"
            width="120">
          </el-table-column>
          <el-table-column
            prop="date"
            width="120"
            label="采购金额">
          </el-table-column>
          <el-table-column
            width="120"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small">编辑</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showModel = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit('purchaseForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="采购明细"
      :visible.sync="addDetailsModel"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="500px">
      <span>
        <el-form ref="detailsForm" label-position="right" :rules="detailsRules" label-width="120px" :model="detailsForm">
          <el-form-item label="采购产品：" prop="productName">
            <dropTree
              :class="prodFlag ? 'dropError' : ''"
              placeholder="请选择产品名称"
              clearable
              :options="productList"
              v-model="detailsForm.productName"
            ></dropTree>
          </el-form-item>
          <el-form-item label="采购数量：" prop="number">
            <el-input v-model="detailsForm.number" size="mini" placeholder="请输入采购数量"></el-input>
          </el-form-item>
          <el-form-item label="采购金额：" prop="amount">
            <el-input v-model="detailsForm.amount" size="mini" placeholder="请输入采购金额"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDetailsModel = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
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
        purchaseData:require('../../util/baseData').default.stocking,//批次表格数据

        purchaseForm:{
          time:'',
          people:'',
        },
        rules: {
          time: [{required: true, message: '采购日期必选', trigger: 'blur'}],
        },
        modelType:'add',
        showModel:false,
        page:1,
        formTable:[
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
        ],

        addDetailsModel:false,
        prodFlag:true,//产品名称校验问题
        detailsForm:{
          productName:'',
          number:'',
          amount:''
        },
        detailsRules: {
          productName: [{required: true, message: '产品名称必选', trigger: 'blur'}],
          number: [{required: true, message: '采购数量必填', trigger: 'blur'}],
          amount: [{required: true, message: '采购金额必填', trigger: 'blur'}],
        },


      }
    },
    methods:{
      clickAddDetails(){
        this.addDetailsModel = true
      },
      confirmEdit(formName) {
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
      searchTable(){

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
    .detailsTitle{
      line-height: 24px;
      font-size: 18px;
      color: #303133;
      margin:20px 20px 20px 0;
      display: inline-block;
    }
    /deep/.el-form-item__content{
      padding: 0 28px 0 0;
      .dropTree{
        padding: 0;
        .dropTree-options{
          left: 0;
          top: 33px;
        }
        &.dropError{
          .dropTree-model{
            border: 1px solid red;
          }
        }
      }
    }
  }
</style>
