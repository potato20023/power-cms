<template>
  <div class="container">
    <!-- <h3>用户管理</h3> -->
    <div class="con-head">
      <ul class="search">
        <li class="w250">
          <el-input
            v-model="searchData.csName"
            placeholder="请输入用户名"
            @keyup.enter.native="getList()"
          ></el-input>
        </li>
        <li class="w250">
          <el-input
            v-model="searchData.csPhone"
            placeholder="请输入电话"
            @keyup.enter.native="getList()"
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
        <el-button round @click="getExcel()" icon="el-icon-download"
          >导出表格</el-button
        >
      </div>
    </div>

    <el-table :data="dataList" border style="margin: 20px auto">
      <el-table-column
        prop="csLoginName"
        label="登录账号"
        align="center"
        min-width="150px"
      ></el-table-column>
      <el-table-column
        prop="csName"
        label="姓名"
        align="center"
        min-width="130px"
      ></el-table-column>
      <el-table-column
        prop="csPhone"
        label="电话"
        align="center"
        min-width="130px"
      ></el-table-column>
      <el-table-column
        prop="csType"
        label="用户身份"
        align="center"
        min-width="150px"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.csType == 1" type="success"
            >超级管理员</el-tag
          >
          <el-tag v-else type="primary">普通用户</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        align="center"
        min-width="100px"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" type="success">正常</el-tag>
          <el-tag v-if="scope.row.status == 2" type="permary">已冻结</el-tag>
          <el-tag v-if="scope.row.status == 3" type="danger">已删除</el-tag>
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
      <el-table-column
        fixed="right"
        label="操作"
        min-width="230px"
        v-if="csType == 1"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="info"
            size="small"
            @click="deleteClick(scope.row, 2)"
            v-if="scope.row.status == 1"
            >冻结</el-button
          >
          <el-button
            type="warning"
            size="small"
            @click="deleteClick(scope.row, 1)"
            v-if="scope.row.status == 2"
            >激活</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="deleteClick(scope.row, 3)"
            v-if="scope.row.status != 3"
            >删除</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="deleteClick(scope.row)"
            v-else
            disabled
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
        <el-form-item label="姓名" prop="csName">
          <el-input
            type="text"
            v-model="formData.csName"
            maxlength="11"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录账号" prop="csLoginName">
          <el-input
            type="text"
            v-model="formData.csLoginName"
            maxlength="11"
            placeholder="请输入账号"
            :disabled="ifAdd ? false : true"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="csLoginPwd">
          <el-input
            show-password
            v-model="formData.csLoginPwd"
            maxlength="21"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="csPhone">
          <el-input
            v-model="formData.csPhone"
            maxlength="16"
            placeholder="请输入负责人电话"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="csType">
          <el-radio-group v-model="formData.csType">
            <el-radio :label="1">超级管理员</el-radio>
            <el-radio :label="2">普通用户</el-radio>
          </el-radio-group>
        </el-form-item>
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
import { getUserList, addUser, updateUser, deleteUser } from "@/api/mode";
import { mapGetters } from "vuex";
import md5 from "js-md5";
import qs from "qs";
export default {
  name: "",
  data() {
    return {
      dialogVisible: false,
      ifAdd: true,
      formData: {
        // csId:'',    // 用户id
        csLoginName: "", //账号
        csLoginPwd: "", // 密码
        csName: "", //用户名
        csPhone: "", //电话
        csType: 1, //用户身份
        opuser: 0, //操作人id
      },
      rules: {
        csLoginName: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2~10个字符", trigger: "blur" },
        ],
        csName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2~10个字符", trigger: "blur" },
        ],
        csLoginPwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "请输入正确的密码，长度在6~20个字符",
            trigger: "blur",
          },
        ],
        csType: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      searchData: {
        csName: "",
        csPhone: "",
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
      let $this = this;
      this.searchData.isExport = 0;
      $this.searchData.page = $this.page;
      $this.searchData.rows = $this.rows;
      getUserList($this.searchData).then((res) => {
        if (res.code == 200) {
          $this.dataList = res.extend.listSystemUser;
          $this.total = res.extend.count;
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
          addUser($this.formData).then((res) => {
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
          updateUser($this.formData).then((res) => {
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
      this.formData.csLoginName = "";
      this.formData.csName = "";
      this.formData.csLoginPwd = "";
      this.formData.csPhone = "";
      this.formData.csType = "";
    },
    // 关闭弹窗
    handleClosed() {
      this.resetForm("ruleform");
      this.ifAdd = true;
      this.formData.csId = "";
      this.formData.opuser = "";
    },
    // 编辑
    editClick(e) {
      this.ifAdd = false;
      this.dialogVisible = true;
      this.formData.csLoginName = e.csLoginName;
      this.formData.csName = e.csName;
      // this.formData.csLoginPwd = e.csLoginPwd
      this.formData.csPhone = e.csPhone;
      this.formData.csType = e.csType;
      this.formData.csId = e.csId;
    },
    // 删除
    deleteClick(e, status) {
      this.$confirm("确定修改状态吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = {
            csId: e.csId,
            status: status,
          };
          deleteUser(data).then((res) => {
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
      this.searchData.rows = '';
      getUserList($this.searchData).then((res) => {
        if (res.code == 200) {
          excelList = res.extend.listSystemUser;
          import("@/vendor/Export2Excel").then((excel) => {
            const header = [
              "登录账号",
              "姓名",
              "电话",
              "用户身份",
              "状态",
              "创建时间",
              "更新时间",
            ];
            const filterVal = [
              "csLoginName",
              "csName",
              "csPhone",
              "csType",
              "status",
              "createTimeStr",
              "upTimeStr",
            ];
            const list = this.dataList;
            const data = this.formatJson(filterVal, list);
            const filename = "账号管理表格";

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