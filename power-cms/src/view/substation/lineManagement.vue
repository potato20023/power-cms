<template>
  <div class="container">
    <h3>管理二</h3>
    <p>线路管理</p>
    <el-button type="primary" round @click="add()">新增</el-button>
  </div>
</template>

<script>
import {getLineManagement,addLineManagement,updateLineManagement,deleteLineManagement} from '@/api/mode'
  export default {
    name:'',
    data () {
      return {
          dataList:[],  // 列表
          page:1,   // 页数
          rows:10,   // 条数
          total:0   // 总条数
      };
    },
    components: {},
    mounted() {},
    methods: {
        // 获取列表
        getList(){
            let data = {
                page:this.page,
                rows:this.rows
            }
            getLineManagement(data).then(res=>{
                if(res.code === 200){
                    this.dataList = res.extend.listStationLine
                    this.total = res.extend.count
                }
            })
        },
        // 新增
        add(){

        },
        // 
    },
    watch: {}
  }

</script>
<style lang='' scoped>

</style>