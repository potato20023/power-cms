<template>
  <div class="cpntainer param">
    <div class="params">
      <!-- <h3>设置抄表日期</h3> -->
      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item label="抄表日期1">
          <el-input-number
            v-model="formData.readingMeterDate1"
            :min="1"
            :max="29"
            @change="handleChange1"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="抄表日期2">
          <el-input-number
            v-model="formData.readingMeterDate2"
            :min="num1"
            :max="30"
            @change="handleChange2"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="抄表日期3">
          <el-input-number
            v-model="formData.readingMeterDate3"
            :min="num2"
            :max="31"
          ></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { updateSystemParam } from "@/api/mode";
import { mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {
      num1: 2,
      num2: 30,
      formData: {
        readingMeterDate1: "",
        readingMeterDate2: "",
        readingMeterDate3: "",
      },
    };
  },
  computed: {
    ...mapGetters(["userId"]),
  },
  components: {},
  mounted() {},
  methods: {
    handleChange1(value) {
      this.num1 = value + 1;
    },
    handleChange2(value) {
      this.num2 = value + 1;
    },
    onSubmit() {
      let $this = this;
      $this.formData.id = $this.userId;
      updateSystemParam($this.formData).then((res) => {
        if (res.code == 200) {
          $this.$message({
            type: "success",
            message: "设置成功",
          });
        } else {
          $this.$message({
            type: "danger",
            message: res.message,
          });
        }
      });
    },
  },
  watch: {},
};
</script>
<style lang='scss' scoped>
.params {
  width: 400px;
}
</style>