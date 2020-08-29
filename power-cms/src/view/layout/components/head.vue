<template>
  <div class="head">
      <div class="title">电能集中远程管控平台</div>
      <div class="user">
        <img v-if="avatar" :src="avatar" alt="">
        <img v-else src="../../../assets/image/avatar.jpg" alt="">
        <el-dropdown trigger="click">
          
          <span class="el-dropdown-link">
            {{userName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
  </div>
</template>

<script>
import {LoginOut} from '@/api/login'
import {getToken,removeToken} from '@/utils/auth'
import {mapGetters} from 'vuex'
  export default {
    name:'',
    data () {
      return {

      };
    },
    computed:{
      ...mapGetters(['userName','avatar'])
    },
    components: {},
    mounted() {},
    methods: {
      loginOut(){
        LoginOut(getToken()).then(res=>{
          if(res.code == 200){
            removeToken();
            this.$router.push('/login')
            location.reload();  // 刷新页面，避免出现bug
          }
        })
      }
    },
    watch: {}
  }

</script>
<style lang='scss' scoped>
  .head{
    width:100%;
    height:50px;
    color:#fff;
    // background: url(../../../assets/image/science-blue-header.jpg) 0 0 no-repeat;
    background-image: linear-gradient(45deg,#1278f6,#00b4aa 50%, #1278f6);
    .title{
      float:left;
      height:50px;
      font-size: 24px;
      line-height: 50px;
      padding-left:20px;
    }
    .user{
      float:right;
      height:50px;
      line-height: 50px;
      padding-right: 30px;
      img{
        width:30px;
        height:30px;
        border-radius: 50%;
        margin: 10px;
        float: left;
      }
      .el-dropdown-link{
        cursor: pointer;
        color:#fff;
        font-size: 14px;
      }
    }
  }
</style>