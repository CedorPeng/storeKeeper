<template>
  <div class="memberManage">
    <div class="setBox">
      <el-button style="position: relative;padding-right: 26px" type="primary" plain size="mini" @click="addMember">
        添加成员
        <i class="iconfont icon-addteam"></i>
      </el-button>
    </div>
    <div class="memberContent">
      <el-table
        :data="memberData"
        border
        style="width: 100%">
        <el-table-column
          prop="memberID"
          width="100"
          align="center"
          label="员工ID">
        </el-table-column>
        <el-table-column
          prop="memberName"
          align="center"
          label="员工姓名">
        </el-table-column>
        <el-table-column
          prop="memberPhone"
          align="center"
          label="员工联系方式">
        </el-table-column>
        <el-table-column
          prop="role"
          align="center"
          label="员工角色">
        </el-table-column>
        <el-table-column
          align="center"
          label="性别">
          <template slot-scope="scope">
            {{scope.row.sex === '1' ? '男' : '女'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          align="center"
          label="创建时间">
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="createBy"-->
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
      :title="modelType === 'add' ? '新增员工' : '编辑员工'"
      :visible.sync="showModel"
      width="30%">
      <span>
        <el-form ref="memberForm" label-position="right" :rules="rules" label-width="120px" :model="memberForm">
          <el-form-item label="员工姓名：" prop="memberName">
            <el-input v-model="memberForm.memberName" placeholder="请输入员工姓名"></el-input>
          </el-form-item>
          <el-form-item label="员工手机号：" prop="memberPhone">
            <el-input v-model="memberForm.memberPhone" placeholder="请输入员工手机号"></el-input>
          </el-form-item>
          <el-form-item label="员工性别：">
              <el-radio v-model="memberForm.sex" label="1">男</el-radio>
              <el-radio v-model="memberForm.sex" label="2">女</el-radio>
          </el-form-item>
          <el-form-item label="员工角色：" prop="role">
            <el-select v-model="memberForm.role" clearable placeholder="请选择员工角色">
              <el-option
                v-for="item in roleList"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showModel = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
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
      memberForm:{
        memberName:'',
        memberPhone:'',
        role:'',
        sex:'1',
      },
      rules: {
        memberName: [
          {
            required: true,
            message: '员工名称必填',
            trigger: 'blur'
          }
        ],
        memberPhone: [
          {
            required: true,
            message: '员工名称必填',
            trigger: 'blur'
          }
        ],
        role: [
          {
            required: true,
            message: '员工角色必选',
            trigger: 'change'
          }
        ],
      },
      roleList:require('../../../util/baseData').default.roleList,
      memberData:[
        {
          memberID:'1',
          memberName:'某某某',
          memberPhone:'13269923383',
          role:'经理',
          sex:'2',
          createTime:'2021-12-10',
          createBy:'彭旭灿',
        },
        {
          memberID:'2',
          memberName:'某某某',
          memberPhone:'13269923383',
          role:'店长',
          sex:'2',
          createTime:'2021-12-10',
          createBy:'彭旭灿',
        },
        {
          memberID:'3',
          memberName:'某某某',
          memberPhone:'13269923383',
          role:'员工',
          sex:'2',
          createTime:'2021-12-10',
          createBy:'彭旭灿',
        },
      ]
    }
  },
  methods:{
    editRole(row,index){
      console.log(row,'edit',index);
      this.modelType = row.memberID
      this.editIndex = index
      this.memberForm.memberName = row.memberName
      this.memberForm.memberPhone = row.memberPhone
      this.memberForm.role = row.role
      this.memberForm.sex = row.sex
      this.showModel = true
      this.$nextTick(()=>{
        this.$refs.memberForm.clearValidate()
      })
    },
    deleteRole(row,index){
      this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.memberData.splice(index,1)
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
    addMember(){
      this.modelType = 'add'
      this.showModel = true
      this.memberForm.memberName = ''
      this.memberForm.memberPhone = ''
      this.memberForm.role = ''
      this.memberForm.sex = '1'
      this.$nextTick(()=>{
        this.$refs.memberForm.clearValidate()
      })
    },
    confirmEdit() {
      let params = {
        ...this.memberForm
      }
      if(this.modelType !== 'add') params.id = this.modelType
      console.log(params);
      this.$refs.memberForm.validate((valid) => {
        if (valid) {
          if(this.modelType === 'add'){
            this.memberData.push({
              ...this.memberForm
            })
          }else{
            Vue.set(this.memberData,this.editIndex,{
              ...this.memberData[this.editIndex],
              ...this.memberForm
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
.memberManage{
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

