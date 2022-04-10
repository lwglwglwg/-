/* 在js中有两种常见的定义函数的方法-函数声明和函数表达式*/
//函数声明
function sum(x,y){
    console.log(x+y);
    return x+y
}
sum(1,2)
//函数表达式
let sum1=function(x,y){
    console.log(x+y);
    return x+y
}
sum1(7,3)
/*在ts中 */