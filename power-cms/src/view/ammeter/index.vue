<template>
  <div class="container">
    <!-- <p>电表管理</p> -->
    <div class="con-head">
      <ul class="search">
        <li class="w250">
          <el-input
            placeholder="请输入编号"
            v-model="searchData.serialNumber"
            @keyup.enter.native="getList"
          ></el-input>
        </li>
        <li class="w250">
          <el-input
            placeholder="请输入厂家"
            v-model="searchData.factory"
            @keyup.enter.native="getList"
          ></el-input>
        </li>
        <li class="w250">
          <el-select
            v-model="searchData.stationId"
            @change="subChangeSearch(searchData.stationId)"
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
      <div>
        <el-button
          v-if="csType == 1"
          type="primary"
          round
          @click="add()"
          icon="el-icon-plus"
          >新增</el-button
        >
        <el-button round @click="getAmmeterDataReport" icon="el-icon-download"
          >抄表</el-button
        >
        <el-button @click="getExcel()" round icon="el-icon-download"
          >导出表格</el-button
        >
      </div>
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
        min-width="300px"
        align="center"
        v-if="csType == 1"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editOne(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="warning"
            size="small"
            @click="statusAmmeter(scope.row)"
            >实时状况</el-button
          >
          <el-button type="danger" size="small" @click="deleteClick(scope.row)"
            >删除</el-button
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
      width="80%"
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
        <el-form-item label="所属线路" prop="lineId">
          <el-select v-model="formData.lineId" placeholder="请选择线路">
            <el-option
              v-for="(item, index) in lineList"
              :key="index"
              :label="item.lineName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属采集器" prop="collectorId">
          <el-select v-model="formData.collectorId" placeholder="请选择采集器">
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

    <el-dialog :visible.sync="dialogVisibleReal" title="实时状况" width="80%" height="90%" @closed="closedReal">
      <div class="ammeterReal">
        <ul class="ammeterLeft">
          <li>
            <span>正向有功总电量</span>
            <span>{{ statusAmmeterList.ammeterDataDay.zxygzdl }}</span>
          </li>
          <li>
            <span>反向有功总电量</span>
            <span>{{ statusAmmeterList.ammeterDataDay.fxygzdl }}</span>
          </li>
          <li>
            <span>正向无功总电量</span>
            <span>{{ statusAmmeterList.ammeterDataDay.zxwgzdl }}</span>
          </li>
          <li>
            <span>反向无功总电量</span>
            <span>{{ statusAmmeterList.ammeterDataDay.fxwgzdl }}</span>
          </li>
          <li>
            <span>正向有功峰总电量</span>
            <span>{{ statusAmmeterList.ammeterDataDay.zxygfzdl }}</span>
          </li>
          <li>
            <span>正向有功平总电量</span>
            <span>{{ statusAmmeterList.ammeterDataDay.zxygpzdl }}</span>
          </li>
          <li>
            <span>正向有功谷总电量</span>
            <span>{{ statusAmmeterList.ammeterDataDay.zxyggzdl }}</span>
          </li>
          <li>
            <span>反向有功峰总电量</span>
            <span>{{ statusAmmeterList.ammeterDataDay.fxygfzdl }}</span>
          </li>
          <li>
            <span>反向有功平总电量</span>
            <span>{{ statusAmmeterList.ammeterDataDay.fxygpzdl }}</span>
          </li>
          <li>
            <span>反向有功谷总电量</span>
            <span>{{ statusAmmeterList.ammeterDataDay.fxyggzdl }}</span>
          </li>
          <!-- <li>
            电表id-----
            {{statusAmmeterList.ammeterDataDay.ammeterId}}
          </li> -->
          <li>
            <span>序列号</span>
            <span>{{ statusAmmeterList.ammeterDataDay.seriaNumber }}</span>
          </li>
          <li>
            <span>正向有功尖峰总电度</span>
            <span>{{ statusAmmeterList.ammeterDataDay.zxygjfdl }}</span>
          </li>
          <li>
            <span>反向有功尖峰总电度</span>
            <span>{{ statusAmmeterList.ammeterDataDay.fxygjfdl }}</span>
          </li>
          <li>
            <span>变电站名称</span>
            <span>{{ statusAmmeterList.ammeterDataDay.stationName }}</span>
          </li>
          <li>
            <span>线路名称</span>
            <span>{{ statusAmmeterList.ammeterDataDay.lineName }}</span>
          </li>
          <li>
            <span>采集时间</span>
            <span>{{
              statusAmmeterList.ammeterDataDay.collectionTimeStr
            }}</span>
          </li>
        </ul>
        <ul class="ammeterRight">
          <li id="ammeterE1"></li>
          <li id="ammeterE2"></li>
          <li id="ammeterE3"></li>
          <li id="ammeterE4"></li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAmmeterList,
  addAmmeter,
  updateAmmeter,
  deleteAmmeter,
  statusAmmeter,
  getSubstationManagement,
  getLineManagement,
  getCollectorManagement,
  getAmmeterDataReport,
} from "@/api/mode";
import { mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {
      dialogVisible: false,
      dialogVisibleReal: false,
      ifAdd: true,
      searchData: {
        serialNumber: "",
        factory: "",
        stationId: "",
        upTimeStart:"",
        upTimeEnd:""
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
      statusAmmeterList: {
        ammeterDataDay: {},
        echartData:{}
      }, // 电表实时列表
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
    // 变电站改变时,获取线路列表(查询)
    // subChangeSearch(e) {
    //   this.getLineList(e);
    //   this.getCollectorList(e);
    //   this.getList();
    // },
    // 获取点表实时状态
    statusAmmeter(e) {
      this.dialogVisibleReal = true;
      let data = {
        id: e.id,
      };
      statusAmmeter(data).then((res) => {
        if (res.code == 200 && res.extend.ammeterDataDay != null) {
          this.statusAmmeterList.ammeterDataDay = res.extend.ammeterDataDay;
          this.statusAmmeterList.echartData.datax = res.extend.echartData.datax;
          this.statusAmmeterList.echartData.dataYfxygssz = res.extend.echartData.dataYfxygssz;
          this.statusAmmeterList.echartData.dataYfxygxl = res.extend.echartData.dataYfxygxl;
          this.statusAmmeterList.echartData.dataYla = res.extend.echartData.dataYla;
          this.statusAmmeterList.echartData.dataYlb = res.extend.echartData.dataYlb;
          this.statusAmmeterList.echartData.dataYlc = res.extend.echartData.dataYlc;
          this.statusAmmeterList.echartData.dataYua = res.extend.echartData.dataYua;
          this.statusAmmeterList.echartData.dataYub = res.extend.echartData.dataYub;
          this.statusAmmeterList.echartData.dataYuc = res.extend.echartData.dataYuc;
          this.statusAmmeterList.echartData.dataYzxygssz = res.extend.echartData.dataYzxygssz;
          this.statusAmmeterList.echartData.dataYzxygxl = res.extend.echartData.dataYzxygxl;
          this.ammeterE1();
          this.ammeterE2();
          this.ammeterE3();
          this.ammeterE4();
        }else{
          this.statusAmmeterList.ammeterDataDay = '';
          this.statusAmmeterList.echartData.datax = [];
          this.statusAmmeterList.echartData.dataYfxygssz = [];
          this.statusAmmeterList.echartData.dataYfxygxl = [];
          this.statusAmmeterList.echartData.dataYla = [];
          this.statusAmmeterList.echartData.dataYlb = [];
          this.statusAmmeterList.echartData.dataYlc = [];
          this.statusAmmeterList.echartData.dataYua = [];
          this.statusAmmeterList.echartData.dataYub = [];
          this.statusAmmeterList.echartData.dataYuc = [];
          this.statusAmmeterList.echartData.dataYzxygssz = [];
          this.statusAmmeterList.echartData.dataYzxygxl = [];
        }
      });
    },
    // 实时状态关闭后
    closedReal(){
      this.dialogVisibleReal = false;
    },
    // 实时状态图表1
    ammeterE1() {
      let $this = this;
      let option = {
        title: {
          text: "正/反向有功瞬时值",
          left: "0",
          top: "2%",
          textStyle: {
            fontSize: (16 * $this.screenHeight) / 1080,
            color: "#999999",
          },
        },
        // 提示框组件
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(64,64,64,.9)",
        },
        grid: {
          top: "12%",
          left: "15%",
          width: "80%",
          height: "75%",
        },
        legend:{
          data:['正向有功瞬时值','反向有功瞬时值'],
          top:'2%',
          right:'5%'
        },
        color: ["#CC6600", "#CD5C5C", "#DAA520"],
        xAxis: [{
          type: "category",
          boundaryGap: false,
          data: $this.statusAmmeterList.echartData.datax,
          // 坐标轴刻度标签的相关设置
            axisLabel: {
              color: "#555555",
              fontSize: (12 * $this.screenHeight) / 1080
            },
            // 坐标轴轴线的相关设置
            axisLine: {
              lineStyle: {
                color: "#999999",
                width: (1 * $this.screenHeight) / 1080
              }
            },
            // 坐标轴刻度相关设置
            axisTick: {
              show: false
            }
        }],
        yAxis: [
          {
            type: "value",
            // 坐标轴刻度标签的相关设置
            axisLabel: {
              color: "#555555",
              fontSize: (12 * $this.screenHeight) / 1080,
              formatter: function(value, index) {
                if (value >= 10000 || value <= -10000) {
                  return value / 10000 + "万";
                }
                return value;
              },
              // margin: 20,
            },
            // 坐标轴轴线的相关设置
            axisLine: {
              show: false,
            },
            // 坐标轴在grid区域中的分隔线
            splitLine: {
              lineStyle: {
                color: "#999999",
              },
            },
          },
        ],
        series: [
          {
            name: "正向有功瞬时值",
            data: $this.statusAmmeterList.echartData.dataYzxygssz,
            type: "line",
            symbol: "none",
            smooth: true,
            areaStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "#CC6600" },
                  { offset: 1, color: "#CC6666" },
                ],
              },
            },
          },
          {
            name: "反向有功瞬时值",
            data: $this.statusAmmeterList.echartData.dataYfxygssz,
            type: "line",
            symbol: "none",
            smooth: true,
            areaStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "#CD5C5C" },
                  { offset: 1, color: "#F08080" },
                ],
              },
            },
          },
        ],
      };
      let chart = $this.$echarts.init(document.getElementById("ammeterE1"));
      chart.clear();
      chart.resize();
      chart.setOption(option);
    },
        // 实时状态图表4
    ammeterE2() {
      let $this = this;
      let option = {
        title: {
          text: "正/反向有功需量",
          left: "0",
          top: "2%",
          textStyle: {
            fontSize: (16 * $this.screenHeight) / 1080,
            color: "#999999",
          },
        },
        color: ["#CC6600", "#CD5C5C", "#DAA520"],
        // 提示框组件
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(64,64,64,.9)",
        },
        grid: {
          top: "12%",
          left: "15%",
          width: "80%",
          height: "75%",
        },
        legend:{
          data:['正向有功需量','反向有功需量'],
          top:'2%',
          right:'5%'
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: $this.statusAmmeterList.echartData.datax,
          // 坐标轴刻度标签的相关设置
            axisLabel: {
              color: "#555555",
              fontSize: (12 * $this.screenHeight) / 1080
            },
            // 坐标轴轴线的相关设置
            axisLine: {
              lineStyle: {
                color: "#999999",
                width: (1 * $this.screenHeight) / 1080
              }
            },
            // 坐标轴刻度相关设置
            axisTick: {
              show: false
            }
        },
        yAxis: [
          {
            type: "value",
            // 坐标轴刻度标签的相关设置
            axisLabel: {
              color: "#555555",
              fontSize: (12 * $this.screenHeight) / 1080,
              formatter: function(value, index) {
                if (value >= 10000 || value <= -10000) {
                  return value / 10000 + "万";
                }
                return value;
              },
              // margin: 20,
            },
            // 坐标轴轴线的相关设置
            axisLine: {
              show: false,
            },
            // 坐标轴在grid区域中的分隔线
            splitLine: {
              lineStyle: {
                color: "#999999",
              },
            },
          },
        ],
        series: [
          {
            name:'正向有功需量',
            data: $this.statusAmmeterList.echartData.dataYzxygxl,
            type: "line",
            symbol: "none",
            smooth: true,
            areaStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "#CC6600" },
                  { offset: 1, color: "#CC6666" },
                ],
              },
            },
          },
          {
            name:'反向有功需量',
            data: $this.statusAmmeterList.echartData.dataYfxygxl,
            type: "line",
            symbol: "none",
            smooth: true,
            areaStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "#CD5C5C" },
                  { offset: 1, color: "#F08080" },
                ],
              },
            },
          },
        ],
      };
      let chart = $this.$echarts.init(document.getElementById("ammeterE2"));
      chart.clear();
      chart.resize();
      chart.setOption(option);
    },
    // 实时状态图表3
    ammeterE3() {
      let $this = this;
      let option = {
        title: {
          text: "瞬时电流",
          left: "0",
          top: "2%",
          textStyle: {
            fontSize: (16 * $this.screenHeight) / 1080,
            color: "#999999",
          },
        },
        color: ["#CC6600", "#CD5C5C", "#DAA520"],
        // 提示框组件
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(64,64,64,.9)",
        },
        grid: {
          top: "12%",
          left: "15%",
          width: "80%",
          height: "75%",
        },
        legend:{
          data:['a相瞬时电流','b相瞬时电流','c相瞬时电流'],
          top:'2%',
          right:'5%'
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: $this.statusAmmeterList.echartData.datax,
          // 坐标轴刻度标签的相关设置
            axisLabel: {
              color: "#555555",
              fontSize: (12 * $this.screenHeight) / 1080
            },
            // 坐标轴轴线的相关设置
            axisLine: {
              lineStyle: {
                color: "#999999",
                width: (1 * $this.screenHeight) / 1080
              }
            },
            // 坐标轴刻度相关设置
            axisTick: {
              show: false
            }
        },
        yAxis: [
          {
            type: "value",
            // 坐标轴刻度标签的相关设置
            axisLabel: {
              color: "#555555",
              fontSize: (12 * $this.screenHeight) / 1080,
              formatter: function(value, index) {
                if (value >= 10000 || value <= -10000) {
                  return value / 10000 + "万";
                }
                return value;
              },
              // margin: 20,
            },
            // 坐标轴轴线的相关设置
            axisLine: {
              show: false,
            },
            // 坐标轴在grid区域中的分隔线
            splitLine: {
              lineStyle: {
                color: "#999999",
              },
            },
          },
        ],
        series: [
          {
            name:'a相瞬时电流',
            data: $this.statusAmmeterList.echartData.dataYla,
            type: "line",
            symbol: "none",
            smooth: true,
            areaStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "#CC6600" },
                  { offset: 1, color: "#CC6666" },
                ],
              },
            },
          },
          {
            name:'b相瞬时电流',
            data: $this.statusAmmeterList.echartData.dataYlb,
            type: "line",
            symbol: "none",
            smooth: true,
            areaStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                 { offset: 0, color: "#CD5C5C" },
                  { offset: 1, color: "#F08080" },
                ],
              },
            },
          },
          {
            name:'c相瞬时电流',
            data: $this.statusAmmeterList.echartData.dataYlc,
            type: "line",
            symbol: "none",
            smooth: true,
            areaStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                 { offset: 0, color: "#DAA520" },
                  { offset: 1, color: "#DEB887" },
                ],
              },
            },
          },
        ],
      };
      let chart = $this.$echarts.init(document.getElementById("ammeterE3"));
      chart.clear();
      chart.resize();
      chart.setOption(option);
    },
    // 实时状态图表4
    ammeterE4() {
      let $this = this;
      let option = {
        title: {
          text: "瞬时电压",
          left: "0",
          top: "2%",
          textStyle: {
            fontSize: (16 * $this.screenHeight) / 1080,
            color: "#999999",
          },
        },
        color: ["#CC6600", "#CD5C5C", "#DAA520"],
        // 提示框组件
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(64,64,64,.9)",
        },
        grid: {
          top: "12%",
          left: "15%",
          width: "80%",
          height: "75%",
        },
        legend:{
          data:['a相瞬时电压','b相瞬时电压','c相瞬时电压'],
          top:'2%',
          right:'5%'
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: $this.statusAmmeterList.echartData.datax,
          // 坐标轴刻度标签的相关设置
            axisLabel: {
              color: "#555555",
              fontSize: (12 * $this.screenHeight) / 1080
            },
            // 坐标轴轴线的相关设置
            axisLine: {
              lineStyle: {
                color: "#999999",
                width: (1 * $this.screenHeight) / 1080
              }
            },
            // 坐标轴刻度相关设置
            axisTick: {
              show: false
            }
        },
        yAxis: [
          {
            type: "value",
            // 坐标轴刻度标签的相关设置
            axisLabel: {
              color: "#555555",
              fontSize: (12 * $this.screenHeight) / 1080,
              formatter: function(value, index) {
                if (value >= 10000 || value <= -10000) {
                  return value / 10000 + "万";
                }
                return value;
              },
              // margin: 20,
            },
            // 坐标轴轴线的相关设置
            axisLine: {
              show: false,
            },
            // 坐标轴在grid区域中的分隔线
            splitLine: {
              lineStyle: {
                color: "#999999",
              },
            },
          },
        ],
        series: [
          {
            name:'a相瞬时电压',
            data: $this.statusAmmeterList.echartData.dataYua,
            type: "line",
            symbol: "none",
            smooth: true,
            areaStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                   { offset: 0, color: "#CC6600" },
                  { offset: 1, color: "#CC6666" },
                ],
              },
            },
          },
          {
            name:'b相瞬时电压',
            data: $this.statusAmmeterList.echartData.dataYub,
            type: "line",
            symbol: "none",
            smooth: true,
            areaStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                 { offset: 0, color: "#CD5C5C" },
                  { offset: 1, color: "#F08080" },
                ],
              },
            },
          },
          {
            name:'c相瞬时电压',
            data: $this.statusAmmeterList.echartData.dataYuc,
            type: "line",
            symbol: "none",
            smooth: true,
            areaStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "#DAA520" },
                  { offset: 1, color: "#DEB887" },
                ],
              },
            },
          },
        ],
      };
      let chart = $this.$echarts.init(document.getElementById("ammeterE4"));
      chart.clear();
      chart.resize();
      chart.setOption(option);
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
          deleteAmmeter(data).then((res) => {
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
    handleCurrentChange(val) {
      this.page = val;
    },
    handleSizeChange(val) {
      this.rows = val;
    },
    // 抄表
    getAmmeterDataReport() {
      getAmmeterDataReport().then((res) => {
        if (res.code == 200 && res.extend.adr.length > 0) {
          this.getReportExcel(res.extend.adr);
        } else {
          this.$message({
            type: "danger",
            message: "抄表失败",
          });
        }
      });
    },
    getReportExcel(adr) {
      import("@/vendor/Export2Excel").then((excel) => {
        const header = [
          "变电站名称",
          "线路名称",
          "正向有功总电量上月",
          "正向有功总电量本月",
          "正向有功总电量抄表电量",
          "反向有功总电量上月",
          "反向有功总电量本月",
          "反向有功总电量抄表电量",
          "正向无功总电量上月",
          "正向无功总电量本月",
          "正向无功总电量抄表电量",
          "反向无功总电量上月",
          "反向无功总电量本月",
          "反向无功总电量抄表电量",
          "正向有功峰总电量上月",
          "正向有功峰总电量本月",
          "正向有功峰总电量抄表电量",
          "正向有功平总电量上月",
          "正向有功平总电量本月",
          "正向有功平总电量抄表电量",
          "正向有功谷总电量上月",
          "正向有功谷总电量本月",
          "正向有功谷总电量抄表电量",
          "反向有功峰总电量上月",
          "反向有功峰总电量本月",
          "反向有功峰总电量抄表电量",
          "反向有功平总电量上月",
          "反向有功平总电量本月",
          "反向有功平总电量抄表电量",
          "反向有功谷总电量上月",
          "反向有功谷总电量本月",
          "反向有功谷总电量抄表电量",
          "正向有功尖峰总电度上月",
          "正向有功尖峰总电度本月",
          "正向有功尖峰总电度抄表电量",
          "反向有功尖峰总电度上月",
          "反向有功尖峰总电度本月",
          "反向有功尖峰总电度抄表电量",
          "统计类型",
          "统计时间",
          "电表id",
          "变电站id",
          "线路id",
        ];
        const filterVal = [
          "stationName",
          "lineName",
          "zxygzdlLast",
          "zxygzdlCurrent",
          "zxygzdlCbdl",
          "fxygzdlLast",
          "fxygzdlCurrent",
          "fxygzdlCbdl",
          "zxwgzdlLast",
          "zxwgzdlCurrent",
          "zxwgzdlCbdl",
          "fxwgzdlLast",
          "fxwgzdlCurrent",
          "fxwgzdlCbdl",
          "zxygfzdlLast",
          "zxygfzdlCurrent",
          "zxygfzdlCbdl",
          "zxygpzdlLast",
          "zxygpzdlCurrent",
          "zxygpzdlCbdl",
          "zxyggzdlLast",
          "zxyggzdlCurrent",
          "zxyggzdlCbdl",
          "fxygfzdlLast",
          "fxygfzdlCurrent",
          "fxygfzdlCbdl",
          "fxygpzdlLast",
          "fxygpzdlCurrent",
          "fxygpzdlCbdl",
          "fxyggzdlLast",
          "fxyggzdlCurrent",
          "fxyggzdlCbdl",
          "zxygjfdlLast",
          "zxygjfdlCurrent",
          "zxygjfdlCbdl",
          "fxygjfdlLast",
          "fxygjfdlCurrent",
          "fxygjfdlCbdl",
          "statisticalType",
          "statisticalTime",
          "ammeterId",
          "stationId",
          "lineId",
        ];
        const list = adr;
        const data = this.formatJson(filterVal, list);
        const filename = "抄表表格";

        excel.export_json_to_excel({
          header,
          data,
          filename,
        });
      });
    },
    // 导出表格
    getExcel() {
      let excelList = [];
      this.searchData.isExport = 1;
      this.searchData.page = 1;
      this.searchData.rows = "";
      getAmmeterList(this.searchData).then((res) => {
        if (res.code === 200) {
          excelList = res.extend.listAmmeter;
          import("@/vendor/Export2Excel").then((excel) => {
            const header = [
              "编号",
              "厂家",
              "通信地址",
              "所属变电站",
              "所属采集器",
              "所属线路",
              "状态",
              "创建时间",
              "更新时间",
            ];
            const filterVal = [
              "serialNumber",
              "factory",
              "communicationAddress",
              "stationName",
              "collectorName",
              "lineName",
              "status",
              "createTimeStr",
              "upTimeStr",
            ];
            const list = excelList;
            const data = this.formatJson(filterVal, list);
            const filename = "电表管理表格";

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
    screenWidth(res){
      if(this.dialogVisibleReal){
        this.ammeterE1();
        this.ammeterE2();
        this.ammeterE3();
        this.ammeterE4();
      }
      
    },
    screenHeight(res){
      if(this.dialogVisibleReal){
        this.ammeterE1();
        this.ammeterE2();
        this.ammeterE3();
        this.ammeterE4();
      }
    }
  },
};
</script>
<style lang='scss' scoped>
// .el-dialog__wrapper{
//   .el-dialog {
//     .el-dialog__body {
//       height: 70vh !important;
//     }
//   }
// }

</style>