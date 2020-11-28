<template>
  <div class="main-container">
    <breadcrumb class="bread-crumb"></breadcrumb>
    <app-main class="app-main"></app-main>
  </div>
</template>

<script>
import breadcrumb from '@/view/layout/components/breadcrumb'
import appMain from '@/view/layout/components/app-main'
  export default {
    name:'',
    data () {
      return {

      };
    },
    components: {
        breadcrumb,
        'app-main':appMain
    },
    mounted() {},
    methods: {},
    watch: {}
  }

</script>
<style lang='scss' scoped>
  .main-container{
    // .bread-crumb{
    //   position: fixed;
    //   top:50px;
    //   left:200px;
    //   z-index: 200;
    // }
    .app-main{
      // min-width:1000px;
      // margin-top:42px;
      padding: 20px;
    }
  }
</style>