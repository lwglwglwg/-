//js中有两种常见的定义函数的方式——函数声明和函数表达式

// 有输入和输出，在 ts中对其进行约束
       //注意：输入多余的（或少于要求的）参数，是不允许的

// 1.函数声明 (一个函数有输入和输出，要在ts中对其进行约束)
function sum(x:number,y:boolean):number{
    return x+Number(y)
}
console.log(sum(1,true));

// 2.函数表达式 :（在ts的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型）
let sum1:(x:number,y:number)=>number=function (x:number,y:number):number{return x+y}
console.log(sum1(1,3));//注意=>为返回值   ES6中，=> 叫做箭头函数

// 3. 接口定义 (定义一个函数需要符合的形状)
  interface fun{ //对等号左侧进行类型限制,保证对函数名赋值时，保证参数个数、参数类型、返回值类型不变
      (source:string,subString:string):boolean
  }
  let myS:fun;
  myS=function(source:string,subString:string){
      return source.search(subString) !==-1
  }
// 4.  可选参数 ：可选参数必须接在必需参数后面
function Name(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat = Name('Tom', 'Cat');
let tom = Name('Tom');
// 5. 参数默认值：ts会将添加了默认值的参数识别为可选参数

function buildName(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName;
}
let cat = buildName('Tom', 'Cat');
let tom2 = buildName('Tom');

//6. 剩余参数 ：使用...rest方法获取函数中剩余参数

function push(arr:any[],...items:any[]){
    items.forEach(item=>{
        arr.push(item)
    })
}
let list:any[]=[];

push(list,1,2,'hello')

console.log(list);

//7.重载：函数接受不同数量或类型的参数时，作出不同的处理
function fun(x:number):number;
function fun(x:string):string;
function fun(x:number|string):number|string|void{
    if (typeof x==='number') {
        return Number(x.toString().split('').reverse().join(""))
    } else {
        return x.split("").reverse().join("")
    }
}
//注意：多个函数定义如果有包含关系，需要优先把精确的定义写在前面。




export {}