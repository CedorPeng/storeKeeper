<template>
  <div class="homePage">
    <el-row :gutter="10">
      <el-col :span="12">
        <div class="chartBox">
          <div class="boxTitle">
            <span>销售额 - 销售途径</span>
            <div class="fr">
              <el-radio-group v-model="channelChart.timeType" @change="channelChange" size="mini">
                <el-radio-button label="days">日</el-radio-button>
                <el-radio-button label="month">月</el-radio-button>
                <el-radio-button label="year">年</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="chartMain">
            <ve-line
              ref="channelChart"
              :data="channelChart.data"
              height="calc(50vh - 80px)"
              :settings="channelChart.settings"
            ></ve-line>
          </div>
        </div>
        <div class="chartBox">
          <div class="boxTitle">
            <span>销售额 - 时间</span>
            <div class="fr">
              <el-radio-group v-model="timeChart.timeType" @change="timeChange" size="mini">
                <el-radio-button label="days">日</el-radio-button>
                <el-radio-button label="month">月</el-radio-button>
                <el-radio-button label="year">年</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="chartMain">
            <ve-line
              width="100%"
              ref="timeChart"
              :data="timeChart.data"
              height="calc(50vh - 80px)"
              :settings="timeChart.settings"
            ></ve-line>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chartBox">
          <div class="boxTitle">
            <span>销售额 - 产品类型</span>
            <div class="fr">
              <el-radio-group v-model="teaTypeChart.timeType" @change="teaTypeChange" size="mini">
                <el-radio-button label="days">日</el-radio-button>
                <el-radio-button label="month">月</el-radio-button>
                <el-radio-button label="year">年</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="chartMain">
            <ve-line
              width="100%"
              ref="teaTypeChart"
              :data="teaTypeChart.data"
              height="calc(50vh - 80px)"
              :settings="teaTypeChart.settings"
            ></ve-line>
          </div>
        </div>
        <div class="chartBox">
          <div class="boxTitle">
            <span>消息中心</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'homePage',
  data () {
    return {
      channelChart:{
        timeType:'days',
        data:{
          columns:['time','DM','TB','JD','PYQ','RQ'],
          rows:[]
        },
        settings:{
          labelMap: {
            'DM': '店面销售',
            "TB": '淘宝',
            "JD": '京东',
            "PYQ": '朋友圈',
            "RQ": '人情'
          },
        },
      },
      teaTypeChart:{
        timeType:'days',
        data:{
          columns:['time', "greenTea", "blackTea", "scentedTea", "darkTea", "FruitTea"],
          rows:[]
        },
        settings:{
          labelMap: {
            "greenTea": '绿茶',
            "blackTea": '红茶',
            "scentedTea": '花茶',
            "darkTea": '黑茶',
            "FruitTea": '果茶'
          },
        },
      },
      timeChart:{
        timeType:'days',
        data:{
          columns:['time', "number"],
          rows:[]
        },
        settings:{
          labelMap: {
            "number": '销售额',
          },
        },
      },
    }
  },
  watch:{
    '$parent.toggleTrue':function (val){
      this.channelChange()
      // this.$refs.channelChart.echarts.resize()
      // this.$refs.teaTypeChart.echarts.resize()
      // this.$refs.timeChart.echarts.resize()
    }
  },
  mounted() {
    this.channelChange()
    this.teaTypeChange()
    this.timeChange()
  },
  methods:{
    channelChange(){
      console.log(111);
      let name = {
        days:'channelDays',
        month:'channelMonth',
        year:'channelYear',
      }
      this.channelChart.data.rows = require('../../util/baseData').default[name[this.channelChart.timeType]].slice(-12)
      this.$nextTick(()=>{
        this.$refs.channelChart.echarts.resize()
      })
    },
    teaTypeChange(){
      let name = {
        days:'teaDays',
        month:'teaMonth',
        year:'teaYear',
      }
      this.teaTypeChart.data.rows = require('../../util/baseData').default[name[this.teaTypeChart.timeType]].slice(-12)
      this.$nextTick(()=>{
        this.$refs.teaTypeChart.echarts.resize()
      })
    },
    timeChange(){
      let name = {
        days:'numberDays',
        month:'numberMonth',
        year:'numberYear',
      }
      this.timeChart.data.rows = require('../../util/baseData').default[name[this.timeChart.timeType]].slice(-12)
      this.$nextTick(()=>{
        this.$refs.timeChart.echarts.resize()
      })
    },
  }
}
</script>

<style lang="less" scoped>
.homePage{
  width: 100%;
  height: 100%;
  .chartBox{
    box-sizing: border-box;
    width: 100%;
    //padding: 8px;
    height: calc(50vh - 50px);
    .boxTitle{
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      font-weight: 700;
      padding-right: 20px;
    }
    .chartMain{
    }
  }
}
</style>

