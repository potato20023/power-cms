<!--登录页-->
<template>
  <div class="login">
    <div class="login-main">
      <div class="login-img">
        <img src="@/assets/image/login-label.png" alt="" />
      </div>
      <div class="login-form">
        <p class="title">电能集中远程管控平台</p>
        <el-form ref="loginForm" :model="loginForm" :rules="rule" class="login-elform">
          <el-form-item prop="csLoginName">
            <el-input
              v-model="loginForm.csLoginName"
              maxlength="20"
              placeholder="请输入用户名"
              class="yonghu"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="csLoginPwd">
            <el-input
              v-model="loginForm.csLoginPwd"
              type="password"
              maxlength="20"
              placeholder="请输入密码"
              class="pwd"
              @keyup.enter.native="onLogin"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onLogin('loginForm')"
              :loading="loading"
              class="login-btn"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { toLogin } from "@/api/login";
import { setToken } from "@/utils/auth";
export default {
  data() {
    return {
      loading: false,
      loginForm: {
        csLoginName: "",
        csLoginPwd: "",
        // csLoginName: "admin",
        // csLoginPwd: "admin@rcpmcs",
      },
      checkValue: "",
      show_num: [],
      rule: {
        csLoginName: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { max: 20, message: "账号最长为20位字符", trigger: "blur" },
          { min: 2, message: "账号最短为4位字符", trigger: "blur" },
        ],
        csLoginPwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 20, message: "密码最长为20位字符", trigger: "blur" },
          { min: 4, message: "密码最短为4位字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    // this.draw(this.show_num);
  },
  methods: {
    ...mapActions(["login"]),
    // 登录
    onLogin() {
      let $this = this;
      $this.$refs.loginForm.validate((valid) => {
        if (valid) {
          $this.login($this.loginForm).then((res) => {
            if (res.data) {
              // $this.$router.push(
              //   { path: "/index" },
              //   (onComplete) => {},
              //   (onAbort) => {}
              // );
              $this.$router.push(
                { path: "/user" },
                (onComplete) => {},
                (onAbort) => {}
              );
            }
          });
        }
      });
    },
  },
};
</script>

<style lang='scss' scoped>
</style>