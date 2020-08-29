<template>
  <div class="tag-bread">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path:'/'}">
        <i class="iconfont icon-Homehomepagemenu"></i>
      </el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in breadList" :key="index" :to="item.path?{path:item.path}:''">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["breadList"])
  },
  components: {},
  mounted() {
    // if (this.list.length == 0 && this.$route.matched[0].name != "首页") {
    //   this.list = this.$route.matched;
    // }
    if (this.breadList.length == 0 && this.$route.matched[0].name != "首页") {
      let list = [];
      this.$route.matched.map(item => {
        list.push({ path: "", name: item.meta.title });
      });
      this.$store.commit("SET_BREAD_LIST", list);
    }
  },
  methods: {},
  watch: {
    $route(res) {
      if (this.$route.matched[0].name == "首页") {
        this.$store.commit("SET_BREAD_LIST", []);
      } else {
        let list = [];
        res.matched.map(item => {
          list.push({ path: "", name: item.meta.title });
        });
        this.$store.commit("SET_BREAD_LIST", list);
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.tag-bread {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #e6e6e6;
  color: #333;
  padding: 11px 5px;
  background-color: #fff;
}
</style>