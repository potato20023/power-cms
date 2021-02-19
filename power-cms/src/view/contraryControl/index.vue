<template>
  <div class="container">
    <!-- <p>远程反控</p> -->
    <div class="con-head">
      <ul class="search">
        <li class="w250">
          <el-input
            placeholder="请输入编号"
            v-model="searchData.serialNumber"
            @keyup.enter.native="getList()"
          ></el-input>
        </li>
        <li class="w250">
          <el-input
            placeholder="请输入厂家"
            v-model="searchData.factory"
            @keyup.enter.native="getList()"
          ></el-input>
        </li>
        <li class="w250">
          <el-select
            v-model="searchData.stationId"
            @change="getList()"
            placeholder="请选择变电站"
            class="w250"
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
    </div>

    <el-table :data="dataList" border style="margin: 20px auto">
      <el-table-column
        label="编号"
        prop="serialNumber"
        align="center"
        min-width="100px"
      ></el-table-column>
      <el-table-column
        label="厂家"
        prop="factory"
        align="center"
        min-width="150px"
      ></el-table-column>
      <el-table-column
        label="通信地址"
        prop="communicationAddress"
        align="center"
        min-width="200px"
      ></el-table-column>
      <el-table-column
        label="所属变电站"
        prop="stationName"
        align="center"
        min-width="150px"
      ></el-table-column>
      <el-table-column
        label="所属采集器"
        prop="collectorName"
        align="center"
        min-width="150px"
      ></el-table-column>
      <el-table-column
        label="所属线路"
        prop="lineName"
        align="center"
        min-width="150px"
      ></el-table-column>
      <el-table-column
        label="状态"
        prop="status"
        align="center"
        min-width="110px"
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
        min-width="150px"
        align="center"
        v-if="csType == 1"
      >
        <template slot-scope="scope">
          <!-- <el-button type="primary" size="small" @click="synTime(scope.row)"
            >时间同步</el-button
          > -->
          <el-button type="danger" size="small" @click="xlql(scope.row)"
            >需量清零</el-button
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

  
  </div>
</template>

<script>
import {
  getAmmeterList,
  getSubstationManagement,
  ammeterSynTime,
  ammeterXlql
} from "@/api/mode";
import { mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {
      subList:[],
      dataList: [], // 电表列表
      searchData: {
        serialNumber: "",
        factory: "",
        stationId: "",
        upTimeStart:"",
        upTimeEnd:""
      },
      page: 1, // 页数
      rows: 10, // 条数
      total: 0, // 总条数
    };
  },
  computed: {
    ...mapGetters(["userId", "csType","screenWidth","screenHeight"]),
  },
  components: {},
  mounted() {
    this.getList();
    this.getSubList();
  },
  methods: {
    // 获取电表列表
    getList() {
      this.searchData.isExport = 0;
      this.searchData.page = this.page;
      this.searchData.rows = this.rows;
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
    // 时间同步
    synTime(e) {
      this.$confirm("确定进行时间同步吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = {
            id: e.id,
          };
          ammeterSynTime(data).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "同步成功",
              });
            } else {
              this.$message({
                type: "wraning",
                message: "同步失败",
              });
            }
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消同步",
          });
        });
    },
    // 需量清零
    xlql(e) {
      this.$confirm("确定需量清零吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = {
            id: e.id,
          };
          ammeterXlql(data).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "清零成功",
              });
            } else {
              this.$message({
                type: "wraning",
                message: "清零失败",
              });
            }
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消清零",
          });
        });
    },
    handleCurrentChange(val) {
      this.page = val;
    },
    handleSizeChange(val) {
      this.rows = val;
    }
  },
  watch: {
    page(res) {
      this.getList();
    },
    rows(res) {
      this.getList();
    }
  },
};
</script>
<style lang='scss' scoped>
</style>