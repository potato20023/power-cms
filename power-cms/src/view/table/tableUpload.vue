<template>
  <div class="upload-excels">
      <h3>上传excel文件，并获取表格数据；以下有两种方式：①js方式，写在子组件中，引入本页。②结合element-ui中的el-upload，在本页中编写</h3><br><br>
      <h4>①js方式，写在子组件中，引入本页。</h4>
      <excel1 v-on:getResult="updateExcel" class="excel1"></excel1>
      <br><br><br>
      <h4>②结合element-ui中的el-upload，在本页中编写</h4>
      <div class="excel2">
        <el-upload
          class="upload-demo"
          action
          :on-change="handleChange"
          :show-file-list="true"
          :on-remove="handleRemove"
          :file-list="fileListUpload"
          :limit="1"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          :auto-upload="false"
        >
          <el-button size="small" type="primary">选择文件</el-button>
          <div slot="tip" class="el-upload__tip">注：只 能 上 传 xlsx / xls 文 件</div>
        </el-upload>
      </div>
    </div>
</template>

<script>
import excel1 from "@/view/components/upload-excel";
  export default {
    name:'',
    data () {
      return {
        fileListUpload:[],
        tableData2: []
      };
    },
    components: {excel1},
    mounted() {},
    methods: {
        // 导入表格-el-upload--start
    // excel表上传
    handleChange(file, fileList) {
      this.fileTemp = file.raw;
      // 判断上传文件格式
      if (this.fileTemp) {
        if (
          this.fileTemp.type ==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          this.fileTemp.type == "application/vnd.ms-excel"
        ) {
          this.importfxx(this.fileTemp);
        } else {
          this.$message({
            type: "warning",
            message: "附件格式错误，请删除后重新上传！"
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: "请上传附件！"
        });
      }
    },
    // 移除excel表
    handleRemove(file, fileList) {
      this.fileTemp = null;
    },
    importfxx(obj) {
      let _this = this;
      // 通过DOM取文件数据
      this.file = obj;
      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;
      var reader = new FileReader();
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64"
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary"
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是读取excel内容之后输出的东西
          console.log(outdata);
          this.da = [...outdata];
          let arr = [];
          this.da.map(v => {
            let obj = {};
            obj.ip = v["ip"]; //ip是表的标题
            arr.push(obj);
          });

          //return arr
          // 把读取的excel表格中的内容放进tableData2中(这里要改成自己的表的名字)
          _this.tableData2 = _this.tableData2.concat(arr);
        };
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    // 导入表格-el-upload--end

    // 导入表格--start
    updateExcel(e) {
      console.log(e); // 打印出的为导入Excel表格的json数据
    },
    // 导入表格--end
    },
    watch: {}
  }

</script>
<style lang='scss' scoped>
.upload-excels{
    width:100%;
    height:300px;
    .excel1 {
        width: 500px;
        height: 100px;
        border: 1px solid red;
    }
    .excel2{
      width:500px;
      height:100px;
      border:1px solid red;
    }
  }
</style>