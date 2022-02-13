<template>
  <div class="productManage">
<!--    <el-button size="small">添加产品</el-button>-->
    <div class="setBox">
      <el-button style="position: relative;padding-right: 26px" type="primary" plain size="mini"  @click="addTree('')">
        添加产品
        <i class="iconfont icon-file-add"></i>
      </el-button>
    </div>
<!--    <div style="width: 400px; margin-bottom: 15px">-->
<!--      <el-input size="small" clearable placeholder="请输入产品名称" v-model="productSearch">-->
<!--        <el-button slot="append" icon="el-icon-search" @click="searchProduct"></el-button>-->
<!--      </el-input>-->
<!--    </div>-->
    <div class="treeBox">
<!--      <el-tree-->
<!--        ref="allTree"-->
<!--        :data="data"-->
<!--        :filter-node-method="filterNode"-->
<!--        node-key="value">-->
<!--      <span class="treeItem" slot-scope="{ node, data }">-->
<!--        <span>{{ node.label }}</span>-->
<!--        <span>-->
<!--          <i v-if="!data.children || (data.children && data.children.length === 0)" class="el-icon-remove-outline" @click.stop="remove(data)"></i>-->
<!--          <i class="el-icon-circle-plus-outline" @click.stop="addTree(data)"></i>-->
<!--          <i class="el-icon-edit-outline" @click.stop="editProduct(data)"></i>-->
<!--        </span>-->
<!--      </span>-->
<!--      </el-tree>-->
      <el-table
        :data="productNameList"
        height="calc(100vh - 160px)"
        row-key="value"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          prop="label"
          width="400"
          :resizable="false"
          label="产品名称">
        </el-table-column>
        <el-table-column
          prop="unit"
          label="单位"
          :resizable="false"
          align="center"
          width="60">
        </el-table-column>
        <el-table-column
          prop="remark"
          :resizable="false"
          label="备注">
        </el-table-column>
        <el-table-column
          label="操作"
          :resizable="false"
          width="100">
          <template slot-scope="scope">
<!--            <el-button type="text" size="small" @click.stop="editProduct(scope.row)">添加产品</el-button>-->
            <el-button type="text" size="small" @click.stop="editProduct(scope.row)">编辑</el-button>
            <el-button type="text" size="small" v-if="!scope.row.children || (scope.row.children && scope.row.children.length === 0)" @click.stop="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
              :options="productNameList"
              :lastActive="false"
              v-model="addForm.type"
            ></dropTree>
          </el-form-item>
          <el-form-item label="产品名称" prop="name">
            <el-input size="small" placeholder="请输入产品名称" v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="产品单位" prop="unit">
            <el-input size="small" placeholder="请输入单位" v-model="addForm.unit"></el-input>
          </el-form-item>
          <el-form-item label="产品备注">
            <el-input type="textarea" placeholder="请输入备注" :rows="6" :resize="'none'" v-model="addForm.remark"></el-input>
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
        productNameList:require('../../../util/baseData').default.teaType,
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
          // unit:[
          //   { required: true, message: '请填写产品单位', trigger: 'blur' }
          // ],
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
        let a = data.value.split('-')
        this.addForm.type = a.slice(0,a.length - 1).join('-')
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
