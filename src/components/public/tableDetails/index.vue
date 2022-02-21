<template>
  <div class="tableDetails">
    <i class="iconfont icon-fullscreen-shrink" @click="hideCharts('channel')"></i>
    <h2>销售额-{{typeObject[type]}}</h2>
    <div class="detailsMsg">
      <div>
        <div class="smallMsg">
          <span class="msgTitle">销售时间：</span>
          <span>{{params.time}}</span>
        </div>
        <div class="bigMsg" v-if="type === 'product'">
          <span class="msgTitle">产品名称：</span>
          <span>{{params.product}}</span>
        </div>
        <div class="bigMsg" v-if="type === 'channel'">
          <span class="msgTitle">销售途径：</span>
          <span>{{params.channel}}</span>
        </div>
      </div>
      <div>
        <div class="smallMsg">
          <span class="msgTitle">成交总量：</span>
          <span>{{pageCount}}笔</span>
        </div>
        <div class="smallMsg">
          <span class="msgTitle">{{timeTypeObject[params.timeType]}}：</span>
          <span>{{params.saleCount}}元</span>
        </div>
      </div>
    </div>
    <div class="salesMain">
      <el-table
        :data="salesData"
        v-if="params.timeType === 'days'"
        border
        height="calc(100vh - 270px)">
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
            {{scope.row.productName}}
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
            {{scope.row.quantity}}
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
      </el-table>
      <el-table
        :data="salesData"
        v-if="params.timeType !== 'days'"
        border
        height="calc(100vh - 270px)">
        <el-table-column
          prop="time"
          width="200"
          :resizable="false"
          align="center"
          :label="params.timeType === 'month' ? '日期' : '月份'">
        </el-table-column>
        <el-table-column
          prop="buyers"
          width="160"
          :resizable="false"
          align="center"
          :label="type === 'product' ? '销售总量' : '成交量/笔'">
        </el-table-column>
        <el-table-column
          header-align="center"
          align="left"
          label="销售额">
          <template slot-scope="scope">
            {{scope.row.productName}}
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
  </div>
</template>

<script>
  import dropTree from '../dropTree/index'
  export default {
    name: "index",
    props:{
      type:[String],
      params:[Object],
    },
    components:{
      dropTree
    },
    data(){
      return {
        typeObject:{
          channel:'销售途径',
          product:'产品类型',
          time:'时间',
        },
        timeTypeObject:{
          days:'当天销售额',
          month:'当月销售额',
          year:'当年销售额',
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


        currentPage:1,
        pageCount:4,
      }
    },
    methods:{
      hideCharts(){
        this.$emit('close')
      },
      pageChange(){
        console.log(this.currentPage);
      },
    },
    mounted() {
      console.log(this.params);


    }
  }
</script>

<style lang="less" scoped>
  .tableDetails{
    width: 100%;
    height: calc(100vh - 30px);
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    h2{
      line-height: 70px;
      padding-left: 20px;
    }
    .icon-fullscreen-shrink{
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 30px;
      color: #606266;
      cursor: pointer;
      &:hover{
        color: #409eff;
      }
    }
    .detailsMsg{
      padding: 20px;
      .smallMsg{
        width: 300px;
        display: inline-block;
      }
      .bigMsg{
        display: inline-block;
      }
      .msgTitle{
        font-weight: 700;
      }
    }
    .salesMain{
      position: relative;
      background: #fff;
      box-shadow: 0 2px 14px 0 rgba(14, 33, 66, 0.06);
      border-radius: 6px;
      padding: 20px;
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
