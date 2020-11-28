<template>
  <div class="container">
    <!-- <p>变电站管理</p> -->
    <div class="con-head">
      <ul class="search">
        <li class="w250">
          <el-input
            v-model="searchData.stationName"
            placeholder="请输入变电站名称"
            @keyup.enter.native="getList()"
          ></el-input>
        </li>
        <li class="w250">
          <el-input
            v-model="searchData.stationFzr"
            placeholder="请输入负责人"
            @keyup.enter.native="getList()"
          ></el-input>
        </li>
        <li class="w250">
          <el-input
            v-model="searchData.stationFzrdh"
            placeholder="请输入负责人电话"
            @keyup.enter.native="getList()"
            class="w250"
          ></el-input>
        </li>
        <li class="w250">
          <el-date-picker
            v-model="searchData.upTimeStart"
            placeholder="请选择开始时间"
            type="date"
            class="w250"
          ></el-date-picker>
        </li>
        <li class="w250">
          <el-date-picker
            v-model="searchData.upTimeEnd"
            placeholder="请选择结束时间"
            type="date"
            class="w250"
          ></el-date-picker>
        </li>
        <li>
          <el-button
            @click="getList()"
            class="search-btn"
            type="success"
            icon="el-icon-search"
            >搜索</el-button
          >
        </li>
      </ul>

      <div>
        <el-button
          v-if="csType == 1"
          type="primary"
          round
          @click="add()"
          icon="el-icon-plus"
          >新增</el-button
        >
        <el-button @click="getExcel()" round icon="el-icon-download"
          >导出表格</el-button
        >
      </div>
    </div>

    <el-table :data="dataList" border style="margin: 20px auto">
      <el-table-column
        prop="stationName"
        label="变电站名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="stationAddress"
        label="变电站地址"
      ></el-table-column>
      <el-table-column
        prop="stationFzr"
        label="负责人"
        width="90px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="stationFzrdh"
        label="负责人电话"
        width="130px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="level"
        label="等级"
        align="center"
      ></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" type="success">正常</el-tag>
          <el-tag v-else type="danger">已删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTimeStr"
        label="创建时间"
        width="200px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="upTimeStr"
        label="更新时间"
        width="200px"
        align="center"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="200px" align="center">
        <template slot-scope="scope" v-if="csType == 1">
          <el-button type="primary" size="small" @click="editClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="deleteClick(scope.row)"
            v-if="scope.row.status == 1"
            >删除</el-button
          >
          <el-button type="danger" size="small" disabled v-else
            >已删除</el-button
          >
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
      :title="ifAdd ? '新增' : '编辑'"
      @closed="handleClosed"
    >
      <el-form
        :model="formData"
        label-width="100px"
        ref="ruleform"
        :rules="rules"
      >
        <el-form-item label="变电站名称" prop="stationName">
          <el-input
            type="text"
            v-model="formData.stationName"
            maxlength="21"
            placeholder="请输入变电站名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="变电站地址" prop="stationAddress">
          <el-input
            type="text"
            v-model="formData.stationAddress"
            maxlength="101"
            placeholder="请输入变电站地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="stationFzr">
          <el-input
            type="text"
            v-model="formData.stationFzr"
            maxlength="11"
            placeholder="请输入负责人"
          ></el-input>
        </el-form-item>
        <el-form-item label="负责人电话" prop="stationFzrdh">
          <el-input
            v-model="formData.stationFzrdh"
            maxlength="16"
            placeholder="请输入负责人电话"
          ></el-input>
        </el-form-item>
        <el-form-item label="等级" prop="level">
          <el-input
            v-model="formData.level"
            maxlength="6"
            placeholder="请输入等级"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label=1>正常</el-radio>
            <el-radio :label=0>删除</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item>
          <el-button v-if="ifAdd" type="primary" @click="submitForm('ruleform')"
            >提交</el-button
          >
          <el-button v-else type="primary" @click="editForm('ruleform')"
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
  getSubstationManagement,
  addSubstationManagement,
  updateSubstationManagement,
  deleteSubstationManagement,
} from "@/api/mode";
import { mapGetters } from "vuex";
import qs from "qs";
export default {
  name: "",
  data() {
    return {
      dialogVisible: false,
      ifAdd: true,
      formData: {
        id: "", // 变电站id
        stationName: "", //变电站名称
        stationAddress: "", //变电站地址
        stationFzr: "", //负责人
        stationFzrdh: "", //负责人电话
        level: "", //所属等级
        opuser: 0, //操作人id
      },
      rules: {
        stationName: [
          { required: true, message: "请输入变电站名称", trigger: "blur" },
          { min: 2, max: 20, message: "长度在2~20个字符", trigger: "blur" },
        ],
        stationAddress: [
          { required: true, message: "请输入变电站地址", trigger: "blur" },
          { min: 5, max: 100, message: "长度在5~100个字符", trigger: "blur" },
        ],
        stationFzr: [
          { required: true, message: "请输入负责人", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2~10个字符", trigger: "blur" },
        ],
        stationFzrdh: [
          { required: true, message: "请输入负责人电话", trigger: "blur" },
          {
            min: 8,
            max: 15,
            message: "请输入正确的电话，长度在8~15个字符",
            trigger: "blur",
          },
        ],
        // level:[
        //   {required:true,message:'请输入所属等级',trigger:'blur'},
        //   {min:1,max:5,message:'长度在1~5个字符',trigger:'blur'}
        // ]
      },
      searchData: {
        stationName: "", //变电站名称
        stationAddress: "", //变电站地址
        stationFzr: "", //负责人
        stationFzrdh: "", //负责人电话
        level: "", //所属等级
        upTimeStart: "",
        upTimeEnd: "",
      },
      dataList: [], //列表数据
      total: 0, // 信息总条数
      page: 1, // 页数
      rows: 10, // 每页几条
    };
  },
  computed: {
    ...mapGetters(["userId", "csType"]),
  },
  components: {},
  mounted() {
    this.getList();
  },
  methods: {
    // 获取列表数据
    getList() {
      this.searchData.page = this.page;
      this.searchData.rows = this.rows;
      getSubstationManagement(this.searchData).then((res) => {
        if (res.code == 200) {
          this.dataList = res.extend.listConvertingStation;
          this.total = res.extend.count;
        }
      });
    },
    // 新增
    add() {
      this.ifAdd = true;
      this.dialogVisible = true;
    },
    // 提交（新增）
    submitForm(formName) {
      let $this = this;
      $this.$refs[formName].validate((valid) => {
        if (valid) {
          $this.formData.opuser = $this.userId;
          addSubstationManagement($this.formData).then((res) => {
            if (res.code === 200) {
              $this.$message({
                type: "success",
                message: res.message,
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 提交（编辑）
    editForm(formName) {
      let $this = this;
      $this.$refs[formName].validate((valid) => {
        if (valid) {
          updateSubstationManagement($this.formData).then((res) => {
            if (res.code === 200) {
              $this.$message({
                type: "success",
                message: res.message,
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.formData.stationName = "";
      this.formData.stationAddress = "";
      this.formData.stationFzr = "";
      this.formData.stationFzrdh = "";
      this.formData.level = "";
    },
    // 关闭弹窗
    handleClosed() {
      this.resetForm("ruleform");
      this.ifAdd = true;
    },
    // 编辑
    editClick(e) {
      this.ifAdd = false;
      this.dialogVisible = true;
      console.log(e);
      this.formData.stationName = e.stationName;
      this.formData.stationAddress = e.stationAddress;
      this.formData.stationFzr = e.stationFzr;
      this.formData.stationFzrdh = e.stationFzrdh;
      this.formData.level = e.level;
      this.formData.id = e.id;
    },
    // 删除
    deleteClick(e) {
      this.$confirm("确定删除此变电站信息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = {
            id: e.id,
          };
          deleteSubstationManagement(data).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "删除成功",
              });
            } else {
              this.$message({
                type: "wraning",
                message: "删除失败",
              });
            }
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 分页
    handleCurrentChange(val) {
      this.page = val;
    },
    handleSizeChange(val) {
      this.rows = val;
    },
    // 导出表格
    getExcel() {
      import("@/vendor/Export2Excel").then((excel) => {
        const header = [
          "变电站名称",
          "变电站地址",
          "负责人",
          "负责人电话",
          "等级",
          "状态",
          "创建时间",
          "更新时间",
        ];
        const filterVal = [
          "stationName",
          "stationAddress",
          "stationFzr",
          "stationFzrdh",
          "level",
          "status",
          "createTimeStr",
          "upTimeStr",
        ];
        const list = this.dataList;
        const data = this.formatJson(filterVal, list);
        const filename = "变电站管理表格";

        excel.export_json_to_excel({
          header,
          data,
          filename,
        });
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
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

</style>