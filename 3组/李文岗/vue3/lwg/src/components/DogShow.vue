<template>
  <div class="container">
     <img :src="res && res.message" alt="">
  </div>
</template>

<script >
import {reactive,toRefs} from "vue"//导入钩子
 import axios from "axios"
export default{
  name:"DogShow",
  async setup() {
     let rowData = await axios.get('https://dog.ceo/api/breeds/image/random') 
     return {
         res:rowData.data
     }
  }
}
</script>

<style >
</style>
