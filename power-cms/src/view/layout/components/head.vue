<template>
  <div class="head">
      <!-- <div class="title">电能集中远程管控平台</div> -->
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
            <el-dropdown-item @click.native="changePassword">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
  </div>
</template>

<script>
import {LoginOut,changePasword} from '@/api/login'
import {getToken,removeToken} from '@/utils/auth'
import {mapGetters} from 'vuex'
  export default {
    name:'',
    data () {
      return {
        password:''
      };
    },
    computed:{
      ...mapGetters(['userName','avatar','userId'])
    },
    components: {},
    mounted() {},
    methods: {
      // 点击 修改密码
      changePassword(){
        let $this = this
        $this.$prompt('请输入新密码','密码修改',{
          confirmButtonText:'确定',
          cancelButtonText:'放弃修改',
          inputValidator:(value)=>{
            if(value && value.length >=2 && value.length <= 20){
              return true
            }else{
              return false
            }
          },
          inputErrorMessage:'请输入2-20位字符作为密码'
        }).then(({value})=>{
          $this.submitPwd(value);
          // $this.loginOut();
          // $this.$message({
          //   type:'success',
          //   message:'修改成功'
          // })
        }).catch(()=>{
          $this.$message({
            type:'info',
            message:'放弃修改'
          })
        })
      },
      // 提交 修改密码
      submitPwd(value){
        console.log(value)
        let data = {
          csId:this.userId,
          csLoginPwd:value
        }
        changePasword(data).then(res=>{
          console.log(res)
        })
        
      },
      // 退出
      loginOut(){
        LoginOut(getToken()).then(res=>{
          if(res.code == 200){
            removeToken();
            this.$router.push('/')
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