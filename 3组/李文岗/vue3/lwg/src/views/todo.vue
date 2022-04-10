<template>
  <div class="container">
    <!-- 子组件 -->
     <todo1 :list="list" @add="add"></todo1>
     <todo2 :list2="list2" @del="del"></todo2>
     <todo3 :count="count"  :totalPrice="totalPrice" ></todo3>
     

   
  </div>
</template>

<script >
import {reactive,toRefs,computed} from "vue"
import todo1 from '@/components/todo1.vue'//子
import todo2 from '@/components/todo2.vue'//子
import todo3 from '@/components/todo3.vue'//子

export default{
  name:"todo",
  components:{todo1,todo2,todo3},
  setup() {
    //   处理浮点
   let add =(num1,num2)=>{ //将第一个数转成字符串，取小数，记录小数点位数
       let a1=(''+num1).split('.')[1] ? (''+num1).split('.')[1].length :0;
       let a2=(''+num2).split('.')[1] ? (''+num2).split('.')[1].length :0;
       let m =Math.pow(10,Math.max(a1,a2))//取较大的数，获得10指数幂
       return (num1*m +num2*m)/m //整数相加 ，再除以指数
   }

   const state = reactive({
     list:[
         {
             name:'丸子',
             price:20.21
         },
         {
             name:'宫保鸡丁',
             price:16.32
         },
          {
             name:'西红柿鸡蛋',
             price:21.42
         },
          {
             name:'蒜薹肉丝',
             price:28.33
         }
     ],
     list2:[],//以点餐
     
    
     add:(index)=>{
         console.log('你点的是：',state.list[index]);
         state.list2.push(state.list[index])//添加list2中
         
      },
    del:(index)=>{
      console.log('你取消了'+state.list2[index]);
      state.list2.splice(index,1)
    },
    
    count:computed(()=>{ //总个数
       return state.list2.length
    }),

    totalPrice:computed(()=>{ //总价格
        let totalPrice=0
        state.list2.map(item=>{ //map
            totalPrice=add(totalPrice,item.price)
        })
        return totalPrice
        // let num=0
        // state.list2.forEach(item=>{
        //      num+=item.price*1
        // })
        // return num
    })

   })

  
  

    return {
       ...toRefs(state)
    }
  }
}
</script>

<style>
li{
    list-style: none
}
</style>
