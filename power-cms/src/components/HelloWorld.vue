<template>
  <div class="hello">
    <ul>
      <li v-for="(iten,index) in list1" :key="index">
        {{item.name}}  -----   {{item.age}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return{
      list1:[
        {name:'张三',age:24},
        {name:'李四',age:25},
        {name:'王五',age:26},
      ]
    }
  },
  props: {
    msg: String
  }
}
</script>

