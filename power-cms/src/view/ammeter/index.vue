<template>
  <div class="container">
    <h3>管理一</h3>
    <p>电表管理</p>
    <div class="con-head">
      <el-button v-if="csType == 1" type="primary" round @click="add()"
        >新增</el-button
      >
      <div class="search">
        <el-input placeholder="请输入编号" v-model="searchData.serialNumber" @keyup.enter.native="getList"></el-input>
        <el-input placeholder="请输入厂家" v-model="searchData.factory" @keyup.enter.native="getList"></el-input>
        <el-select
          v-model="searchData.stationId"
          @change="subChangeSearch(searchData.stationId)"
          placeholder="请选择变电站"
          style="width:100%"
        >
          <el-option
            v-for="(item, index) in subList"
            :key="index"
            :label="item.stationName"
            :value="item.id"
          ></el-option>
        </el-select>
        <!-- <el-select
         v-model="searchData.lineId" 
         @change="lineChangeSearch(searchData.lineId)"
         placeholder="请选择线路"
         style="width:100%"
        >
          <el-option
            v-for="(item, index) in lineList"
            :key="index"
            :label="item.lineName"
            :value="item.id"
          ></el-option>
        </el-select> -->
        <!-- <el-select
         v-model="searchData.collectorId" 
         @change="collectorChangeSearch(searchData.collectorId)"
         placeholder="请选择采集器"
         style="width:100%"
        >
          <el-option
            v-for="(item, index) in collectorList"
            :key="index"
            :label="item.collectorName"
            :value="item.id"
          ></el-option>
        </el-select> -->
        <el-button @click="getList()">搜索</el-button>
      </div>
    </div>

    <el-table :data="dataList" border style="margin: 20px auto">
      <el-table-column label="编号" prop="serialNumber"></el-table-column>
      <el-table-column label="厂家" prop="factory"></el-table-column>
      <el-table-column
        label="通信地址"
        prop="communicationAddress"
      ></el-table-column>
      <el-table-column label="所属变电站" prop="stationName"></el-table-column>
      <el-table-column
        label="所属采集器"
        prop="collectorName"
      ></el-table-column>
      <el-table-column label="所属线路" prop="lineName"></el-table-column>
      <el-table-column label="创建时间" prop="createTimeStr"></el-table-column>
      <el-table-column label="更新时间" prop="upTimeStr"></el-table-column>
      <el-table-column label="状态" prop="status">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
          <el-tag type="danger" v-else>已删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        width="200px"
        v-if="csType == 1"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editOne(scope.row)"
            >编辑</el-button
          >
          <!-- <el-button type="danger" size="small" @click="deleteOne(scope.row)" v-if="scope.row.status == 1">删除</el-button>
          <el-button type="danger" size="small" disabled v-else>已删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="total,sizes,prev,pager,next,jumper"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
    ></el-pagination>

    <el-dialog
      :visible.sync="dialogVisible"
      @closed="handleClosed"
      :title="ifAdd ? '新增' : '编辑'"
    >
      <el-form
        ref="ruleform"
        :model="formData"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="编号" prop="serialNumber">
          <el-input
            type="text"
            v-model="formData.serialNumber"
            placeholder="请输入编号"
            maxlength="21"
          ></el-input>
        </el-form-item>
        <el-form-item label="厂家" prop="factory">
          <el-input
            type="text"
            v-model="formData.factory"
            placeholder="请输入厂家"
            maxlength="21"
          ></el-input>
        </el-form-item>
        <el-form-item label="通信地址" prop="communicationAddress">
          <el-input
            type="text"
            v-model="formData.communicationAddress"
            placeholder="请输入通信地址"
            maxlength="51"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属变电站" prop="stationId">
          <el-select
            v-model="formData.stationId"
            :disabled="ifAdd ? false : true"
            @change="subChange(formData.stationId)"
          >
            <el-option
              v-for="(item, index) in subList"
              :key="index"
              :label="item.stationName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属线路" prop="lineId">
          <el-select v-model="formData.lineId">
            <el-option
              v-for="(item, index) in lineList"
              :key="index"
              :label="item.lineName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属采集器" prop="collectorId">
          <el-select v-model="formData.collectorId">
            <el-option
              v-for="(item, index) in collectorList"
              :key="index"
              :label="item.collectorName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleform')" v-if="ifAdd"
            >提交</el-button
          >
          <el-button type="primary" @click="editForm('ruleform')" v-else
            >提交</el-button
          >
          <el-button @click="resetForm('ruleform')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAmmeterList,
  addAmmeter,
  updateAmmeter,
  deleteLineManagement,
  getSubstationManagement,
  getLineManagement,
  getCollectorManagement,
} from "@/api/mode";
import { mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {
      dialogVisible: false,
      ifAdd: true,
      searchData: {
        serialNumber: "",
        factory: "",
        communicationAddress: "",
        stationId: "",
        lineId: "",
        collectorId: "",
        opuser: 0,
      },
      formData: {
        serialNumber: "",
        factory: "",
        communicationAddress: "",
        stationId: "",
        lineId: "",
        collectorId: "",
        opuser: 0,
      },
      rules: {
        serialNumber: [
          { required: true, message: "请输入编号", trigger: "blur" },
          { min: 2, max: 20, message: "长度在2~20个字符", trigger: "blur" },
        ],
        factory: [
          { required: true, message: "请输入厂家", trigger: "blur" },
          { min: 1, max: 20, message: "字符长度为 1~5", trigger: "blur" },
        ],
      },
      dataList: [], // 电表列表
      subList: [], // 变电站列表
      lineList: [], // 线路列表
      collectorList: [], // 采集器列表
      page: 1, // 页数
      rows: 10, // 条数
      total: 0, // 总条数
    };
  },
  computed: {
    ...mapGetters(["userId", "csType"]),
  },
  components: {},
  mounted() {
    this.getList();
    this.getSubList();
  },
  methods: {
    // 获取电表列表
    getList() {
      this.searchData.page = this.page
      this.searchData.rows = this.rows
      getAmmeterList(this.searchData).then((res) => {
        if (res.code === 200) {
          this.dataList = res.extend.listAmmeter;
          this.total = res.extend.count;
        }
      });
    },
    // 获取变电站列表
    getSubList() {
      let data = {
        page: 1,
        rows: 100,
      };
      getSubstationManagement(data).then((res) => {
        if (res.code == 200) {
          this.subList = res.extend.listConvertingStation;
        }
      });
    },
    // 获取线路列表
    getLineList(e) {
      let data = {
        page: 1,
        rows: 100,
        stationId: e,
      };
      getLineManagement(data).then((res) => {
        if (res.code == 200) {
          this.lineList = res.extend.listStationLine;
        }
      });
    },
    // 获取采集器列表
    getCollectorList(e) {
      let data = {
        page: 1,
        rows: 100,
        stationId: e,
      };
      getCollectorManagement(data).then((res) => {
        if (res.code == 200) {
          this.collectorList = res.extend.listStationLine;
        }
      });
    },
    // 变电站改变时,获取线路列表(新增)
    subChange(e) {
      this.getLineList(e);
      this.getCollectorList(e);
    },
    // 变电站改变时,获取线路列表(查询)lineChangeSearch
    subChangeSearch(e) {
      this.getLineList(e);
      this.getCollectorList(e);
      this.getList()
    },
    // 线路改变时,获取电表列表(查询)
    lineChangeSearch(e) {
      this.getList()
    },
    // 采集器改变时,获取电表列表(查询)
    collectorChangeSearch(e) {
      this.getList()
    },
    // 新增
    add() {
      this.dialogVisible = true;
      this.ifAdd = true;
    },
    // 点击编辑
    editOne(e) {
      this.dialogVisible = true;
      this.ifAdd = false;
      this.getLineList(e.stationId);
      this.getCollectorList(e.stationId);
      this.formData.serialNumber = e.serialNumber;
      this.formData.factory = e.factory;
      this.formData.communicationAddress = e.communicationAddress;
      this.formData.stationId = e.stationId;
      this.formData.lineId = e.lineId;
      this.formData.collectorId = e.collectorId;
      this.formData.opuser = e.opuser;
      this.formData.id = e.id;
    },
    // 提交（新增）
    submitForm(formName) {
      let $this = this;
      $this.$refs[formName].validate((valid) => {
        if (valid) {
          $this.opuser = $this.userId;
          addAmmeter($this.formData).then((res) => {
            if (res.code == 200) {
              $this.$message({
                type: "success",
                message: "添加成功",
              });
              $this.getList();
            } else {
              $this.$message({
                type: "danger",
                message: res.message,
              });
            }
            $this.resetForm("ruleform");
            $this.dialogVisible = false;
            $this.ifAdd = true;
          });
        }
      });
    },
    // 提交（编辑）
    editForm(formName) {
      let $this = this;
      $this.$refs[formName].validate((valid) => {
        if (valid) {
          updateAmmeter($this.formData).then((res) => {
            if (res.code == 200) {
              $this.$message({
                type: "success",
                message: "编辑成功",
              });
              $this.getList();
            } else {
              $this.$message({
                type: "danger",
                message: res.message,
              });
            }
            $this.resetForm("ruleform");
            $this.dialogVisible = false;
            $this.ifAdd = true;
          });
        }
      });
    },
    // 删除
    // deleteOne(e){
    //   this.$confirm('是否删除此线路','提示',{
    //     confirmButtonText:'确定',
    //     cancelButtonText:'取消',
    //     type:'warning'
    //   }).then(()=>{
    //     let data = {
    //       id:e.id
    //     }
    //     deleteLineManagement(data).then(res=>{
    //       if(res.code == 200){
    //         this.$message({
    //           type:'success',
    //           message:'删除成功'
    //         })
    //       }
    //     })
    //     this.getList();
    //   }).catch(()=>{
    //     this.$message({
    //       type:'info',
    //       message:res.message
    //     })
    //   })
    // },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.formData.serialNumber = "";
      this.formData.factory = "";
      this.formData.communicationAddress = "";
    },
    // 弹窗关闭
    handleClosed() {
      this.resetForm("ruleform");
      this.ifAdd = true;
      this.formData.stationId = "";
      this.formData.lineId = "";
      this.formData.collectorId = "";
      this.formData.opuser = "";
      this.formData.id = "";
    },
    handleCurrentChange(val) {
      this.page = val;
    },
    handleSizeChange(val) {
      this.rows = val;
    },
  },
  watch: {
    page(res) {
      this.getList();
    },
    rows(res) {
      this.getList();
    },
  },
};
</script>
<style lang='scss' scoped>
.con-head{
    display: flex;
    justify-content: space-between;
    .search{
        display: flex;
        justify-content: space-between;
    }
}
</style>