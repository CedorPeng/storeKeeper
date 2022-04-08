<template>
  <div class="TypeSelectors">
    <typeItem :currentValue="currentValue" :options="currentOptions" @valueChange="getCurrentValue"></typeItem>
<!--    <el-button @click="clickChecked">默认按钮</el-button>-->
<!--    <el-checkbox v-model="checked">1111</el-checkbox>-->

  </div>
</template>

<script>
  import typeItem from './typeItem'
  import Vue from 'vue'
  export default {
    name: "index",
    components:{typeItem},
    props:{
      options:Array,
    },
    data(){
      return {
        checked:false,
        currentValue:['L1'],
        currentOptions:[
          {
            label:'绿茶',
            unit:'',
            remark:'备注',
            value:'L1',
            children:[
              {
                label:'西湖龙井',
                unit:'',
                remark:'备注',
                value:'L1-1',
                children:[
                  {
                    label:'中狮口粮茶叶龙井',
                    unit:'g',
                    remark:'备注',
                    value:'L1-1-1'
                  },
                  {
                    label:'龙井茶礼盒装新茶雨前明前特级陶瓷罐',
                    unit:'罐',
                    remark:'备注',
                    value:'L1-1-2'
                  },
                  {
                    label:'西湖牌正宗雨前龙井茶',
                    unit:'g',
                    remark:'备注',
                    value:'L1-1-3'
                  },
                  {
                    label:'杭州狮峰山明前特级西湖龙井茶',
                    unit:'罐',
                    remark:'备注',
                    value:'L1-1-4'
                  },
                  {
                    label:'卢正浩明前特级西湖龙井茶',
                    unit:'g',
                    remark:'备注',
                    value:'L1-1-5'
                  },
                ]
              },
            ]
          },
          {
            label:'红茶',
            unit:'g',
            remark:'备注',
            value:'H1',
            children:[
              {
                label:'普洱',
                unit:'g',
                remark:'备注',
                value:'H1-1',
                children:[
                  {
                    label:'五叶七叶绞股蓝三龙须茶高非九叶茶',
                    unit:'g',
                    remark:'备注',
                    value:'H1-1-1'
                  },
                  {
                    label:'以美养生茶养生茶七叶绞股蓝龙须茶',
                    unit:'罐',
                    remark:'备注',
                    value:'H1-1-2'
                  },
                  {
                    label:'平利绞股蓝茶五叶甘味特级龙须茶',
                    unit:'g',
                    remark:'备注',
                    value:'H1-1-3'
                  },
                  {
                    label:'张家界野生嫩芽龙须茶芽尖',
                    unit:'罐',
                    remark:'备注',
                    value:'H1-1-4'
                  },
                ]
              },
            ]
          },

        ]
      }
    },
    methods:{
      clickChecked(){
        this.checked = !this.checked
        console.log(this.checked);
      },
      resetDisabled(options){
        // console.log(options);
        let newOptions = options.map(item=>{
          let newItem = {
            ...item,
            disabled: true,
            vModel:this.currentValue.includes(item.value)
          }
          if(item.children && item.children.length !== 0){
            newItem.children = this.resetDisabled(item.children)
          }
          return newItem
        })
        return newOptions
      },
      oneSet(options){
        let newOptions = options.map(item=>{
          let newItem = {
            ...item,
            disabled:false,
            vModel:this.currentValue.includes(item.value)
          }
          if(item.children && item.children.length !== 0){
            newItem.children = this.currentValue.includes(item.value) ? this.resetDisabled(item.children) : this.oneSet(item.children)
          }
          return newItem
        })
        return newOptions
      },
      getCurrentValue(value){
        if(this.currentValue.includes(value.value)){
          this.currentValue = [...this.currentValue, value.value].filter(item => !item.includes(value.value))
        }else{
          this.currentValue = [...this.currentValue,value.value].filter(item => item === value.value || !item.includes(value.value))
        }
        this.currentOptions = this.oneSet(this.currentOptions)
        // this.$set(this,'currentOptions',this.oneSet(this.currentOptions))
      }
    },
    mounted() {
      // this.currentValue.forEach(item=>{
        this.currentOptions = this.oneSet(this.currentOptions)
      // })
      console.log(this.currentOptions);
    },
    watch:{
    }
  }
</script>

<style lang="less" scoped>
.TypeSelectors{

}
</style>
