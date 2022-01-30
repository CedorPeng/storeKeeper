<!--HTML-->
<!--<dropTree-->
<!--  v-model="demoParams.value"-->
<!--  :options="demoParams.options"-->
<!--  clearable-->
<!--  checkAll-->
<!--  filter-->
<!--  multiple-->
<!--  required-->
<!--  search-->
<!--  name="demoParams"-->
<!--  @filterChange="filterChange"/>-->
<!--api and 方法-->
<!-- v-model 当前组件绑定的值,具体可参照当前组件中的demoParams-->
<!-- options 当前组件所要显示的选项,具体可参照当前组件中的demoParams-->
<!-- 1. clearable 是否可reset清除选项-->
<!-- 2. checkAll 是否可全选和全不选-->
<!-- 3. filter    是否过滤(options过滤)-->
<!-- 4. required   是否为必选-->
<!-- 5. search    过滤是否需要后端请求-->
<!-- 6. name      调用当前组件的name search后端接口筛选的时候,必传-->
<!-- 7. filterChange      后端接口进行筛选的时候,通过返回的name和search_value请求接口-->
<!-- 8. multiple      多选 ｜｜ 单选-->
<!--todo:当前做了两种后端接口筛选方案 1.直接在组件内部调用接口 2.组件内部返回当前组件name和search_value,父组件调用接口改变options-->

<!--2020-06-11-->
<!--增强筛选框位置可slot功能-->
<!--目前只可改变dropTree-model部分（适应 icon-tree 和btn-tree功能）-->

