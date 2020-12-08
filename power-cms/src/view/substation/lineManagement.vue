<template>
  <div class="container">
    <!-- <p>线路管理</p> -->
    <div class="con-head">
      <ul class="search">
        <li class="w250">
          <el-input
            v-model="searchData.lineName"
            placeholder="请输入线路名称"
            @keyup.enter.native="getList()"
          ></el-input>
        </li>
        <li class="w250">
          <el-select
            v-model="searchData.stationId"
            @change="getList()"
            class="w250"
            placeholder="请选择变电站"
            clearable
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
          <el-input
            v-model="searchData.lineLevel"
            placeholder="请输入线路等级"
            @keyup.enter.native="getList()"
            class="w250"
          ></el-input>
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
        label="线路名称"
        prop="lineName"
        align="center"
        min-width="150px"
      ></el-table-column>
      <el-table-column
        label="线路等级"
        prop="lineLevel"
        align="center"
        min-width="100px"
      ></el-table-column>
      <el-table-column
        label="隶属变电站"
        prop="stationName"
        align="center"
        min-width="150px"
      ></el-table-column>
      <el-table-column
        label="状态"
        prop="status"
        align="center"
        min-width="100px"
      >
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
          <el-tag type="danger" v-else>已删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="createTimeStr"
        align="center"
        min-width="200px"
      ></el-table-column>
      <el-table-column
        label="更新时间"
        prop="upTimeStr"
        align="center"
        min-width="200px"
      ></el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        min-width="150px"
      >
        <template slot-scope="scope">
          <el-button
            v-if="csType == 1"
            type="primary"
            size="small"
            @click="editOne(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="deleteOne(scope.row)"
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
      @closed="handleClosed"
      :title="ifAdd ? '新增' : '编辑'"
    >
      <el-form
        ref="lineRuleform"
        :model="formData"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="线路名称" prop="lineName">
          <el-input
            type="text"
            v-model="formData.lineName"
            placeholder="请输入线路名称"
            maxlength="21"
          ></el-input>
        </el-form-item>
        <el-form-item label="线路等级" prop="lineLevel">
          <el-input
            type="text"
            v-model="formData.lineLevel"
            placeholder="请输入线路等级"
            maxlength="5"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属变电站" prop="stationId">
          <el-select
            v-model="formData.stationId"
            :disabled="ifAdd ? false : true"
            placeholder="请选择变电站"
          >
            <el-option
              v-for="(item, index) in subList"
              :key="index"
              :label="item.stationName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('lineRuleform')"
            v-if="ifAdd"
            >提交</el-button
          >
          <el-button type="primary" @click="editForm('lineRuleform')" v-else
            >提交</el-button
          >
          <el-button @click="resetForm('lineRuleform')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getLineManagement,
  addLineManagement,
  updateLineManagement,
  deleteLineManagement,
  getSubstationManagement,
} from "@/api/mode";
import { mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {
      dialogVisible: false,
      ifAdd: true,
      formData: {
        lineName: "",
        lineLevel: "",
        stationId: "",
        status: 1,
        opuser: 0,
      },
      rules: {
        lineName: [
          { required: true, message: "请输入线路名称", trigger: "blur" },
          { min: 2, max: 20, message: "长度在2~20个字符", trigger: "blur" },
        ],
        // lineLevel:[
        //   {required:true,message:'请输入线路等级',trigger:'blur'},
        //   {min:1,max:5,message:'字符长度为 1~5',trigger:'blur'}
        // ],
        stationId: [
          { required: true, message: "请选择变电站", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      searchData: {
        lineName: "",
        lineLevel: "",
        stationId: "",
      },
      dataList: [], // 线路列表
      subList: [], // 变电站列表
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
    // 获取线路列表
    getList() {
      this.searchData.isExport = 0;
      this.searchData.page = this.page;
      this.searchData.rows = this.rows;
      getLineManagement(this.searchData).then((res) => {
        if (res.code === 200) {
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
      this.dialogVisible = true;
      this.ifAdd = true;
    },
    // 点击编辑
    editOne(e) {
      this.dialogVisible = true;
      this.ifAdd = false;
      this.formData.lineName = e.lineName;
      this.formData.lineLevel = e.lineLevel;
      this.formData.stationId = e.stationId;
      this.formData.status = e.status;
      this.formData.opuser = e.opuser;
      this.formData.id = e.id;
    },
    // 提交（新增）
    submitForm(formName) {
      let $this = this;
      $this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log($this.formData);
          addLineManagement($this.formData).then((res) => {
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
            $this.resetForm("lineRuleform");
            $this.dialogVisible = false;
            $this.ifAdd = true;
          });
        }
      });
    },
    // 提交（编辑）
    editForm(formName) {
      let $this = this;
      console.log($this.formData);
      $this.$refs[formName].validate((valid) => {
        if (valid) {
          updateLineManagement($this.formData).then((res) => {
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
            $this.resetForm("lineRuleform");
            $this.dialogVisible = false;
            $this.ifAdd = true;
          });
        }
      });
    },
    // 删除
    deleteOne(e) {
      this.$confirm("是否删除此线路", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = {
            id: e.id,
          };
          deleteLineManagement(data).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功",
              });
            }
          });
          this.getList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: res.message,
          });
        });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.formData.lineName = "";
      this.formData.lineLevel = "";
      this.formData.status = 1;
    },
    // 弹窗关闭
    handleClosed() {
      this.resetForm("lineRuleform");
      this.ifAdd = true;
      this.formData.stationId = "";
      this.formData.opuser = "";
      this.formData.id = "";
    },
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
      getLineManagement(this.searchData).then((res) => {
        if (res.code === 200) {
          excelList = res.extend.listStationLine;
          import("@/vendor/Export2Excel").then((excel) => {
            const header = [
              "线路名称",
              "线路等级",
              "隶属变电站",
              "负责人电话",
              "状态",
              "创建时间",
              "更新时间",
            ];
            const filterVal = [
              "lineName",
              "lineLevel",
              "stationName",
              "stationFzrdh",
              "status",
              "createTimeStr",
              "upTimeStr",
            ];
            const list = excelList;
            const data = this.formatJson(filterVal, list);
            const filename = "线路管理表格";

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