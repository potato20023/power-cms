<template>
  <div class="main-app">
    <transition name="fade" enter-active-class="animated fadeIn" mode="out-in">
        <keep-alive>
            <router-view :key="new Date().getTime()"></router-view>
        </keep-alive>
    </transition>
  </div>
</template>

<script>

  export default {
    name:'',
    data () {
      return {

      };
    },
    components: {},
    mounted() {},
    methods: {},
    watch: {}
  }

</script>
<style lang='scss' scoped>
.main-app{
  
}
</style>