<template>
  <div class="dropTree" v-clickoutside="closeOptions">
    <div class="dropTree-required" v-if="required">*</div>
    <div v-if="soltModel" @click="toggle">
      <slot name="model"></slot>
    </div>
    <div v-if="disabled" class="dropTree-disabled"></div>
    <div
      v-if="!soltModel"
      class="dropTree-model"
      @click="toggle"
      @mousemove="inputMouseover"
      @mouseout="inputMouseout">
      <div class="dropTree-model__placeholder" v-if="value.length === 0 || value === ''">{{isEN ? $t(placeholder) : placeholder}}</div>
      <div class="dropTree-model__value" v-else>
        <span class="dropTree-model__value-text fl" v-if="multiple">{{label[value[0]] || value[0]}}</span>
        <span class="dropTree-model__value-text fl" v-if="!multiple">{{label[value] || value}}</span>
        <span class="fl" v-if="multiple && value.length > 1">(+{{value.length - 1}})</span>
      </div>
      <i class="dropTree-set el-icon-circle-close" v-show="clearable && isShowClear"  @click.stop="clearValue"></i>
      <i
        class="dropTree-set label-icon"
        :class="isShowOptions ? 'el-icon-arrow-up' : 'el-icon-arrow-left'"
        v-show="!clearable || !isShowClear"
      ></i>
    </div>
    <transition name="el-zoom-in-top">
      <div class="dropTree-options" :style="{'right': optionRight, 'left': optionLeft}" v-show="isShowOptions">
        <el-scrollbar>
          <el-input v-model="searchValue" placeholder="filter" v-if="filter"></el-input>
          <div class="dropTree-utils" v-if="checkAll">
            <span class="dropTree-util__selectAll fl" @click="allSet(true)">Select All</span>
            <span class="dropTree-util__selectNone fr" @click="allSet(false)">None</span>
          </div>
          <el-tree
            v-if="multiple"
            style="padding-right: 10px"
            :data="options"
            show-checkbox
            node-key="value"
            ref="tree"
            :filter-node-method="filterLabel"
            :default-checked-keys="value"
            @check="getTreeModel"/>
          <el-tree
            v-else
            style="padding-right: 10px"
            class="notMultiple"
            :data="options"
            node-key="value"
            :expand-on-click-node="lastActive"
            ref="tree"
            :filter-node-method="filterLabel"
            :default-checked-keys="[value]"
            @node-click="currentClick"/>
          <!--          <el-tree-->
          <!--            style="padding-right: 10px"-->
          <!--            :data="searchValue && searchParams ? filterOptions : options"-->
          <!--            show-checkbox-->
          <!--            node-key="value"-->
          <!--            ref="tree"-->
          <!--            :filter-node-method="filterLabel"-->
          <!--            :default-checked-keys="value"-->
          <!--            @check="getTreeModel"/>-->
        </el-scrollbar>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    isEN:{
      type:Boolean,
      default:false
    },
    name:{
      type:String,
      default:''
    },
    placeholder:{
      type:String,
      default:'Select'
    },
    optionRight:{
      type:String,
      default:''
    },
    optionLeft:{
      type:String,
      default:''
    },
    clearable:{
      type:Boolean,
      default:false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    filter: {
      type: Boolean,
      default: false
    },
    checkAll: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    searchParams: {
      default: null
    },
    required: {
      type: Boolean,
    },
    value: [Array,String,Number],
    options:[Array],
    disabled:{
      type: Boolean,
      default: false
    },
    lastActive:{
      type: Boolean,
      default: true
    }


  },
  data () {
    return {
      searchTimer:null,
      label:{},
      isShowOptions:false,
      isShowClear:false,
      searchValue:'',
      filterOptions:[],
      selectValue:[],
      demoParams:{
        value:['1','2','3','4'],
        options:[
          {
            label:'pengxc2',
            value: '1',
            children:[
              {
                label:'chuym1',
                value: '6'
              },
              {
                label:'chuym1',
                value: '7'
              },
              {
                label:'chuym1',
                value: '8'
              },
            ]
          },
          {
            label:'niuxf2',
            value: '2'
          },
          {
            label:'shijh1211111111123',
            value: '3',
            children: [
              {
                label:'chuym1',
                value: '9'
              },
              {
                label:'chuym1',
                value: '10'
              },
              {
                label:'chuym1',
                value: '11'
              },
            ]
          },
          {
            label:'chuym1',
            value: '4',
            children:[
              {
                label:'chuym1',
                value: '12'
              },
              {
                label:'chuym1',
                value: '13'
              },
              {
                label:'chuym1',
                value: '14'
              },
            ]
          },
          {
            label:'chuym1',
            value: '5'
          },
        ],
        searchParams:{
          url:'serviceUpsell/getFilterByTerm',
          params:{
            search_nameKey:'search_type',
            search_name:'ISR',
            search_valueKey:'search_value',
          }
        }
      },
      change:false,
    }
  },
  computed: {
    soltModel () {
      return this.$slots.model
    }
  },
  watch: {
    searchValue:function(val){
      let searchText = val.replace(/(^\s*)|(\s*$)/g, "")
      if(this.search){
        // this._debounce(this.getFilterOptions)
        this._debounce(()=>{
          this.$emit('filterChange',{name:this.name , value : searchText})
        })
      }else{
        this.$refs.tree.filter(searchText.toLowerCase());
      }
    },
    options:function(val){
      if(val){
        this.setLabel()
      }
    },
    value:function(val){
      if(this.multiple){
        this.$refs.tree.setCheckedNodes(val);
      } else {
        this.$refs.tree.setCheckedNodes(val ? [val] : []);
      }

    }
  },
  methods: {
    _debounce(fn){
      if (this.searchTimer) {
        clearTimeout(this.searchTimer)
      }
      this.searchTimer = setTimeout(fn, 500)
    },
    currentClick(a){
      if(a.children && this.lastActive) return
      this.change = true
      this.$emit('input', a.value);
      this.$emit('change', a.value);
      this.closeOptions()
    },
    async getFilterOptions(){
      let params = {
        [this.searchParams.params.search_nameKey]: this.searchParams.params.search_name,
        [this.searchParams.params.search_valueKey]: this.searchValue
      }
      try {
        let res = await this.axios.post(`${this.this.searchParams.url}`, params)
        if (res.data.status === 200) {
          this.filterOptions = res.data.data.map(item=>{
            return {
              label:item,
              value:item
            }
          })
        } else {
          console.log('getTimeFilter接口错误')
        }
      } catch (e) {
        console.log(e)
      }
    },
    closeOptions(){
      if(this.isShowOptions === true){
        this.isShowOptions = false
        if(this.change) {
          setTimeout(()=>{
            this.$emit('selectDone',this.name)
            this.change = false
          })
        }
      }
    },
    inputMouseover(){
      this.isShowClear = this.value.length !== 0
    },
    inputMouseout(){
      this.isShowClear = false
    },
    clearValue(){
      this.change = true
      this.selectValue = this.multiple ? [] : ''
      this.$emit('input', this.selectValue);
      this.$emit('change', this.selectValue);
      this.$emit('selectDone',this.name)
      this.$refs.tree.setCheckedNodes([]);
    },
    toggle(){
      this.isShowOptions = !this.isShowOptions
      if(this.searchValue && this.isShowOptions ){
        let searchText = this.searchValue.replace(/(^\s*)|(\s*$)/g, "")
        if(this.search){
          this._debounce(()=>{
            this.$emit('filterChange',{name:this.name , value : searchText})
          })
        }else{
          this.$refs.tree.filter(searchText.toLowerCase());
        }
      }
    },
    getTreeModel(checkedNodes,checkedKeys){
      this.change = true
      let model = checkedKeys.checkedNodes.filter(item=>!item.children).map(item=>item.value)
      this.$emit('input', model);
      this.$emit('change', model);
    },
    allSet(type){
      this.change = true
      this.selectValue = type ? this.getEveryOne(this.options).map(v=>v.value) : []
      this.$emit('input', this.selectValue);
      this.$emit('change', this.selectValue);
      this.$refs.tree.setCheckedNodes(this.selectValue);
    },
    getEveryOne(array){
      let all = []
      array.forEach(item=>{
        all.push(item)
        if(item.children){
          all = [...all,...this.getEveryOne(item.children)]
        }
      })
      return all
    },
    filterLabel(value,data){
      if (!value) return true;
      return data.label.toLowerCase().indexOf(value) !== -1;
    },
    setLabel(){
      if(this.options.length !== 0){
        this.getEveryOne(this.options).forEach(v=>{
          this.label[v.value] = v.label
        })
      }
    },
  },
  mounted() {

  },
  created() {
    this.setLabel()
  }
}
</script>

