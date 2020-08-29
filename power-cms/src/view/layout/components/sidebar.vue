<template>
  <div class="sidebar">
    <el-menu
      :default-active="$route.path"
      class="el-sidebar"
      @open="handleOpen"
      @close="handleClose"
      text-color="#303133"
      :unique-opened="true"
    >
      <div v-for="item in routerList" :key="item.path">
        <!-- 没有三级菜单，二级菜单只有一个，直接显示成一级菜单 -->
        <!-- <router-link
          v-if="item.children.length == 1 && !item.children[0].children"
          :to="{path:item.path+'/'+item.children[0].path}"
          :key="item.meta.title"
        >
          <el-menu-item :index="item.path+'/'+item.children[0].path">
            <i
              v-if="item.children[0].meta && item.children[0].meta.icon"
              class="iconfont"
              :class="item.children[0].meta.icon"
            ></i>
            <span v-if="item.children[0].meta && item.children">{{item.children[0].meta.title}}</span>
          </el-menu-item>
        </router-link> -->
        <!-- 二级菜单有多个 -->
        <el-submenu :index="item.name || item.path" :key="item.meta.title">
          <template slot="title">
            <i v-if="item.meta && item.meta.icon" class="iconfont" :class="item.meta.icon"></i>
            <span slot="title" v-if="item.meta && item.meta.title">{{item.meta.title}}</span>
          </template>
          <router-link
            :to="{path:item.path+'/'+child.path}"
            v-for="child in item.children"
            :key="child.meta.title"
          >
            <el-menu-item :index="item.path+'/'+child.path">
              <!-- <i v-if="child.meta && child.meta.icon" class="iconfont" :class="child.meta.icon"></i> -->
              <span slot="title" v-if="child.meta && child.meta.title">{{child.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </el-submenu>
      </div>
    </el-menu>
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
    ...mapGetters(["routers"]),
    routerList() {
      return this.routers.filter(function(router) {
        if(router.children){
          router.children = router.children.filter(route=>{
            return !route.hidden
          })
          return !router.hidden && router.children
        }else{
          return !router.hidden && router.children
        }
      });
    }
  },
  components: {},
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  },
  watch: {}
};
</script>
<style lang='scss' scoped>
.sidebar {
  width: 250px;
  height:100%;
  overflow: auto;
  .el-menu {
    border: 0;
    height:100%;
    .el-menu-item span {
      margin-left: 10px;
    }
    .el-submenu__title span {
      margin-left: 10px;
    }
    // .el-menu-item i{
    //   margin-right:10px;
    // }
    // .el-submenu__title i {
    //   color: #000;
    //   font-size: 16px;
    //   margin-right:10px;
    // }
    // .el-menu-item.is-active i{
    //   margin-right:10px;
    // }
  }
}
</style>