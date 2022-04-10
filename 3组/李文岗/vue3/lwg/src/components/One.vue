<template>
  <div class="container">
     子组件
     {{msg}}
   <button @click="sendFa">点击传父</button>
  </div>
</template>

<script >
import {toRefs} from "vue"//响应式
export default{
    name:'One',
    props:['msg'],//1.接收
    setup(props,content){//2.setup中不能用this 传两个值
      let {msg} =toRefs(props)
      let sendFa=()=>{//  
          content.emit("fa",'abc')
      }
      return{//3.返回sedFa
          msg,
          sendFa,//
      }
    }
}
</script>

<style lang="less" scoped>
</style>
