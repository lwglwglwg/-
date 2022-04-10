// 断言 （用来手动指定一个值的类型）
// 语法：值 as 类型   或 <类型>值
//1. 将一个联合类型断言为其中一个类型 （不确定联合类型的时，只能访问联合共有属性、方法）
interface Cat{
    name:string;
    run():void;
}
interface Fish{
    name:string;
    swim():void;
}
function isFish(animal:Cat | Fish){
   if (typeof (animal as Fish).swim() ==='function' ) {// 断言方式 (animal as Fish).swim()
       return true
   }
   return false    
}
   //  注意：滥用类型断言可能会导致运行时错误


// 2.将父类断言作为子类 ( class类之间有继承关系)
class APIError extends Error{
    code: number=0;
}
class HttpError extends Error{
    statusCode:number=200
}
function isPP(error:Error){
    if (typeof(error as APIError).code==='number') {
        return true
    }
    return false
}
//3.  接口断言 
interface APIError extends Error{
    code: number;
}
interface HttpError extends Error{
    statusCode:number;
}
function isP(error:Error){
    if (error instanceof APIError) {
        return true
    }
    return false
}
// 4.将任何一个类型断言为 any
     // window.foo=1  保存
     (window as any).foo=1  // as断言为any类型不会报错  


// 5.将any断言为一个具体的类型
   function getData(key:string):any{
       return (window as any).cache[key]
   }
   interface Cat{
       name:string,
       run():void;
   }
   let tom =getData('tom') as Cat
   tom.run()
//##  类型断言的限制:
    //联合类型可以被断言为其中一个类型
    //父类可以被断言为子类
    //任何类型都可以被断言为 any
    //any 可以被断言为任何类型

 //例子： A 兼容 B，那么 A 能够被断言为 B，B 也能被断言为 A
      interface Animal{
          name:string;
      }   
      interface Dog{
          name:string;
          run():void;
      }
      function fun(animal:Animal){
          return (animal as Dog)
      }
      function fn(dog:Dog){
          return (dog as Animal)
      }

  //##  双重断言
   
    //特点：
      //任何类型都可以被断言为 any
      // any 可以被断言为任何类型    
    interface Cat {
        run(): void;
    }
    interface Fish {
        swim(): void;
    }
    
    function testCat(cat: Cat) {
        return (cat as any as Fish);
    }

  //### 类型断言 vs 类型转换  
   //类型断言不是类型转换，它不会真的影响到变量的类型
  function funs(arg:any):boolean{
      return Boolean(arg)
  }
 funs(1)


  // ## 类型断言 vs 泛型
   function getTag<T>(key:string):T{
       return (window as any).cache[key]
   }
   interface Cat{
       qname:'str';
       run():void;
   }
   let qtom =getTag<Cat>('tom')
   qtom.run()
   
export {}//局部变量