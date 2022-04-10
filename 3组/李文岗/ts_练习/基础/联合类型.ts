//联合类型: 取值可以为多种类型中的一种。
          //使用： 用 | 分隔每个类型
    let a:string|number //只能是string或number类型
    a="ss"
    a=7    
   
    //1.联合类型的属性或方法
    function sy(arg:string|number){//不确定哪个类型 ：只能访问联合类型的公共属性和方法
        // return arg.length; 字符串有length
        arg.toString() //有sting和number
    }    

    //2.联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：
     let Cart:string|number;
     Cart="kkkk";
     console.log(Cart.length);
     







    export {}