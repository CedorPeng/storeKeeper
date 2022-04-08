<template>
  <div class="typeItem">
    <div class="itemOptions" v-for="item in options" :key="item.value">
      <div class="currentItem">
<!--        <el-checkbox :disabled="item.disabled" :checked="currentValue.includes(item.value)" @change="valueChange(item)">{{item.label}}{{currentValue.includes(item.value)}}</el-checkbox>-->
        <el-checkbox :disabled="item.disabled" v-model="item.vModel" @change="valueChange(item)">{{item.label}}{{currentValue.includes(item.value)}}</el-checkbox>
      </div>
      <div class="itemChild" v-if="item.children && item.children.length !== 0">
        <typeItem :currentValue="currentValue" :options="item.children" @valueChange="valueChange"></typeItem>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "typeItem",
    props:{
      currentValue:{
        type:Array,
        default:[]
      },
      options:[Array],
    },
    data(){
      return {
      }
    },
    watch:{
      currentValue:function (val) {
        console.log(val,'watch');
        this.$forceUpdate()
      }
    },
    mounted() {
    },
    methods:{
      valueChange(currentNode){
        // console.log(currentNode,this.currentValue,'nodeClick');
        this.$emit('valueChange',currentNode)
      },
    }

  }
</script>

<style lang="less" scoped>
  .currentItem{
    line-height: 26px;
  }
  .itemChild{
    padding-left: 18px;
  }

</style>
