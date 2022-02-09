<template>
  <div class="productManage">
<!--    <el-button size="small">添加产品</el-button>-->
    <div class="setBox">
      <el-button style="position: relative;padding-right: 26px" type="primary" plain size="mini"  @click="addTree('')">
        添加产品
        <i class="iconfont icon-file-add"></i>
      </el-button>
    </div>
    <div style="width: 400px; margin-bottom: 15px">
      <el-input size="small" clearable placeholder="请输入产品名称" v-model="productSearch">
        <el-button slot="append" icon="el-icon-search" @click="searchProduct"></el-button>
      </el-input>
    </div>
    <div class="treeBox">
      <el-tree
        ref="allTree"
        :data="data"
        :filter-node-method="filterNode"
        node-key="value">
      <span class="treeItem" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <i v-if="!data.children || (data.children && data.children.length === 0)" class="el-icon-remove-outline" @click.stop="remove(data)"></i>
          <i class="el-icon-circle-plus-outline" @click.stop="addTree(data)"></i>
          <i class="el-icon-edit-outline" @click.stop="editProduct(data)"></i>
        </span>
      </span>
      </el-tree>
    </div>
    <el-dialog
      title="添加产品"
      :visible.sync="addModel"
      width="30%">
      <span>
        <el-form ref="addForm" :rules="addRules" :model="addForm" label-width="80px">
          <el-form-item label="产品种类">
            <dropTree
              class="productSelect"
              placeholder="产品种类"
              clearable
              :options="data"
              :lastActive="false"
              v-model="addForm.type"
            ></dropTree>
          </el-form-item>
          <el-form-item label="产品名称" prop="name">
            <el-input size="small" v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="产品单位" prop="unit">
            <el-input size="small" v-model="addForm.unit"></el-input>
          </el-form-item>
          <el-form-item label="产品备注">
            <el-input type="textarea" :rows="6" :resize="'none'" v-model="addForm.remark"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addModel = false">取 消</el-button>
        <el-button type="primary" @click="addModel = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import dropTree from '../../public/dropTree/index'
  export default {
    name: "index",
    components:{
      dropTree
    },
    data(){
      return {
        productSearch:'',
        data:[
          {
            value: 1,
            label: '一级 1',
            unit:'g',
            remark:'123',
            children: [{
              value: 4,
              label: '二级 1-1',
              unit:'g',
              remark:'',
              children: [{
                value: 9,
                unit:'g',
                remark:'',
                label: '三级 1-1-1'
              }, {
                value: 10,
                unit:'g',
                remark:'',
                label: '三级 1-1-2'
              }]
            }]
          }, {
            value: 2,
            unit:'g',
            remark:'',
            label: '一级 2',
            children: [{
              value: 5,
              label: '二级 2-1'
            }, {
              value: 6,
              unit:'g',
              remark:'',
              label: '二级 2-2'
            }]
          }, {
            value: 3,
            unit:'g',
            remark:'',
            label: '一级 3',
            children: [{
              value: 7,
              unit:'g',
              remark:'',
              label: '二级 3-1',
              children:[]
            }, {
              value: 8,
              unit:'g',
              remark:'',
              label: '二级 3-2'
            }]
          }
        ],
        addModel:false,
        parentId:'',
        addForm:{
          type:'',
          name:'',
          unit:'',
          remark:'',
        },
        addRules:{
          name:[
            { required: true, message: '请填写产品名称', trigger: 'blur' }
          ],
          unit:[
            { required: true, message: '请填写产品单位', trigger: 'blur' }
          ],
        },
      }
    },
    methods:{
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      searchProduct(){
        // console.log();
        this.$refs.allTree.filter(this.productSearch.toLowerCase());
      },
      editProduct(data) {
        console.log(data);
        this.addForm.type = data.value
        this.addForm.name = data.label
        this.addForm.unit = data.unit
        this.addForm.remark = data.remark
        this.addProduct()
      },
      addTree(data) {
        console.log(data);
        this.addForm.type = data ? data.value : ''
        this.addForm.name = ''
        this.addForm.unit = ''
        this.addForm.remark = ''
        this.addProduct()
      },
      remove(data) {
        console.log(data);
        this.$confirm('此操作将永久删除该产品信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
      addProduct(){
        this.addModel = true
        setTimeout(()=>{
          this.$refs.addForm.clearValidate()
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .productManage{
    width: 100%;
    height: 100%;
    position: relative;
    .setBox{
      position: absolute;
      top: -49px;
      right: 0;
      .iconfont{
        position: absolute;
        top: 5px;
        right: 10px;
      }
    }

    .dropTree{
      padding: 0;
      /deep/.dropTree-set{
        right: 10px;
      }
      /deep/.dropTree-model{
        height: 30px;
        line-height: 30px;
        padding-left: 14px;
      }
      /deep/.dropTree-options{
        top: 38px;
      }
    }
    .treeBox{
      width: 100%;
      .treeItem{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
        flex: 1;
        font-size: 16px;
        i{
          margin-left: 6px;
        }
      }

    }
  }
</style>
<style lang="less">
  .productSelect{
    .notMultiple{
      .is-checked {
        font-weight: normal !important;
        color:#606266 !important;
      }
    }
  }
</style>
