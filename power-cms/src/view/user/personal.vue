<template>
  <div>
    <!-- <p>个人中心</p> -->
    <div class="" style="width:500px">
        <el-form ref="ruleform" :rules="rules" :model="formData" label-width="80px">
        <el-form-item label="姓名" prop="csName">
          <el-input
            type="text"
            v-model="formData.csName"
            maxlength="11"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录账号" prop="csLoginName">
          <el-input
            type="text"
            v-model="formData.csLoginName"
            maxlength="11"
            placeholder="请输入账号"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="csPhone">
          <el-input
            v-model="formData.csPhone"
            maxlength="16"
            placeholder="请输入负责人电话"
          ></el-input>
        </el-form-item>
        <el-form-item label="旧密码" prop="csLoginPwdOld">
          <el-input
            show-password
            v-model="formData.csLoginPwdOld"
            maxlength="21"
            placeholder="请输入旧密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="csLoginPwd">
          <el-input
            show-password
            v-model="formData.csLoginPwd"
            maxlength="21"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleform')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { GetUserInfo } from "@/api/login";
import { updatePersonal } from "@/api/mode";
import { mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {
      formData: {
          csLoginName:'',
          csName:'',
          csPhone:'',
          csLoginPwd:'',
          csLoginPwdOld:''
      },
       rules: {
        csLoginName: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2~10个字符", trigger: "blur" },
        ],
        csName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2~10个字符", trigger: "blur" },
        ],
        csLoginPwdOld: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "请输入正确的密码，长度在6~20个字符",
            trigger: "blur",
          },
        ],
        csLoginPwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "请输入正确的密码，长度在6~20个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["userId"]),
  },
  components: {},
  mounted() {
    this.getUserInfo();
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      let $this = this;
      let data = { csId: this.userId };
      GetUserInfo(data).then((res) => {
        if (res.code == 200) {
          $this.formData.csLoginName = res.data.csLoginName;
          $this.formData.csName = res.data.csName;
        //   $this.formData.csLoginPwd = res.data.csLoginPwd;
          $this.formData.csPhone = res.data.csPhone;
        }
      });
    },
    // 提交
    submitForm(formName) {
      let $this = this;
      $this.$refs[formName].validate((valid) => {
        if (valid) {
          $this.formData.csId = $this.userId;
          updatePersonal($this.formData).then((res) => {
            if (res.code === 200) {
              $this.$message({
                type: "success",
                message: res.message,
              });
              $this.getUserInfo();
            } else {
              $this.$message({
                type: "danger",
                message: res.message,
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  watch: {},
};
</script>
<style lang='' scoped>
</style>