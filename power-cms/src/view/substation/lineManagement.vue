<template>
  <div class="container">
    <h3>管理二</h3>
    <p>线路管理</p>
    <el-button type="primary" round @click="add()">新增</el-button>

    <el-table
      :data="dataList"
      border
      style="margin:20px auto"
    >
      <el-table-column label="线路名称" prop="lineName"></el-table-column>
      <el-table-column label="线路等级" prop="lineLevel"></el-table-column>
      <el-table-column label="创建时间" prop="createTimeStr"></el-table-column>
      <el-table-column label="更新时间" prop="upTimeStr"></el-table-column>
      <el-table-column label="状态" prop="status"></el-table-column>
      <el-table-column label="操作" fixed="right" width="200px">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editOne(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteOne(scope.row)" v-if="scope.row.status == 1">删除</el-button>
          <el-button type="danger" size="small" disabled v-else>已删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="dialogVisible"
      @closed="handleClosed"
      :title="ifAdd?'新增':'编辑'"
    >
      <el-form ref="ruleform" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="线路名称" prop="lineName">
          <el-input type="text" v-model="formData.lineName" placeholder="请输入线路名称" maxlength="21"></el-input>
        </el-form-item>
        <el-form-item label="线路等级" prop="lineLevel">
          <el-input type="text" v-model="formData.lineLevel" placeholder="请输入线路等级" maxlength="5"></el-input>
        </el-form-item>
        <el-form-item label="所属变电站" prop="stationId">
          <el-select v-model="formData.stationId">
            <el-option v-for="(item,index) in subList" :key="index" :label="item.stationName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label=1>正常</el-radio>
            <el-radio :label=0>已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleform')" v-if="ifAdd">提交</el-button>
          <el-button type="primary" @click="editForm('ruleform')" v-else>提交</el-button>
          <el-button @click="resetForm('ruleform')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {getLineManagement,addLineManagement,updateLineManagement,deleteLineManagement,getSubstationManagement} from '@/api/mode'
import {mapGetters} from 'vuex'
  export default {
    name:'',
    data () {
      return {
          dialogVisible:false,
          ifAdd:true,
          formData:{
            lineName:'',
            lineLevel:'',
            stationId:'',
            status:1
          },
          rules:{
            lineName:[
              {required:true,message:'请输入线路名称',trigger:'blur'},
              {min:3,max:20,message:'长度在3~20个字符',trigger:'blur'}
            ],
            lineLevel:[
              {required:true,message:'请输入线路等级',trigger:'blur'},
              {min:1,max:5,message:'字符长度为 1~5',trigger:'blur'}
            ],
            stationId:[
              {required:true,message:'请选择变电站',trigger:'blur'}
            ]
          },
          dataList:[],  // 线路列表
          subList:[],  // 变电站列表
          page:1,   // 页数
          rows:10,   // 条数
          total:0   // 总条数
      };                                                               
    },
    computed:{
      ...mapGetters(['userId'])
    },
    components: {},
    mounted() {
      this.getList();
    },
    methods: {
        // 获取线路列表
        getList(){
            let data = {
                page:this.page,
                rows:this.rows
            }
            getLineManagement(data).then(res=>{
                if(res.code === 200){
                    this.dataList = res.extend.listStationLine
                    this.total = res.extend.count
                }
            })
        },
        // 获取变电站列表
        getSubList(){
          let data = {
            page:1,
            rows:100
          }
          getSubstationManagement(data).then(res=>{
            if(res.code == 200){
              this.subList = res.extend.listConvertingStation
            }
          })
        },
        // 新增
        add(){
          this.dialogVisible = true;
          this.ifAdd = true;
          this.getSubList();
        },
        // 点击编辑
        editOne(e){
          this.dialogVisible = true;
          this.ifAdd = false;
          this.formData.lineName = e.lineName
          this.formData.lineLevel = e.lineLevel
          this.formData.stationId = e.stationId
          this.formData.status = e.status
          this.formData.id = e.id
        },
        // 提交（新增）
        submitForm(formName){
          let $this = this;
          $this.$refs[formName].validate((valid)=>{
            $this.formData.opuser = $this.userId
            if(valid){
              addLineManagement($this.formData).then(res=>{
                if(res.code == 200){
                  $this.$message({
                    type:'success',
                    message:'添加成功'
                  })
                }else{
                  $this.$message({
                    type:'danger',
                    message:res.message
                  })
                }
              })
            }
          })
        },
        // 提交（编辑）
        editForm(formName){

        },
        // 重置
        resetForm(formName){
          this.$refs[formName].resetFields();
        },
        // 弹窗关闭
        handleClosed(){
          this.resetForm('ruleform');
          this.ifAdd = true;
        },
    },
    watch: {}
  }

</script>
<style lang='' scoped>

</style>