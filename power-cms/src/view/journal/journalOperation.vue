<template>
  <div class="container">
    <!-- <p>操作日志</p> -->
    <div class="con-head">
      <ul class="search">
        <li class="w250">
          <el-select
            v-model="searchData.opType"
            @change="getList()"
            class="w250"
            placeholder="请选择操作类型"
            clearable
          >
            <el-option
              v-for="item in opTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
        prop="opType"
        label="操作类型"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.opType == 1" type="success">参数</el-tag>
          <el-tag v-if="scope.row.opType == 2" type="success">变电站</el-tag>
          <el-tag v-if="scope.row.opType == 3" type="success">电表</el-tag>
          <el-tag v-if="scope.row.opType == 4" type="success">采集器</el-tag>
          <el-tag v-if="scope.row.opType == 5" type="success">时间同步</el-tag>
          <el-tag v-if="scope.row.opType == 6" type="success">系统账号</el-tag>
        </template>
      </el-table-column>
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
import { getLogOperationList } from "@/api/mode";
import { mapGetters } from "vuex";
import qs from "qs";
export default {
  name: "",
  data() {
    return {
      opTypeList: [
        { label: "参数", value: 1 },
        { label: "变电站", value: 2 },
        { label: "电表", value: 3 },
        { label: "采集器", value: 4 },
        { label: "时间同步", value: 5 },
        { label: "系统账号", value: 6 },
      ],
      searchData: {
        opType: "",
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
      getLogOperationList(this.searchData).then((res) => {
        if (res.code == 200) {
          this.dataList = res.extend.listLogOperation;
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
      this.searchData.rows = "";
      getLogOperationList(this.searchData).then((res) => {
        if (res.code == 200) {
          excelList = res.extend.listLogOperation;
          import("@/vendor/Export2Excel").then((excel) => {
            const header = ["操作内容", "操作类型", "更新时间"];
            const filterVal = ["content", "loginIp", "upTimeStr"];
            const list = excelList;
            const data = this.formatJson(filterVal, list);
            const filename = "操作日志表格";

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