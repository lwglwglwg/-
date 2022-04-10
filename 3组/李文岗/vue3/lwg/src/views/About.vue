<template>
  <div class="about">
    <div>
       {{info}}--    {{msg}}
     <button @click="change">按钮</button>
     <!-- 子传父-->
     <one :msg='info' @fa="father"></one>
    </div>
  </div>
</template>
<script>
import {defineComponent,reactive,toRefs,onActivated,onDeactivated} from "vue" 
import one from "@/components/One.vue"//子组件
export default defineComponent({//defineComponent
  name:'About',
  components:{one},//组件

  setup(){ //相当于 vue2中 beforecreate created

 
    let info="hello"; //父传子
    
   let state=reactive({//在reactive中响应
     msg:'你好',
   })
   let change=()=>{//方法
      info="word";
      state.msg="vue3"
   }
   let father=(arg)=>{//子传父  content.emit('fa','ab') 
      console.log(arg);
   }
   onActivated(()=>{
    console.log('进入');
  })
  onDeactivated(()=>{
    console.log('离开');
    
  })
    return{//return
      info,
      change,
      // state
      ...toRefs(state),// 添加了toRefs {{msg}} 不用在调用state.msg
      father,
    }
  }

})
</script>

