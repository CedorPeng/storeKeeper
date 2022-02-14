<template>
  <div class="sales">
    <div class="searchBox clearfix">
      <div class="searchItem">
        <div class="searchLabel">产品名称：</div>
        <dropTree
          placeholder="请选择产品名称"
          multiple
          check-all
          clearable
          :options="productName.options"
          v-model="searchParams.productId"
        ></dropTree>
      </div>
      <div class="searchItem">
        <div class="searchLabel">销售渠道：</div>
        <dropTree
          placeholder="请选择销售渠道"
          multiple
          check-all
          clearable
          :options="channel.options"
          v-model="searchParams.channelId"
        ></dropTree>
      </div>
      <div class="searchItem">
        <div class="searchLabel">购买客户：</div>
        <div class="currentInput">
          <el-input v-model="searchParams.buyers" placeholder="请输入客户名称" size="mini" clearable></el-input>
        </div>
      </div>
      <div class="searchItem">
        <div class="searchLabel">销售人员：</div>
        <dropTree
          placeholder="请选择销售渠道"
          multiple
          check-all
          clearable
          :options="memberName.options"
          v-model="searchParams.seller"
        ></dropTree>
      </div>
      <div class="searchItem">
        <div class="searchLabel">销售时间：</div>
        <div class="currentInput">
          <el-date-picker
            size="mini"
            v-model="searchParams.time"
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
      <div class="searchBtn">
        <el-button size="mini" type="primary" @click="addSales">新增销售记录</el-button>
        <el-button size="mini" type="primary" plain @click="resetSearch">重 置</el-button>
        <el-button size="mini" type="primary" @click="clickSearch">查 询</el-button>
      </div>
    </div>
    <div class="salesMain">
      <el-table
        :data="salesData"
        border
        style="width: 99%"
        height="calc(100vh - 284px)">
        <el-table-column
          prop="time"
          width="200"
          :resizable="false"
          align="center"
          label="销售时间">
        </el-table-column>
        <el-table-column
          prop="buyers"
          width="160"
          :resizable="false"
          align="center"
          label="购买客户">
        </el-table-column>
        <el-table-column
          header-align="center"
          align="left"
          label="购买产品">
          <template slot-scope="scope">
            {{nameObject[scope.row.productId]}}
          </template>
        </el-table-column>
        <el-table-column
          prop="channelId"
          width="160"
          :resizable="false"
          align="center"
          label="购买渠道">
        </el-table-column>
        <el-table-column
          width="120"
          :resizable="false"
          align="right"
          header-align="center"
          label="购买数量">
          <template slot-scope="scope">
            {{scope.row.quantity}}{{unitObject[scope.row.productId]}}
          </template>
        </el-table-column>
        <el-table-column
          prop="amount"
          width="120"
          :resizable="false"
          align="right"
          header-align="center"
          label="购买金额">
        </el-table-column>
        <el-table-column
          prop="seller"
          width="120"
          :resizable="false"
          align="center"
          label="销售人员">
        </el-table-column>
        <el-table-column
          label="操作"
          :resizable="false"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editSales(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteSales(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="pageChange"
        :current-page.sync="currentPage"
        :page-size="20"
        layout="prev, pager, next, jumper"
        :total="pageCount">
      </el-pagination>
    </div>
    <el-dialog
      :title="modelType === 'add' ? '新增角色' : '编辑角色'"
      :visible.sync="showModel"
      width="580px">
      <span>
        <el-form ref="salesForm" label-position="right" :rules="rules" label-width="120px" :model="salesForm">
          <el-form-item label="销售日期：" prop="time">
<!--            <el-date-picker-->
<!--              v-model="salesForm.time"-->
<!--              size="mini"-->
<!--              type="date"-->
<!--              :clearable="false"-->
<!--              placeholder="选择日期">-->
<!--            </el-date-picker>-->
                <el-date-picker
                  v-model="salesForm.time"
                  style="width: 100%;"
                  size="mini"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
          </el-form-item>
          <el-form-item label="买家姓名：" prop="buyers">
            <el-input v-model="salesForm.buyers" size="mini" placeholder="请输入买家姓名"></el-input>
          </el-form-item>
          <el-form-item label="产品名称：" prop="productId">
            <dropTree
              :class="prodFlag ? 'dropError' : ''"
              placeholder="请选择产品名称"
              clearable
              :options="productName.options"
              v-model="salesForm.productId"
              @change="productValidate"
            ></dropTree>
          </el-form-item>
          <el-form-item label="销售途径：" prop="channelId">
            <el-select size="mini" style="width: 100%;" v-model="salesForm.channelId" placeholder="请选择销售途径">
              <el-option
                v-for="item in channel.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="quantityBox" label="购买数量：" prop="quantity">
            <el-input v-model="salesForm.quantity" size="mini" placeholder="请输入购买数量"></el-input>
            <div class="unit">{{currentUnit}}</div>
          </el-form-item>
          <el-form-item label="购买金额：" prop="amount">
            <el-input v-model="salesForm.amount" size="mini" placeholder="请输入购买金额"></el-input>
          </el-form-item>
          <el-form-item label="销售人员：" prop="seller">
            <el-select size="mini" style="width: 100%;" v-model="salesForm.seller" placeholder="请选择销售人员">
              <el-option
                v-for="item in channel.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showModel = false">取 消</el-button>
        <el-button type="primary" @click="confirmModel">确 定</el-button>
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
      searchParams:{
        productId:[],
        channelId:[],
        buyers:'',
        seller:[],
        time:'',
      },
      productName:{
        options:require('../../util/baseData').default.teaType,
      },
      channel:{
        options:require('../../util/baseData').default.channel,
      },
      memberName:{
        options:[
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
      },
      salesData:[
        {
          id:'1',
          time:'2021-10-20 14:20:00',
          buyers:'xx',
          productId:'H1-6-4',
          productName:'王大榜特级滇红大金针',
          channelId:'店面',
          quantity:'1000',
          amount:360,
          seller:'彭旭灿',
        },
        {
          id:'2',
          time:'2021-10-20 14:20:00',
          buyers:'xx',
          productId:'H1-6-4',
          productName:'王大榜特级滇红大金针',
          channelId:'店面',
          quantity:'1000',
          amount:360,
          seller:'彭旭灿',
        },
        {
          id:'3',
          time:'2021-10-20 14:20:00',
          buyers:'xx',
          productId:'H1-6-4',
          productName:'王大榜特级滇红大金针',
          channelId:'店面',
          quantity:'1000',
          amount:360,
          seller:'彭旭灿',
        },
        {
          id:'4',
          time:'2021-10-20 14:20:00',
          buyers:'xx',
          productId:'H1-6-4',
          productName:'王大榜特级滇红大金针',
          channelId:'店面',
          quantity:'1000',
          amount:360,
          seller:'彭旭灿',
        },
      ],


      salesForm:{
        time:'',
        buyers:'',
        productId:'',
        channelId:'',
        quantity:'',
        amount:'',
        seller:'',
      },
      rules: {
        time: [{required: true, message: '销售时间必选', trigger: 'blur'}],
        productId: [{required: true, message: '产品名称必选', trigger: 'change'}],
        channelId: [{required: true, message: '销售途径必选', trigger: 'change'}],
        quantity: [{required: true, message: '购买数量必填', trigger: 'blur'}],
        amount: [{required: true, message: '购买金额必填', trigger: 'blur'}],
        seller: [{required: true, message: '销售人员必选', trigger: 'change'}],
      },
      modelType:'add',
      showModel:false,
      prodFlag:false,
      currentUnit:'g',
      currentPage:1,
      pageCount:1,
      unitObject:{},
      nameObject:{},


    }
  },
  methods:{
    clickSearch(){
      this.currentPage = 1
      this.searchTable()
    },
    resetSearch(){
      this.searchParams = {
        productId:[],
        channelId:[],
        buyers:'',
        seller:[],
        time:'',
      }
    },
    pageChange(){
      this.searchTable()
    },
    searchTable(){
      let params = {
        ...this.searchParams,
        pageSize:100,
        page:this.currentPage,
      }
      console.log(params, '查询销售记录表格');
    },
    productValidate(val){
      this.prodFlag = val === ''
      this.currentUnit = val === '' ? '' : this.unitObject[val]
      this.$refs.salesForm.validateField('productId')
    },
    confirmModel() {
      this.prodFlag = this.salesForm.productId === ''
      let params = {
        ...this.salesForm,
      }
      if(this.modelType !== 'add') params.id = this.modelType
      console.log(params);
      this.$refs.salesForm.validate((valid) => {
        if (valid) {
          this.showModel = false
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    addSales(){
      this.salesForm.time = this.utils.setTimeFilter(new Date()) + ' 12:00:00'
      this.modelType = 'add'
      this.prodFlag = false
      this.salesForm = {
        time:'',
        buyers:'',
        productId:'',
        channelId:'',
        quantity:'',
        amount:'',
        seller:'',
      }
      this.currentUnit = ''
      this.showModel = true
      this.$nextTick(()=>{
        this.$refs.salesForm.clearValidate()
      })

    },
    editSales(data){
      console.log(data);
      this.modelType = data.id
      this.prodFlag = false
      this.salesForm = {
        time:data.time,
        buyers:data.buyers,
        productId:data.productId,
        channelId:data.channelId,
        quantity:data.quantity,
        amount:data.amount,
        seller:data.seller,
      }
      this.currentUnit = this.unitObject[data.productId]
      this.showModel = true
      this.$nextTick(()=>{
        this.$refs.salesForm.clearValidate()
      })
    },
    deleteSales(data){
      this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(data.id);
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
    this.getEveryUnit(this.productName.options)


  }
}
</script>

<style lang="less" scoped>
.sales{
  width: 100%;
  height: 100%;
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
      .dropTree-set{
        right: 12px;
        color: #C0C4CC;
      }
      .dropTree-options{
        top: 38px;
        left: 0;
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
  .salesMain{
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
