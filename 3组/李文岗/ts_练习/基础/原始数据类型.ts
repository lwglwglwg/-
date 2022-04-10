//  js分为:  原始数据类型(布尔值、数值、字符串、null、undefined 以及 ES6 中的新类型 Symbol) 和对象类型
// 1. 布尔值 : 是基础的类型 在ts中使用 boolean定义布尔值类型
         let a:boolean=false
         //如果是够造函数Boolean创建的对象不是布尔值  new Boolean(1)返回的是对象
         let createb:Boolean=new Boolean(1)  //够造函数B必须大写
// 2. 数值：使用number定义数值类型
         let two:number=0b1010; //二进制
         let  eight:number=0o744; //八进制
        //  0b1010 和 0o744 是 ES6 中的二进制和八进制表示法，它们会被编译为十进制数字。
        
// 3. 字符串：定义字符串类型
        let  Name:string="tom";
        let strName:string=`你的名字是${Name}`//模板字符串
        // console.log(strName);
// 4.空值：js中没有空值，ts可以用void表示没有任何返回值的函数
         function fun():void{
             alert("空值")
         } 
         let b:void=undefined //void只能赋值为undfined和null
// 5.null和undefined:  ts中null 和undefined来定义两个原始数据类型
         let u:undefined=undefined;
         let n:null=null
         //undefined 和 null 是所有类型的子类型。也就是说undefined类型的变量，可以赋值给number类型的变量；
          //void类型的变量不能赋值给number类型的变量


        

