<template>
  <div class="container">
    <h2>以点餐</h2>
       <ul>
           <li v-for="(item,index) in list2" :key="index">
               {{item.name}} --价格{{item.price}}
               <button @click="del(index)">取消</button>
           </li>
       </ul>
  </div>
</template>

<script >
import {reactive,toRefs} from "vue"
 
export default{
  name:"App",
  props:['list2'],
  setup(props,content) {
      let del=(index)=>{
        content.emit('del',index)
      }
    return {
       del
    }
  }
}
</script>

<style lang="less" scoped>
</style>
