<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      screenWidth:document.documentElement.clientWidth,
      screenHeight:document.documentElement.clientHeight
    };
  },
  components: {
  },
   mounted(){
    let $this = this;
    window.onresize = function(){
      $this.screenWidth = document.documentElement.clientWidth
      $this.screenHeight = document.documentElement.clientHeight
    }
    
  },
  watch:{
    screenWidth(res){
      this.$store.commit('SET_SCREEN_WIDTH',res)
    },
    screenHeight(res){
      this.$store.commit('SET_SCREEN_HEIGHT',res)
    }
  }
};
</script>

<style>
  @import './assets/iconfont/iconfont.css';
</style>
