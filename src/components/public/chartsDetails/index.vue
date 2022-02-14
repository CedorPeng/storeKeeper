<template>
  <div class="chartsDetails">
    <i class="iconfont icon-fullscreen-shrink" @click="hideCharts('channel')"></i>
    <div class="timeRadio">
      <el-radio-group v-model="timeType" @change="timeTypeChange" size="small">
        <el-radio-button label="days">日</el-radio-button>
        <el-radio-button label="month">月</el-radio-button>
        <el-radio-button label="year">年</el-radio-button>
      </el-radio-group>
    </div>
    <h2>销售额-{{typeObject[type]}}</h2>
    <div class="clearfix">
      <div class="selectItem" v-if="type === 'channel'">
        <div class="itemLabel">销售途径</div>
        <div class="itemSelect">
          <dropTree
            placeholder="请选择销售途径"
            multiple
            clearable
            :options="channelOptions"
            v-model="searchChannel"
            @selectDone="getChartsData"
          ></dropTree>
        </div>
      </div>
      <div class="selectItem" v-if="type === 'product'">
        <div class="itemLabel">产品名称</div>
        <div class="itemSelect">
          <dropTree
            placeholder="请选择产品名称"
            multiple
            clearable
            :options="productOptions"
            v-model="searchProduct"
            @selectDone="getChartsData"
          ></dropTree>
        </div>
      </div>
      <div class="selectItem" v-if="timeType === 'days'">
        <div class="itemLabel">时间</div>
        <div class="itemSelect">
          <el-date-picker
            size="mini"
            v-model="searchTime"
            type="daterange"
            align="right"
            unlink-panels
            value-format="yyyy-MM-dd"
            range-separator="-"
            :picker-options="pickerOptions"
            @change="getChartsData"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <div class="selectItem" v-if="timeType === 'month'">
        <div class="itemLabel">时间</div>
        <div class="itemSelect">
          <el-date-picker
            size="mini"
            v-model="searchTime"
            type="monthrange"
            align="right"
            unlink-panels
            value-format="yyyy-MM"
            range-separator="-"
            :picker-options="pickerOptions"
            @change="getChartsData"
            start-placeholder="开始月份"
            end-placeholder="结束月份">
          </el-date-picker>
        </div>
      </div>
      <div class="selectItem" v-if="timeType === 'year'">
        <div class="itemLabel">时间</div>
        <div class="itemSelect">
          <dropTree
            placeholder="请选择年份"
            multiple
            clearable
            :options="yearList"
            v-model="searchYear"
            @selectDone="getChartsData"
          ></dropTree>
        </div>
      </div>
    </div>
    <div class="chartsMain">
      <ve-line
        ref="channelChart"
        :data="chartsData.data"
        :extend="chartsData.extend"
        height="calc(100vh - 200px)"
        :events="chartClick"
        :settings="chartsData.settings"
      ></ve-line>
    </div>

  </div>
</template>

<script>
  import dropTree from '../dropTree/index'
  export default {
    name: "index",
    props:{
      type:[String],
    },
    components:{
      dropTree
    },
    data(){
      this.chartClick = {
        click:e =>{
          let params = {
            time:e.name,
            timeType:this.timeType
          }
          if(this.type === 'product') params.product = e.seriesName
          if(this.type === 'channel') params.channel = e.seriesName
          console.log(params,`get${this.type}`);
          this.$emit('transferParams',params)
        }
      }
      return {
        typeObject:{
          channel:'销售途径',
          product:'产品类型',
          time:'时间',
        },
        timeType:'days',
        channelOptions:[],
        productOptions:[],
        searchChannel:[],
        searchProduct:[],
        mapObject:{
          channel:{},
          product:{
            "greenTea": '绿茶',
            "blackTea": '红茶',
            "scentedTea": '花茶',
            "darkTea": '黑茶',
            "FruitTea": '果茶'
          },
          time:{
            'number':'销售额'
          }
        },
        searchTime:'',
        searchYear:[],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        yearList:[],

        chartsData:{
          channel:['time','DM','TB','JD','PYQ','RQ'],
          product:['time', "greenTea", "blackTea", "scentedTea", "darkTea", "FruitTea"],
          time:['time','number'],
          data:{},
          settings:{
            labelMap:{},
          },
          extend:{
            grid: {
              left: '60',
              right: '90',
              top: '90',
              bottom: '30',
              containLabel: true
            },
            dataZoom: [
              {
                type: 'slider',
                height: '12',
                start: 0,
                end: 100
              },
              {
                type: 'inside',
                height: '12',
                start: 0,
                end: 100
              }
            ],
          },
        }
      }
    },
    methods:{
      hideCharts(){
        this.$emit('close')
      },
      timeTypeChange(){
        console.log(this.timeType);
        this.searchYear = []
        this.searchTime = []
        this.getChartsData()
      },
      getAllYear(){
        let year = new Date().getFullYear()
        this.yearList = []
        for (let i = year; i >= 2010; i--){
          this.yearList.push({
            label:i,
            value:i,
          })
        }
      },
      //获取销售途径
      getChannel(){
        this.channelOptions = require('../../../util/baseData').default.channel
        this.channelOptions.forEach(item=>this.mapObject.channel[item.value] = item.label)
      },
      //获取产品名称选项和产品chart的map
      getProduct(){
        this.productOptions = require('../../../util/baseData').default.teaType
        //处理map todo
      },
      getChartsData(){
        let params = {
          timeType: this.timeType,
          time:this.timeType === 'year' ? this.searchYear : this.searchTime,
        }
        if(this.type === 'product') params.product = this.searchProduct
        if(this.type === 'channel') params.channel = this.searchChannel
        console.log(params,`get${this.type}`);
        let dataObject = {
          channel:require('../../../util/baseData').default.channelDays.slice(-200),
          product:require('../../../util/baseData').default.teaDays.slice(-100),
          time:require('../../../util/baseData').default.numberDays.slice(-300),
        }
        this.chartsData.data = {
          columns:this.chartsData[this.type],
          rows:dataObject[this.type]
        }
        let percent = 20 / dataObject[this.type].length * 100
        this.chartsData.extend.dataZoom.forEach(item => {
          item.start = percent > 100 ? 0 :  100 - percent
        })
        console.log(this.chartsData);
      },
      setChartsMap(){
        this.chartsData.settings.labelMap = this.mapObject[this.type]
      },
    },
    mounted() {
      this.getAllYear()
      this.getChannel()
      this.getProduct()
      this.setChartsMap()
      this.getChartsData()



    }
  }
</script>

<style lang="less" scoped>
  .chartsDetails{
    width: 100%;
    height: calc(100vh - 30px);
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
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
    .timeRadio{
      position: absolute;
      top: 20px;
      right: 70px;
    }
    .selectItem{
      padding: 10px 0;
      display: flex;
      float: left;
      width: 400px;
      margin-left: 20px;
      .itemLabel{
        width: auto;
        line-height: 28px;
        text-align: right;
        margin-right: 10px;
      }
      .itemSelect{
        flex: 1;
        .dropTree{
          margin:0;
          padding-left: 0;
          /deep/.dropTree-options{
            left: 0;
            top: 38px;
          }
        }
      }
    }
    .chartsMain{
      padding-top: 30px;
    }
  }

</style>
