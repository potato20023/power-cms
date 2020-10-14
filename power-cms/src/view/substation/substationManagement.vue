<template>
  <div class="container">
    <h3>管理一</h3>
    <el-button type="primary" round style="margin-bottom:20px" @click="add()">新增</el-button>
    <el-table :data="dataList" border>
      <el-table-column prop="stationName" label="变电站名称"></el-table-column>
      <el-table-column
        prop="stationAddress"
        label="变电站地址"
      ></el-table-column>
      <el-table-column prop="stationFzr" label="负责人"></el-table-column>
      <el-table-column prop="stationFzrdh" label="负责人电话"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="upTime" label="更新时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200px">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleClick(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog
      :visible.sync="dialogVisible"
      title="新增"
    >
      <el-form
        :model="formData"
        label-width="100px"
        ref="ruleform"
        :rules="rules"
      >
        <el-form-item label="变电站名称" prop="stationName">
          <el-input type="text" v-model="formData.stationName" maxlength="21" placeholder="请输入变电站名称"></el-input>
        </el-form-item>
        <el-form-item label="变电站地址" prop="stationAddress">
          <el-input type="text" v-model="formData.stationAddress" maxlength="101" placeholder="请输入变电站地址"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="stationFzr">
          <el-input type="text" v-model="formData.stationFzr" maxlength="11" placeholder="请输入负责人"></el-input>
        </el-form-item>
        <el-form-item label="负责人电话" prop="stationFzrdh">
          <el-input v-model="formData.stationFzrdh" maxlength="16" placeholder="请输入负责人电话"></el-input>
        </el-form-item>
        <el-form-item label="等级" prop="level">
          <el-input v-model="formData.level" maxlength="6" placeholder="请输入等级"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label=1>正常</el-radio>
            <el-radio :label=0>已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleform')">提交</el-button>
          <el-button @click="cancleForm('ruleform')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getSubstationManagement,addSubstationManagement } from "@/api/mode";
import { mapGetters } from 'vuex'
export default {
  name: "",
  data() {
    return {
      dialogVisible:false,
      formData:{
        stationName: "",   //变电站名称
        stationAddress: "",    //变电站地址
        stationFzr: "",       //负责人
        stationFzrdh: "",     //负责人电话
        level: "",   //所属等级
        opuser: 1,   //操作人id
        status: 1    //状态：1-正常，0-删除
      },
      rules:{
        stationName:[
          {required:true,message:'请输入变电站名称',trigger:'blur'},
          {min:3,max:20,message:'长度在3~20个字符',trigger:'blur'}
        ],
        stationAddress:[
          {required:true,message:'请输入变电站地址',trigger:'blur'},
          {min:5,max:100,message:'长度在5~100个字符',trigger:'blur'}
        ],
        stationFzr:[
          {required:true,message:'请输入负责人',trigger:'blur'},
          {min:2,max:10,message:'长度在2~10个字符',trigger:'blur'}
        ],
        stationFzrdh:[
          {required:true,message:'请输入负责人电话',trigger:'blur'},
          {min:8,max:15,message:'请输入正确的电话，长度在8~15个字符',trigger:'blur'}
        ],
        level:[
          {required:true,message:'请输入所属等级',trigger:'blur'},
          {min:1,max:5,message:'长度在1~5个字符',trigger:'blur'}
        ],
        status:[
          {required:true,message:'请选择状态',trigger:'blur'}
        ]
      },
      dataList: [], //列表数据
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
    // 获取列表数据
    getList() {
      let data = {
        page: 1, // 页数
        rows: 10, // 每页几条数据
      };
      getSubstationManagement(data).then((res) => {
        if (res.code == 200) {
          this.dataList = res.data;
        }
      });
    },
    // 新增
    add(){
      this.dialogVisible = true
    },
    // 提交
    submitForm(formName){
      let $this = this
      $this.$refs[formName].validate((valid)=>{
        if(valid){
          $this.formData.opuser = $this.userId
          addSubstationManagement($this.formData).then(res=>{
            console.log(res)
          })
        }else{
          console.log('error submit!!')
          return false
        }
      })
    },
    // 取消提交
    cancleForm(formName){
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    },
  },
  watch: {},
};
</script>
<style lang='scss' scoped>
h3 {
  margin-bottom: 20px;
}
</style>