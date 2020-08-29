<template>
  <div class="app-wrapper">
    <navbar class="navbar"></navbar>
    <div class="app-container">
      <sidebar class="sidebar"></sidebar>
      <Main class="app-m"></Main>
    </div>
  </div>
</template>

<script>
import navbar from '@/view/layout/components/head'
import sidebar from '@/view/layout/components/sidebar'
import Main from '@/view/layout/components/main'
  export default {
    name:'',
    data () {
      return {

      };
    },
    components: {
        navbar,
        sidebar,
        Main
    },
    mounted() {},
    methods: {},
    watch: {}
  }

</script>
<style lang='scss' scoped>
  .app-wrapper{
    width:100%;
    height:100vh;
    .navbar{
      width:100%;
      height:50px;
      position: fixed;
      top:0;
      z-index: 1000;
    }
    .app-container{
      width:100%;
      height:100vh;
      .sidebar{
        width:230px;
        height:100vh;
        background-color:#fff;
        border-right:1px solid #e6e6e6;
        position:fixed;
        left:0;
        padding-top:50px;
        z-index: 100;
      }
      .app-m{
        width:100%;
        height:100vh;
        padding:50px 0 0 230px;
      }
    }
  }
</style>