// 对象--接口（interfaces定义对象的类型） 也用于对于“对象的形状（shape）”的描述
  interface Person{
      name:string,
      age:number
  }
  let ke:Person={
      name:'key',
      age:25
  }
   //注意：定义的变量比接口多或少是不允许的

// 定一个接口
interface IPerson{//接口一般首字母大写I
     name:string;  //必选属性 
     age?:number; //？ 可选属性 （我们希望不完全匹配一个形状）
    //  [propName:string]:string|number;//任意值 （希望一个接口允许有任意的属性）
     [propName:string]:any; //或改成any 任意值
    //注意： 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
    readonly id:number;//只读属性readonly ：只读属性约束在第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候
}

let tom:IPerson={name:'kiy',color:'red',id:123}
// tom.id=111; 不能再赋值

export {}