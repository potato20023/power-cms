<template>
  <div class="userAdd">
    <p>新增用户</p>
    <div class="userForm">
      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item label="客户名称">
          <el-input v-model="formData.userName"></el-input>
        </el-form-item>
        <el-form-item label="所属行业">
          <el-select v-model="formData.job" placeholder="请选择所属行业">
            <el-option></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户区域"></el-form-item>
        <el-form-item label="客户详情"></el-form-item>
        <el-form-item label="联系人"></el-form-item>
        <el-form-item label="联系方式"></el-form-item>
        <el-form-item label="会员等级"></el-form-item>
        <el-form-item label="客户来源"></el-form-item>
        <el-form-item label="客户状态"></el-form-item>
        <el-form-item label="身份证号码"></el-form-item>
        <el-form-item label="生日"></el-form-item>
        <el-form-item label="兴趣爱好"></el-form-item>
        <el-form-item label="资产状况"></el-form-item>
        <el-form-item label="难易度"></el-form-item>
        <el-form-item label="图片"></el-form-item>
        <el-form-item label="提供人电话"></el-form-item>
        <el-form-item label="备注"></el-form-item>
        <el-form-item>
          <el-button type="primary">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

  export default {
    name:'userAdd',
    data () {
      return {
        formData:{
          userName:'',

        },
        job:[
          {}
        ]
      };
    },
    components: {},
    mounted() {},
    methods: {},
    watch: {}
  }

</script>
<style lang='scss' scoped>
  .userAdd{
    width:100%;
    p{
      display: block;
      height:50px;
      font-size: 18px;
      line-height: 50px;
      padding-left:20px;
      border-bottom: 1px solid #e6e6e6;
    }
    .userForm{
      width:500px;
      height:100%;
      // border:1px solid red;
      margin: 30px auto;
    }
  }
</style>