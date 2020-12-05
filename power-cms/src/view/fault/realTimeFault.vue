<template>
  <div class="container">
    <!-- <p>故障列表</p> -->
    <div class="con-head">
      <ul class="search">
        <li class="w250">
          <el-select
            v-model="searchData.stationId"
            @change="getList()"
            placeholder="请选择变电站"
            clearable
            class="w250"
          >
            <el-option
              v-for="item in listConvertingStation"
              :key="item.id"
              :label="item.stationName"
              :value="item.id"
            ></el-option>
          </el-select>
        </li>
        <li class="w250">
          <el-select
            v-model="searchData.faultTypeId"
            @change="getList()"
            placeholder="请选择故障类型"
            clearable
            class="w250"
          >
            <el-option
              v-for="item in listFaultType"
              :key="item.id"
              :label="item.faultType"
              :value="item.id"
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
        prop="serialNumber"
        label="电表编号"
        align="center"
        min-width="100px"
      ></el-table-column>
      <el-table-column
        prop="stationName"
        label="变电站名称"
        align="center"
        min-width="150px"
      ></el-table-column>
      <el-table-column
        prop="lineName"
        label="线路名称"
        align="center"
        min-width="150px"
      ></el-table-column>
      <el-table-column
        prop="collectorName"
        label="采集器名称"
        align="center"
        min-width="150px"
      ></el-table-column>
      <el-table-column
        prop="faultType"
        label="故障类型"
        align="center"
        min-width="100px"
      >
        <template slot-scope="scope">
          <el-tag type="danger">{{ scope.row.faultType }}</el-tag>
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
import { getFaultList } from "@/api/mode";
import { mapGetters } from "vuex";
import qs from "qs";
export default {
  name: "",
  data() {
    return {
      listConvertingStation: [], //变电站选择
      listFaultType: [], // 故障类型选择
      searchData: {
        stationId: "",
        faultTypeId: "",
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
      getFaultList(this.searchData).then((res) => {
        if (res.code == 200) {
          this.dataList = res.extend.listFault;
          this.total = res.extend.count;
          this.listConvertingStation = res.extend.listConvertingStation;
          this.listFaultType = res.extend.listFaultType;
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
      getFaultList(this.searchData).then((res) => {
        if (res.code == 200) {
          excelList = res.extend.listFault;
          import("@/vendor/Export2Excel").then((excel) => {
            const header = [
              "电表编号",
              "变电站名称",
              "线路名称",
              "采集器名称",
              "故障类型",
              "创建时间",
              "更新时间",
            ];
            const filterVal = [
              "serialNumber",
              "stationName",
              "lineName",
              "collectorName",
              "faultType",
              "createTimeStr",
              "upTimeStr",
            ];
            const list = excelList;
            const data = this.formatJson(filterVal, list);
            const filename = "故障列表表格";

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