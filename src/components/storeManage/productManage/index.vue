<template>
  <div class="productManage">
<!--    <el-button size="small">添加产品</el-button>-->
    <div class="setBox">
      <el-button style="position: relative;padding-right: 26px" type="primary" plain size="mini"  @click="addProduct">
        添加产品
        <i class="iconfont icon-file-add"></i>
      </el-button>
    </div>
    <div class="treeBox">
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
              v-model="addForm.parentId"
            ></dropTree>
          </el-form-item>
          <el-form-item label="产品名称" prop="productName">
            <el-input size="small" placeholder="请输入产品名称" v-model="addForm.productName"></el-input>
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
  import Vue from "vue";
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
          parentId:'',
          productName:'',
          unit:'',
          remark:'',
        },
        addRules:{
          productName:[
            { required: true, message: '请填写产品名称', trigger: 'blur' }
          ],
        },
      }
    },
    methods:{
      editProduct(data) {
        this.modelType = data.value
        let a = data.value.split('-')
        this.addForm.parentId = a.slice(0,a.length - 1).join('-')
        this.addForm.productName = data.label
        this.addForm.unit = data.unit
        this.addForm.remark = data.remark
        this.addModel = true
        setTimeout(()=>{
          this.$refs.addForm.clearValidate()
        })
      },
      addProduct(){
        this.modelType = 'add'
        this.addForm.parentId = ''
        this.addForm.productName = ''
        this.addForm.unit = ''
        this.addForm.remark = ''
        this.addModel = true
        setTimeout(()=>{
          this.$refs.addForm.clearValidate()
        })
      },
      confirmEdit() {
        let params = {
          ...this.addForm
        }
        if(this.modelType !== 'add') params.id = this.modelType
        console.log(params);
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.showModel = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      remove() {
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
