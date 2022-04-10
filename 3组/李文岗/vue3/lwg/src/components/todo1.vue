<template>
  <div class="container">
    <h1>todolist点餐</h1>
     <h2>餐单列表</h2>
       <ul>
           <li v-for="(item,index) in list" :key="index">
               {{item.name}} --价格{{item.price}}
              <button @click="add(index)">点餐</button> 
           </li>
       </ul>
  </div>
</template>

<script >
import {reactive,toRefs} from "vue"
 
export default{
  name:"App",
  props:['list'],
  setup(props,content) {
    let add=(index)=>{
       content.emit('add',index)
       console.log(add,index);
      }
  
    return {
     add,
    }
  }
}
</script>

<style lang="less" scoped>
</style>
