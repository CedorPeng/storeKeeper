<template>
  <div class="roleManage">
    <div class="setBox">
      <el-button style="position: relative;padding-right: 26px" type="primary" plain size="mini" @click="addRole">
        添加角色
        <i class="iconfont icon-addteam"></i>
      </el-button>
    </div>
    <div class="roleContent">
      <el-table
        :data="roleData"
        border
        style="width: 100%">
        <el-table-column
          prop="roleID"
          width="100"
          align="center"
          label="角色ID">
        </el-table-column>
        <el-table-column
          prop="roleName"
          width="120"
          align="center"
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="jurisdiction"
          label="角色权限">
          <template slot-scope="scope">
            {{scope.row.jurisdiction.join('，')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          width="160"
          align="center"
          label="创建时间">
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="createBy"-->
<!--          width="120"-->
<!--          align="center"-->
<!--          label="创建人">-->
<!--        </el-table-column>-->
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="editRole(scope.row,scope.$index)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteRole(scope.row,scope.$index)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="modelType === 'add' ? '新增角色' : '编辑角色'"
      :visible.sync="showModel"
      width="30%">
      <span>
        <el-form ref="roleForm" label-position="right" :rules="rules" label-width="120px" :model="roleForm">
          <el-form-item label="角色名称：" prop="roleName">
            <el-input v-model="roleForm.roleName" placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item label="角色权限：" prop="jurisdiction">
            <el-select v-model="roleForm.jurisdiction" multiple clearable placeholder="请选择角色权限">
              <el-option
                v-for="item in roleList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showModel = false">取 消</el-button>
        <el-button type="primary" @click="confirmModel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: "index",
  data(){
    return {
      showModel:false,
      editIndex:0,
      modelType:'add',
      roleForm:{
        roleName:'',
        jurisdiction:[],
      },
      rules: {
        roleName: [
          {
            required: true,
            message: '角色名称必填',
            trigger: 'blur'
          }
        ],
        jurisdiction: [
          {
            required: true,
            message: '角色权限必选',
            trigger: 'blur'
          }
        ],
      },
      roleList:['店铺管理','销售','库存','进货','数据分析'],
      roleData:[
        {
          roleID:'1',
          roleName:'经理',
          jurisdiction:['店铺管理','销售','库存','进货','数据分析'],
          createTime:'2021-12-10',
          createBy:'彭旭灿',
        },
        {
          roleID:'2',
          roleName:'店长',
          jurisdiction:['销售','库存','进货'],
          createTime:'2021-12-10',
          createBy:'彭旭灿',
        },
        {
          roleID:'3',
          roleName:'店员',
          jurisdiction:['销售','库存'],
          createTime:'2021-12-10',
          createBy:'彭旭灿',
        },
      ]
    }
  },
  methods:{
    editRole(row,index){
      this.modelType = row.id
      this.editIndex = index
      this.roleForm.roleName = row.roleName
      this.roleForm.jurisdiction = row.jurisdiction
      this.showModel = true
      this.$nextTick(()=>{
        this.$refs.roleForm.clearValidate()
      })
    },
    deleteRole(row,index){
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.roleData.splice(index,1)
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
    addRole(){
      this.modelType = 'add'
      this.showModel = true
      this.roleForm.roleName = ''
      this.roleForm.jurisdiction = ''
      this.$nextTick(()=>{
        this.$refs.roleForm.clearValidate()
      })
    },
    confirmModel() {
      let params = {
        ...this.roleForm
      }
      if(this.modelType !== 'add') params.id = this.modelType
      console.log(params);
      this.$refs.roleForm.validate((valid) => {
        if (valid) {
          if(this.modelType === 'add'){
            this.$message.success('添加成功')
          }else{
            Vue.set(this.roleData,this.editIndex,{
              ...this.roleData[this.editIndex],
              roleName: this.roleForm.roleName,
              jurisdiction: this.roleForm.jurisdiction,
            })
          }
          this.showModel = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.roleManage{
  width: 100%;
  height: 100%;
  position: relative;
  .setBox{
    position: absolute;
    top: -49px;
    right: 0;
    .icon-addteam{
      position: absolute;
      top: 5px;
      right: 10px;
    }
  }
  /deep/.el-select{
    width: 100%;
  }

}

</style>