<style scoped lang="less">
.dropTree{
  position: relative;
  //width: 188px;
  height: 26px;
  padding: 0 14px;
  margin: 8px 0;
  &-required{
    color: red;
    position: absolute;
    width: 14px;
    height: 16px;
    top: 4px;
    left: 0;
    font-size: 24px;
  }
  &-disabled{
    //width: 160px;
    height: 26px;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 14px;
    cursor: not-allowed;
    background: #eee;
    opacity: .5;
  }
  &-model{
    //width: 160px;
    height: 26px;
    line-height: 26px;
    padding-left: 10px;
    background: #FFFFFF;
    border: 1px solid #D8DCE6;
    border-radius: 4px;
    cursor: pointer;
    z-index: 1;
    &__placeholder{
      font-size: 12px;
      color: #CCCDCC;
    }
    &__value{
      font-size: 12px;
      color: #666766;
      /*height: 28px;*/
      &-text{
        //max-width: 90px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    &:hover{
      border: 1px solid #c0c4cc;
    }
  }
  &-set{
    position: absolute;
    top: 8px;
    right: 22px;
    font-size: 14px;
    &&.el-icon-arrow-up {
      transform: rotate(0);
      transition: transform .2s linear;
    }
    &&.el-icon-arrow-left {
      transform: rotate(-90deg);
      transition: transform .2s linear;
    }
  }
  &-options{
    position: absolute;
    top: 32px;
    left: 14px;
    background: #fff;
    border: 1px solid #E4E7ED;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
    border-radius: 4px;
    max-height: 300px;
    min-width: 160px;
    max-width: 360px;
    z-index: 3;
    /deep/ .el-input__inner {
      width: 90%;
      margin: 0 auto;
      padding:0;
      display: block;
      border: 0;
      border-bottom: 1px solid #DCDFE6;
      border-radius: 0;
      &:focus{
        border-bottom: 1px solid #DCDFE6;
      }
    }
    &:before{
      position: absolute;
      top: -12px;
      left: 20px;
      content: "";
      width: 0px;
      height: 0px;
      border-bottom: 6px solid #fff;
      border-right: 6px solid transparent;
      border-left: 6px solid transparent;
      border-top: 6px solid transparent;
    }
  }
  &-utils{
    width: 90%;
    margin: 0 auto;
    display: block;
    border: 0;
    border-bottom: 1px solid #DCDFE6;
    height: 28px;
    line-height: 28px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #007EFF;
    span{
      cursor: pointer;
    }
  }
}
</style>
<style lang="less">
.dropTree{
  &-options{
    .el-scrollbar__wrap{
      max-height: 300px;
    }
  }
  .notMultiple{
    .is-checked{
      font-weight: 700;
      color:#1989FA;
    }
  }
}

</style>
