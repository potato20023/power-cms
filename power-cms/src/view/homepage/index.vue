<template>
  <div class="container">
    <h3>首页</h3>
  </div>
</template>

<script>
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
  },
  methods: {
    
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

</style>