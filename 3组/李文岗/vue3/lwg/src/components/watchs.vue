<template>
  <div class="container">
     {{page}}
     {{num}}
    <input type="text" v-model="num">
  </div>
</template>

<script >
import {reactive,toRefs,watch,watchEffect} from "vue"
 
export default{
  name:"App",
  setup() {
   const state = reactive({
      page:1,
      num:2
   })
  //watch :数据改变触发  监听一个值
//    watch(state,(newVule,oldVule)=>{
//        console.log('数据改变了'+state.page);
       
//    })    
  //具体监听对象某个值
//   watch(()=>state.num,(newVule,oldVule)=>{
//        console.log(newVule);
       
//   })
   //监听多个值
//    watch([()=>state.page,()=>state.num],(newVule,oldVule)=>{
//        console.log('数据改变了'+newVule);
//        console.log(newVule[1]);//监听第2个
       
//    })

    //watchEffect :初始时就开始监听了
    watchEffect(()=>{
        console.log('改变了'+state.num);
        
    })

    return {
       ...toRefs(state)//展开
    }
  }
}
</script>

<style lang="less" scoped>
</style>
