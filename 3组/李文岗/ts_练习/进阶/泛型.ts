//  泛型 ：声明时不知名特征，使用时指明特征
    // 在定义函数、接口或类的时候，不知道具体的类型，在使用的时候再指定类型的一种特性。

// 1.在函数名后加<T>, T:代表输入的类型
    //  function fn(n){
    //       return n;
    //  }
     function foo<T>(n:T):T{
         return n;
     }
    foo<number>(100) 
    foo('str')//类型推论

 
   //2.泛型类 （与泛型接口类似，泛型也可以用于类的类型定义）
    class fun3<T> {
        private data=[]; //private私有属性
        push(item:T){
            return this.data.push(item)
        }
        pop():T{
            return this.data.shift()
        }
    } 
    let fn=new fun3<number>()
    fn.push(1)
    // fn.push("str")
    console.log(fn.pop().toFixed());
     

  //4.泛型 接口 （用接口的方式来定义一个函数需要的形状）
  interface fn4<T>{
      name:T;
  }
  let a:fn4<string>={name:'tom'}


   //5.泛型约束 （不知道同一类型操作，不能随意属性原因）
   interface fun{
    length:number
   }
   
   function newFun<T extends fun>(arg:T):T{ //使用extends约束T形状，必须拥有length属性
       console.log(arg.length);
       return arg
   }

  //6.多个类型参数  :（定义泛型时，可以一次性定义多种参数）
  function swp<T,U>(arg:[T,U]):[U,T]{
    return [arg[1],arg[0]]
  }
  swp([7,'seven'])//seven ,7

  //7.泛型参数的默认类型:（ts2.3以后，可以为泛型中的类型指定默认类型）
             //使用：没有指定参数,实际值也无法预测，默认类型会起作用
    
    function mfun<T=string>(length:number,vaule:T):Array<T> {
      let result: T[]=[];
      for(let i=0;i<length;i++){
          result[i]=vaule
      }
        return result;
    }











export {} //局部