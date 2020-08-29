<template>
  <div class="user-container">
    <div v-if="ifList" class="user-top">
      <div class="title">账号管理</div>
      <div>
        <el-button type="primary" round size="medium">新增</el-button>
      </div>
      
      <!-- <ul class="operation">
        <li @click="add">
          <i class="el-icon-plus"></i>
          添加
        </li>
        <li @click="deleteAll">
          <i class="el-icon-delete"></i>
          删除
        </li>
        <li @click="getExcel(userList)">
          <i class="el-icon-s-promotion"></i>
          导出
        </li>
        <li @click="outExe">导出模板</li>
      </ul> -->
    </div>

    

    <!-- 表格 -->
    <!-- <div v-if="ifList" class="user-table">
      <el-table
        ref="multipleTable"
        :data="userList"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="客户编号" prop="userNum"></el-table-column>
        <el-table-column label="客户名字" prop="userName">
          <template slot-scope="scope">
            <span style="color:#347ab8">{{scope.row.userName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="行业" prop="job"></el-table-column>
        <el-table-column label="地址" prop="address" width="240"></el-table-column>
        <el-table-column label="来源" prop="from"></el-table-column>
        <el-table-column label="销售人员" prop="salesman"></el-table-column>
        <el-table-column label="入库时间" prop="createTime"></el-table-column>
        <el-table-column label="状态" prop="state" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.state == 1">
              <i
                style="width:8px;height:8px;border-radius:50%;margin-right:5px;display:inline-block;background-color:#f59370"
              ></i>
              <span>待分配</span>
            </div>
            <div v-if="scope.row.state == 2">
              <i
                style="width:8px;height:8px;border-radius:50%;margin-right:5px;display:inline-block;background-color:#9b58b5"
              ></i>
              <span>抢单中</span>
            </div>
            <div v-if="scope.row.state == 3">
              <i
                style="width:8px;height:8px;border-radius:50%;margin-right:5px;display:inline-block;background-color:#5c9bd1"
              ></i>
              <span>跟踪中</span>
            </div>
            <div v-if="scope.row.state == 4">
              <i
                style="width:8px;height:8px;border-radius:50%;margin-right:5px;display:inline-block;background-color:#52ce9a"
              ></i>
              <span>已成交</span>
            </div>
            <div v-if="scope.row.state == 5">
              <i
                style="width:8px;height:8px;border-radius:50%;margin-right:5px;display:inline-block;background-color:#95a0b2"
              ></i>
              <span>留存</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="跟踪" prop="track" width="60">
          <template slot-scope="scope">
            <span>{{scope.row.track}}天</span>
          </template>
        </el-table-column>
        <el-table-column label="难易度" prop="degree">
          <template slot-scope="scope">
            <i
              class="el-icon-star-on"
              v-for="i in 5"
              :key="i"
              :style="{color:i <= scope.row.degree?'#f2c304' : '#cbc9ca'}"
            ></i>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed='right'>
          <template slot-scope="scope" class="scope-i">
            <i class="el-icon-edit" @click="handleClick(scope.row)"></i>
            <i class="el-icon-delete" @click="handleDelete(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
    </div> -->

    <!-- 新增或编辑 -->
    <!-- <userAdd v-if="!ifList"></userAdd> -->

    <el-table
      :data='userList'
      border
      style='width:100%'
    >
      <el-table-column prop="userNum" label="用户编号" width="120"></el-table-column>
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="identityNum" label="用户身份">
        <template slot-scope='scope'>
          <span v-if="scope.row.identityNum == 1">超级管理员</span>
          <span v-if="scope.row.identityNum == 2">变电站管理员</span>
          <span v-if="scope.row.identityNum == 3">普通员工</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column width="200" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleClick(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      layout="total,sizes,prev, pager, next,jumper"
      :total="400"
      @size-change='handleSizeChange'
      @current-change='handleCurrentChange'
      :current-page='currentPage' 
      :page-sizes='[10,20,30,40]'
      :page-size="100"
      class="pagination"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getUserList } from "@/api/mode";
// import userAdd from "@/view/permission/userAdd";
export default {
  name: "",
  data() {
    return {
      numList: [],
      userList: [],
      fileListUpload: [],
      tableData2: [],
      currentPage:1,//分页-当前页
    };
  },
  computed: {
    ...mapGetters(["breadList", "ifList"])
  },
  components: {
    // userAdd
  },
  mounted() {
    this.getUserLists();
  },
  methods: {
    // 导出模板
    outExe() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/vendor/Export2Excel"); //引入文件
        const tHeader = [
          "客户编号",
          "客户名字",
          "电话",
          "行业",
          "地址",
          "来源",
          "销售人员",
          "入库时间",
          "状态",
          "跟踪",
          "难易度"
        ]; //将对应的属性名转换成中文
        const data = [];
        export_json_to_excel(tHeader, data, "模板");
      });
    },
    // 导出表格
    getExcel(res) {
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/vendor/Export2Excel.js");
        const tHeader = [
          "客户编号",
          "客户名字",
          "电话",
          "行业",
          "地址",
          "来源",
          "销售人员",
          "入库时间",
          "状态",
          "跟踪",
          "难易度"
        ];
        const filterVal = [
          "userNum",
          "userName",
          "phone",
          "job",
          "address",
          "from",
          "salesman",
          "createTime",
          "state",
          "track",
          "degree"
        ];
        const list = res;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "导出列表名称");
      });
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },

    

    // 获取用户信息列表
    getUserLists() {
      let data = {
        offset: 1,
        limit: 10
      };
      getUserList(data).then(res => {
        if (res.code == 200) {
          this.userList = res.data.list;
        }
      });
    },
    // 选择复选框
    handleSelectionChange(val) {
      console.log(val);
    },
    // 添加
    add() {
      let list = this.breadList;
      list.push({ path: "", name: "增加" });
      this.$store.commit("SET_BREAD_LIST", list);
      this.$store.commit("SET_IF_LIST", false);
      // this.$router.push('/permission/userAdd')
    },
    // 使用复选框删除
    deleteAll() {},
    // 编辑
    handleClick(e) {
      console.log(e);
    },
    // 删除
    handleDelete(e) {
      console.log(e);
    },
    // 分页
    handleSizeChange(val){
      console.log(`每条${val}条`)
    },
    // 分页
    handleCurrentChange(val){
      console.log(`当前页`)
    }
  },
  watch: {}
};
</script>
<style lang='scss' scoped>
.user-container {
  width: 100%;
  .user-top {
    width: 100%;
    padding-bottom: 20px;
    .title {
      font-size: 20px;
      line-height: 50px;
    }
    .operation {
      display: flex;
      justify-content: space-between;
      li {
        padding: 0 10px;
        border-radius: 15px;
        height: 30px;
        font-size: 14px;
        line-height: 30px;
        border: 1px solid #acb3c3;
        color: #acb3c3;
        cursor: pointer;
        margin: 10px 5px;
      }
    }
  }
  .pagination{
    margin-top:30px;
  }
}
</style>