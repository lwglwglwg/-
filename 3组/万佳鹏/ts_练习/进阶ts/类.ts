/*  类 */
// ts实现ES6中的类的功能以外，还添加了一些新的用法,类（Class）：定义了一件事物的抽象特点，包含它的属性和方法
// 对象（Object）：类的实例，通过 new 生成
// 面向对象（OOP）的三大特性：封装、继承、多态
// 封装:将对数据的操作细节隐藏起来，只暴露对外的接口,不考虑内部怎么实现的
// 继承：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
// 多态：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应
// 存取器（getter & setter）:用以改变属性的读取和赋值行为
// 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。如public表示公有属性或方法

   
// 属性和方法 
   // 1.使用 class 定义类，使用 constructor 定义构造函数
  class Animal{
      public name;
      constructor(name:string){
          this.name=name
      }
      sy(){
          return `my name is ${this.name}`
      }
  }
  let c=new Animal('tom')
 console.log(c.sy());// my name is tom

   //2.类的继承
    // 使用 extends 关键字实现继承，子类中使用super关键字来调用父类的构造函数和方法
  class Cat extends Animal{
      constructor(name:string){
          super(name) //调用父的constructor
          console.log(this.name);
      }
      syh(){
          return 'll'+super.sy() 
      }
  }  
let d= new Cat('bb')
console.log(d.syh());//llmy name is bb
// 3.存取器：使用 getter 和 setter 可以改变属性的赋值和读取行为

//4. 静态方法：static 修饰符修饰的方法称为静态方法

// 5.  ES7中类的用法(ES6中实例的属性只能通过构造函数中的 this.xxx 来定义，ES7 提案中可以直接在类里面定义)
//  实例属性
class nimal {
    name = 'Ja';
    constructor() {
      // ...
    }
  }
  let a = new nimal();
  console.log(a.name); // Ja
// 静态属性
  class mal {
    static num = 42;
    constructor() {
      // ...
    }
  }
  
  console.log(mal.num); // 42

//6.TypeScript 中类的用法
  //public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
  //private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
 // protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的

//  7.类的类型
   class fu{
       name:String;
        constructor(name:string) {
            this.name=name
        }
        ss():string {
            return  '名字：+'+this.name
        }
   }
   let k:fu=new fu('key')
   console.log(k.ss()); //名字key
   
export {}