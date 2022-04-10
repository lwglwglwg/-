<template>
  <div class="container">
     <h3>一共点了{{count}}道菜,消费{{totalPrice}}</h3>
  </div>
</template>

<script >
import {reactive,toRefs} from "vue"
 
export default{
  name:"App",
  props:['count','totalPrice'],
  setup() {
   const state = reactive({

   })
    return {
     ...toRefs(state)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
