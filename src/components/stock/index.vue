<template>
  <div class="stock">
    <div class="searchBox clearfix">
      <div class="searchItem">
        <div class="searchLabel">产品名称：</div>
        <dropTree
          placeholder="请选择产品名称"
          multiple
          check-all
          clearable
          :options="productName.options"
          v-model="productName.value"
        ></dropTree>
      </div>
      <div class="searchBtn">
        <el-button size="mini" type="primary" plain>重 置</el-button>
        <el-button size="mini" type="primary">查 询</el-button>
      </div>
    </div>
    <div class="salesMain">
      <el-table
        :data="stockData"
        border
        style="width: 99%"
        height="calc(100vh - 236px)">
        <el-table-column
          prop="productName"
          align="center"
          label="产品名称">
        </el-table-column>
        <el-table-column
          prop="productType"
          align="center"
          label="产品类型">
        </el-table-column>
        <el-table-column
          prop="quantity"
          align="center"
          label="库存数量">
        </el-table-column>
        <el-table-column
          prop="batch"
          align="center"
          label="进货批次">
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
  </div>
</template>

<script>
import dropTree from '../public/dropTree/index'
export default {
  name: "index",
  components:{
    dropTree
  },
  data(){
    return {
      page:1,
      productName:{
        options:require('../../util/baseData').default.teaType,
        value:[]
      },
      stockData:[
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
        {
          productName:'绿茶',
          productType:'绿茶/信阳毛尖',
          quantity:'1000g',
          batch:'批次1',
        },
      ]

    }
  },
  methods:{
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
.stock{
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
  .salesMain{
    position: relative;
    background: #fff;
    box-shadow: 0 2px 14px 0 rgba(14, 33, 66, 0.06);
    border-radius: 6px;
    padding: 10px;
    //width: 100%;
    height:calc(100vh - 196px);
    //box-sizing: border-box;
    /deep/.el-pagination{
      text-align: right;
      padding: 14px 20px;
    }

  }
}
</style>
