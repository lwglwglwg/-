//枚举（Enum）用于取值被限定在一定范围内的场景，比如一周只能有七天
 enum Days {Mon, Tue, Wed, Thu, Fri, Sat,Sun}
 //枚举成员赋值从0开始地址的数，也会对枚举值对枚举名进行反向映射
 console.log(Days['Mon']===0);//true
 
 //手动未赋值的枚举会接着上一个枚举递增
 enum Days2 {Mon=4, Tue=2, Wed, Thu, Fri, Sat,Sun}
 //手动赋值的枚举可以不是数字 如断言
 enum Days3 {Mon,Tue,Wed=<any>"D"}
 //还可以是小数或负数
 enum Days4 {Mon=2.2,Tue=-1,Wed}

 //2.常数项和计算所得项
enum Color {Red, Green, Blue = "blue".length};
 //Red, Green常数项  
 //"blue".length 计算所得项

 //3.常数枚举：使用 const enum 定义的枚举类型：
 const enum Directions {
    Up,
    Down
}
let directions=[Directions.Up,Directions.Down]
//常数枚举与普通枚举的区别是：它会在编译阶段被删除，并且不能包含计算成员。

//4.外部枚举：使用declare enum 定义的枚举类型
declare enum Dir {
    Up,
    Down
}
let dir=[Dir.Up,Dir.Down]
//declare编译时的检查，编译后没有。