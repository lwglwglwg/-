//字符串字面量类型 ：约束取值只能是某几个字符串中的一个
type eve='click'|'scoll'|'mousemove';
function handleEvent(ele:Element,event:eve){

}
handleEvent(document.getElementById("hello"),'click')//可以
// handleEvent(document.getElementById("hello"),'dbclick')//不可以 eve中没有dbclick
// 类型别名与字符串字面量类型都是使用 type 进行定义


//基本数据类型 ：两种创建
// 1.字面量
 let num=1
 //2. 够造函数
 let n=new Number(1)
 console.log(num==n);
 