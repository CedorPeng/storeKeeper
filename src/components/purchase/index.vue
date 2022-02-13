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
            value-format="yyyy-MM-dd"
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
        <el-button size="mini" type="primary" plain @click="resetSearch">重 置</el-button>
        <el-button size="mini" type="primary" @click="clickSearch">查 询</el-button>
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
            <el-button type="text" size="small" @click="editBatch(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="removeBatch(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="pageChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="pageCount">
      </el-pagination>
    </div>
    <el-dialog
      :title="modelType === 'add' ? '新增' : '编辑'"
      :visible.sync="addBatchModel"
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
            <el-select style="width: 288px;" size="small" v-model="purchaseForm.createPeople" placeholder="请选择采购人员">
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
            prop="productName"
            label="产品名称">
          </el-table-column>
          <el-table-column
            prop="quantity"
            label="采购数量"
            header-align="center"
            align="right"
            width="120">
            <template slot-scope="scope">
              {{scope.row.quantity}}{{scope.row.unit}}
            </template>
          </el-table-column>
          <el-table-column
            prop="amount"
            width="120"
            header-align="center"
            align="right"
            label="采购金额">
          </el-table-column>
          <el-table-column
            width="120"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editDetails(scope.row,scope.$index)">编辑</el-button>
              <el-button type="text" size="small" @click="removeDetails(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addBatchModel = false">取 消</el-button>
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
              @change="productValidate"
            ></dropTree>
          </el-form-item>
          <el-form-item class="quantityBox" label="采购数量：" prop="quantity">
            <el-input v-model="detailsForm.quantity" size="mini" placeholder="请输入采购数量"></el-input>
            <div class="unit">{{currentUnit}}</div>
          </el-form-item>
          <el-form-item label="采购金额：" prop="amount">
            <el-input v-model="detailsForm.amount" size="mini" placeholder="请输入采购金额"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDetailsModel = false">取 消</el-button>
        <el-button type="primary" @click="confirmDetails">确 定</el-button>
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
          createPeople:'',
        },
        rules: {
          time: [{required: true, message: '采购日期必选', trigger: 'blur'}],
        },
        modelType:'add',
        addBatchModel:false,
        currentPage:1,
        pageSize:5,
        pageCount:15,
        formTable:[
          {
            productName: '味一堂凤庆古树滇红茶特级',
            productId:'H1-6-3',
            unit:'g',
            quantity: '3000',
            amount: '10000'
          },
          {
            productName: '王大榜特级滇红大金针',
            productId:'H1-6-4',
            unit:'g',
            quantity: '10000',
            amount: '40000'
          },
          {
            productName: '芯轩云南凤庆滇红茶',
            unit:'盒',
            productId:'H1-6-5',
            quantity: '20',
            amount: '7000'
          },
        ],

        addDetailsModel:false,
        prodFlag:false,//产品名称校验问题
        detailsForm:{
          productName:'',
          quantity:'',
          amount:''
        },
        detailsRules: {
          productName: [{required: true, message: '产品名称必选', trigger: 'blur'}],
          quantity: [{required: true, message: '采购数量必填', trigger: 'blur'}],
          amount: [{required: true, message: '采购金额必填', trigger: 'blur'}],
        },
        currentUnit:'',
        unitObject:{},
        nameObject:{},
        editDetailsIndex:null,



      }
    },
    methods:{
      editDetails(data,index){
        console.log(data);
        this.detailsForm.productName = data.productId
        this.editDetailsIndex = index
        this.detailsForm.quantity = data.quantity
        this.detailsForm.amount = data.amount
        this.prodFlag = false
        this.addDetailsModel = true
        this.$nextTick(()=>{
          this.$refs.detailsForm.clearValidate()
        })
      },
      removeDetails(index){
        this.$confirm('此操作将永久删除该采购明细, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.formTable.splice(index,1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      productValidate(val){
        this.prodFlag = val === ''
        this.currentUnit = val === '' ? '' : this.unitObject[val]
        this.$refs.detailsForm.validateField('productName')
      },
      clickAddDetails(){
        this.editDetailsIndex = null
        this.detailsForm.productName = ''
        this.detailsForm.quantity = ''
        this.detailsForm.amount = ''
        this.prodFlag = false
        this.addDetailsModel = true
        this.$nextTick(()=>{
          this.$refs.detailsForm.clearValidate()
        })
      },
      confirmEdit(formName) {
        let params = {
          time: this.purchaseForm.time,
          createPeople: this.purchaseForm.createPeople,
          children:this.formTable.map(item=>{
            return {
              ...item,
            }
          })
        }
        if(this.modelType !== 'add'){
          params.id = this.modelType
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(params);
            this.addBatchModel = false
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      confirmDetails() {
        this.prodFlag = this.detailsForm.productName === ''
        this.$refs.detailsForm.validate((valid) => {
          if (valid) {
            this.addDetailsModel = false
            let addDetails = {
              productName: this.nameObject[this.detailsForm.productName],
              productId:this.detailsForm.productName,
              unit: this.unitObject[this.detailsForm.productName],
              quantity: this.detailsForm.quantity,
              amount: this.detailsForm.amount
            }
            if (this.editDetailsIndex !== null){
              Vue.set(this.formTable,this.editDetailsIndex,addDetails)
            }else{
              this.formTable.push(addDetails)
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      addSales(){
        this.purchaseForm.time = this.utils.setTimeFilter(new Date())
        this.addBatchModel = true
        this.$nextTick(()=>{
          this.$refs.purchaseForm.clearValidate()
        })

      },
      resetSearch(){
        this.purchaseSearch = {
          batch:[],
          product:[],
          minMoney: 0,
          maxMoney: 0,
          time:'',
          createBy:[],
        }
      },
      clickSearch(){
        this.currentPage = 1
        this.searchTable()
      },
      pageChange(){
        this.searchTable()
      },
      searchTable(){
        let pageSize = this.purchaseSearch.product.length !== 0 || this.purchaseSearch.createBy.length !== 0 || this.purchaseSearch.minMoney !== 0 || this.purchaseSearch.maxMoney !== 0 ? 100 : 5
        let params = {
          ...this.purchaseSearch,
          pageSize,
          page:this.currentPage,
        }
        console.log(params, '查询表格');
      },
      editBatch(data){
        console.log(data);
        this.modelType = data.id
        this.purchaseForm.time = data.createTime
        // this.purchaseForm.createPeople = data.createPeople
        this.formTable = data.children.map(item=>{
          return {
            productName: '味一堂凤庆古树滇红茶特级',
            // productName: this.nameObject[item.productId],
            productId:'H1-6-3',
            // productId:item.productId,
            unit:item.unit,
            // quantity: item.quantity,
            quantity: item.weight,
            amount: item.amount
          }
        })
        this.addBatchModel = true
        this.$nextTick(()=>{
          this.$refs.purchaseForm.clearValidate()
        })
      },
      removeBatch(data){
        this.$confirm('此操作将永久删除该批次信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(data.id,'删除批次');
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      getEveryUnit(array){
        array.forEach(item=>{
          this.unitObject[item.value] = item.unit
          this.nameObject[item.value] = item.label
          if(item.children && item.children.length !== 0){
            this.getEveryUnit(item.children)
          }
        })
      },
    },
    mounted() {
      this.getEveryUnit(this.productList)
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
          top: 38px;
        }
        .dropTree-set{
          right: 12px;
          color: #C0C4CC;
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
