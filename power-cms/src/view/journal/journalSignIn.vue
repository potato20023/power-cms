<template>
  <div class="container">
    <!-- <p>登录日志</p> -->
    <div class="con-head">
      <ul class="search">
        <li class="w250">
          <el-input
            v-model="searchData.csName"
            placeholder="请输入操作人姓名"
            @keyup.enter.native="getList()"
          ></el-input>
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
        <el-button @click="getExcel()" round icon="el-icon-download"
          >导出表格</el-button
        >
      </div>
    </div>

    <el-table :data="dataList" border style="margin: 20px auto">
      <el-table-column
        prop="content"
        label="操作内容"
        align="center"
        min-width="150px"
      ></el-table-column>
      <el-table-column
        prop="csName"
        label="操作人姓名"
        align="center"
        min-width="150px"
      ></el-table-column>
      <el-table-column
        prop="loginIp"
        label="登录ip"
        min-width="150px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="upTimeStr"
        label="更新时间"
        min-width="200px"
        align="center"
      ></el-table-column>
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
  </div>
</template>

<script>
import { getLogList } from "@/api/mode";
import { mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {
      searchData: {
        content: "",
        csName: "",
        loginIp: "",
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
      this.searchData.isExport = 0;
      this.searchData.page = this.page;
      this.searchData.rows = this.rows;
      getLogList(this.searchData).then((res) => {
        if (res.code == 200) {
          this.dataList = res.extend.listLogLogin;
          this.total = res.extend.count;
        }
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
      getLogList(this.searchData).then((res) => {
        if (res.code == 200) {
          excelList = res.extend.listLogLogin;
          import("@/vendor/Export2Excel").then((excel) => {
            const header = ["操作内容", "操作人姓名", "登录ip", "更新时间"];
            const filterVal = ["content", "csName", "loginIp", "upTimeStr"];
            const list = excelList;
            const data = this.formatJson(filterVal, list);
            const filename = "登录日志表格";

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