<template>
  <div class="quill-container">
    <!-- <h2>富文本编辑器--quill-editor</h2> -->
    <div class="quill-con">
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
      ></quill-editor>
    </div>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  name: "",
  data() {
    return {
      content: "",
      editorOption:{}
    };
  },
  components: {quillEditor},
  computed:{
    editor() {
            return this.$refs.myQuillEditor.quill;
        }
  },
  mounted() {},
  methods: {
    onEditorReady(editor) {}, // 准备编辑器
    onEditorBlur(val,editor){
      console.log(val)
      console.log(editor)
    }, // 失去焦点事件
    onEditorFocus(val,editor){
      console.log(val)
      console.log(editor)
    }, // 获得焦点事件
    onEditorChange(res){
      console.log(res)
    }, // 内容改变事件
  },
  watch: {}
};
</script>
<style lang='scss' scoped>
.quill-container{
  width: 100%;
  height:100%;
  .quill-con{
    width:1000px;
    height:600px;
    padding: 20px;
  }
  .quill-editor{
    width:1000px;
    height:500px;
  }
}
</style>