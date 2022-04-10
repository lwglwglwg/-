<template>
<!-- 双向数据绑定原理 -->
  <div class="container">

  <input type="text" ref="reftxt" @input="getValue" :value="txt">
  {{txt}}
<el-button type="primary">el-button</el-button>


    <br>
    ___________________________________________________________________________________
      <br>
    watch深度监听
    <watchs></watchs>

    <!-- 异步请求 -->
      <br>
    ___________________________________________________________________________________
      <br>
      <Suspense>
        <template #default>
            <dog-show />
        </template>
        <template #fallback>
            <h1>Loading !...</h1>
        </template>
      </Suspense>
    
    {{error}}
   
  </div>
</template>

<script >
import {reactive,toRefs,getCurrentInstance,onErrorCaptured,ref} from "vue"
import watchs from "@/components/watchs"//监听组件
import DogShow from "@/components/DogShow" //异步请求
export default{
  name:"Home",
  components:{watchs,DogShow},
  setup() {
   const state = reactive({
     txt:'',//绑定
   })
   let {ctx} =getCurrentInstance()//获取实例
    const getValue=()=>{
       console.log('触发了');
       //this.$refs.reftxt.value    vue2语法
       state.txt=ctx.$refs.reftxt.value //vue3语法
    }

    let error=ref(null)
    onErrorCaptured((e)=>{
      error.value=e
      return true
    })
    return {
    //  state,
     ...toRefs(state),
     getValue,
     error
    }
  }
}
</script>

<style lang="less" scoped>
</style>
