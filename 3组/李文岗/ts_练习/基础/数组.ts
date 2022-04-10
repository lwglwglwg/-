// 数组类型有多种定义方式 
//  1. 类型+方括号[]
let arr:number[]=[1,2,3]
// arr.push(1)
let arr1:string[]=['1','2','3']

// 2. 数组泛型(Array Generic) 不推荐 因为与react中jsx冲突
let arr2:Array<number>=[1,2,3]

// 3. 接口表示数组
 interface Person{
     [index:number]:number
 }  

 let tom:Person=[1,2,3]

// 类数组 arguments 不是数组类型，比如 arguments
interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}

function sum(){
    var args:IArguments=arguments//IArguments中ts定义好了
}
// any在数组中的应用 
  //用any表示数组中允许出现任意类型：
let arr3:any[]=[1,'dd',false]
 
export {}