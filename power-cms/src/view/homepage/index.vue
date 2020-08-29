<template>
  <div class="homepage-container">
    <ul class="home-top">
      <li v-for="(item,index) in numList" :key="index" class="numItem">
        <p>{{item.title}}</p>
        <!-- <div> -->
        <img src="@/assets/image/01-1.png" alt />
        <span>{{item.num}}</span>
        <!-- </div> -->
      </li>
    </ul>

    <!-- 表格 -->
    <div class="home-table">
      <el-table
        ref="multipleTable"
        :data="userList"
        tooltip-effect="dark"
        style="width:100%"
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
        <el-table-column label="地址" prop="address"></el-table-column>
        <el-table-column label="来源" prop="from"></el-table-column>
        <el-table-column label="销售人员" prop="salesman"></el-table-column>
        <el-table-column label="入库时间" prop="createTime"></el-table-column>
        <el-table-column label="状态" prop="state">
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
        <el-table-column label="跟踪" prop="track">
          <template slot-scope="scope">
            <span>{{scope.row.track}}天</span>
          </template>
        </el-table-column>
        <el-table-column label="难易度" prop="degree">
          <template slot-scope="scope">
            <i class="el-icon-star-on" v-for="i in 5" :key="i" :style="{color:i <= scope.row.degree?'#f2c304' : '#cbc9ca'}"></i>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" class="scope-i">
            <i class="el-icon-edit" @click="handleClick(scope.row)"></i>
            <i class="el-icon-delete" @click="handleDelete(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getSumList, getUserList } from "@/api/mode";
export default {
  name: "",
  data() {
    return {
      numList: [],
      userList: []
    };
  },
  components: {},
  mounted() {
    this.getSumLists();
    this.getUserLists();
  },
  methods: {
    // 获取客户工单分配列表
    getSumLists() {
      getSumList().then(res => {
        if (res.code == 200) {
          this.numList = res.data.list;
        }
      });
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
    handleSelectionChange(val) {
      console.log(val);
    },
    // 编辑
    handleClick(e) {
      console.log(e);
    },
    // 删除
    handleDelete(e) {
      console.log(e);
    }
  },
  watch: {}
};
</script>
<style lang='scss' scoped>
.homepage-container {
  // padding: 5px 20px 5px 5px;
  width: 100%;
  .home-top {
    width: 100%;
    min-width: 1600px;
    height: 130px;
    display: flex;
    justify-content: space-around;
    .numItem {
      width: 300px;
      height: 130px;
      background-color: #eef1f6;
      padding: 10px 20px;
      p {
        font-size: 14px;
        line-height: 40px;
        color: #8faac5;
      }
      img {
        width: 50px;
        height: 50px;
      }
      span {
        font-size: 30px;
        color: #3e505e;
        position: relative;
        top: -13px;
        left: 10px;
        z-index: 10;
      }
    }
  }
  .home-table {
    width: 100%;
    height:100%;
    min-width: 1600px;
    padding: 50px;
    .el-icon-edit {
      font-size: 22px;
      margin: 0 10px;
      cursor: pointer;
      color: #347ab8;
    }
    .el-icon-delete {
      font-size: 22px;
      margin: 0 10px;
      cursor: pointer;
      color: red;
    }
    .el-icon-star-on{
      font-size: 20px;
    }
  }
}
</style>