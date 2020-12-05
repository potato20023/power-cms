<template>
  <div class="container">
    <!-- <p>采集器管理</p> -->
    <div class="con-head">
      <ul class="search">
        <li class="w250">
          <el-input
            v-model="searchData.seriaNumber"
            placeholder="请输入序列号"
            @keyup.enter.native="getList()"
          ></el-input>
        </li>
        <li class="w250">
          <el-input
            v-model="searchData.collectorName"
            placeholder="请输入采集器名称"
            @keyup.enter.native="getList()"
          ></el-input>
        </li>
        <li class="w250">
          <el-select
            v-model="searchData.stationId"
            @change="getList()"
            class="w250"
          >
            <el-option
              v-for="(item, index) in subList"
              :key="index"
              :label="item.stationName"
              :value="item.id"
            ></el-option>
          </el-select>
        </li>
        <li class="w250">
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
        prop="seriaNumber"
        label="序列号"
        align="center"
        min-width="100px"
      ></el-table-column>
      <el-table-column
        prop="collectorName"
        label="采集器名称"
        align="center"
        min-width="150px"
      ></el-table-column>
      <el-table-column
        prop="stationName"
        label="所属变电站"
        align="center"
        min-width="150px"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        align="center"
        min-width="100px"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" type="success">正常</el-tag>
          <el-tag v-else type="danger">已删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTimeStr"
        label="创建时间"
        align="center"
        min-width="200px"
      ></el-table-column>
      <el-table-column
        prop="upTimeStr"
        label="更新时间"
        align="center"
        min-width="200px"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="200px">
        <template slot-scope="scope">
          <el-button
            v-if="csType == 1"
            type="primary"
            size="small"
            @click="editClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="deleteClick(scope.row)"
            v-if="scope.row.status == 1 && csType == 1"
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
        <el-form-item label="采集器名称" prop="collectorName">
          <el-input
            type="text"
            v-model="formData.collectorName"
            maxlength="21"
            placeholder="请输入采集器名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="序列号" prop="seriaNumber">
          <el-input
            type="text"
            v-model="formData.seriaNumber"
            maxlength="11"
            placeholder="请输入序列号"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属变电站" prop="stationId">
          <el-select
            v-model="formData.stationId"
            :disabled="ifAdd ? false : true"
          >
            <el-option
              v-for="(item, index) in subList"
              :key="index"
              :label="item.stationName"
              :value="item.id"
            ></el-option>
          </el-select>
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
  getCollectorManagement,
  addCollectorManagement,
  updateCollectorManagement,
  deleteCollectorManagement,
  getSubstationManagement,
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
        collectorName: "", //采集器名称
        seriaNumber: "", // 序列号
        stationId: "", // 隶属变电站
        opuser: 0, //操作人id
      },
      rules: {
        collectorName: [
          { required: true, message: "请输入采集器名称", trigger: "blur" },
          { min: 2, max: 20, message: "长度在2~20个字符", trigger: "blur" },
        ],
        seriaNumber: [
          { required: true, message: "请输入序列号", trigger: "blur" },
          { min: 1, max: 10, message: "长度在1~10个字符", trigger: "blur" },
        ],
        stationId: [
          { required: true, message: "请选择变电站", trigger: "blur" },
        ],
        // status:[
        //   {required:true,message:'请选择状态',trigger:'blur'}
        // ]
      },
      searchData: {
        collectorName: "", //采集器名称
        seriaNumber: "", // 序列号
        stationId: "", // 隶属变电站
      },
      dataList: [], //列表数据
      subList: [], // 变电站列表
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
    this.getSubList();
  },
  methods: {
    // 获取列表数据
    getList() {
      this.searchData.isExport = 0;
      this.searchData.page = this.page;
      this.searchData.rows = this.rows;
      getCollectorManagement(this.searchData).then((res) => {
        if (res.code == 200) {
          this.dataList = res.extend.listStationLine;
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
          addCollectorManagement($this.formData).then((res) => {
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
          updateCollectorManagement($this.formData).then((res) => {
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
      this.formData.collectorName = "";
      this.formData.seriaNumber = "";
    },
    // 关闭弹窗
    handleClosed() {
      this.resetForm("ruleform");
      this.ifAdd = true;
      this.formData.stationId = "";
      this.formData.opuser = "";
      this.formData.id = "";
    },
    // 编辑
    editClick(e) {
      this.ifAdd = false;
      this.dialogVisible = true;

      this.formData.collectorName = e.collectorName;
      this.formData.seriaNumber = e.seriaNumber;
      this.formData.stationId = e.stationId;
      this.formData.opuser = e.opuser;
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
          deleteCollectorManagement(data).then((res) => {
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
      let excelList = [];
      this.searchData.isExport = 1;
      this.searchData.page = 1;
      this.searchData.rows = "";
      getCollectorManagement(this.searchData).then((res) => {
        if (res.code == 200) {
          excelList = res.extend.listStationLine;
          import("@/vendor/Export2Excel").then((excel) => {
            const header = [
              "序列号",
              "采集器名称",
              "所属变电站",
              "状态",
              "创建时间",
              "更新时间",
            ];
            const filterVal = [
              "seriaNumber",
              "collectorName",
              "stationName",
              "status",
              "createTimeStr",
              "upTimeStr",
            ];
            const list = excelList;
            const data = this.formatJson(filterVal, list);
            const filename = "采集器管理表格";

            excel.export_json_to_excel({
              header,
              data,
              filename,
            });
          });
        }
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