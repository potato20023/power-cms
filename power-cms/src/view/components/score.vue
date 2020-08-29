<template>
  <div class="score">
    <i v-for="i in 5" :key="i" class="el-icon-star-on" :style="{color:i < val ? '#f2c304' : '#cbc9ca'}"></i>
  </div>
</template>

<script>

  export default {
    name:'',
    data () {
      return {
          val:3
      };
    },
    components: {},
    mounted() {},
    methods: {},
    watch: {}
  }

</script>
<style lang='scss' scoped>
    .score{
        border:1px solid red;
        width:110px;
        height:30px;
        font-size: 20px;
    }
</style>