<template>
  <div class="container">
    <h3>管理一</h3>
    <el-button type="primary" round>新增</el-button>
  </div>
</template>

<script>
import {getSubstationManagement} from '@/api/mode'
  export default {
    name:'',
    data () {
      return {
          dataList:[],//列表数据
      };
    },
    components: {},
    mounted() {
        this.getList();
    },
    methods: {
        // 获取列表数据
        getList(){
            let data = {
                from:1,   // 页数
                // size:10   // 每页几条数据
            }
            getSubstationManagement(data).then(res=>{
                if(res.code == 200){
                    this.dataList = res.data
                }
            })
        }
    },
    watch: {}
  }

</script>
<style lang='scss' scoped>
h3{
    margin-bottom: 20px;
}
</style>