// 类
// ts实现ES6中的类的功能以外，还添加了一些新的用法
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 类（Class）：定义了一件事物的抽象特点，包含它的属性和方法
// 对象（Object）：类的实例，通过 new 生成
// 面向对象（OOP）的三大特性：封装、继承、多态
// 封装:将对数据的操作细节隐藏起来，只暴露对外的接口,不考虑内部怎么实现的
// 继承：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
// 多态：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应
// 存取器（getter & setter）:用以改变属性的读取和赋值行为
// 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。如public表示公有属性或方法
// 属性和方法 
// 1.使用 class 定义类，使用 constructor 定义构造函数
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.sy = function () {
        return "my name is " + this.name;
    };
    return Animal;
}());
var c = new Animal('tom');
console.log(c.sy()); // my name is tom
//2.类的继承
//使用 extends 关键字实现继承，子类中使用super关键字来调用父类的构造函数和方法
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(name) {
        var _this = _super.call(this, name) //调用父的constructor
         || this;
        console.log(_this.name);
        return _this;
    }
    Cat.prototype.syh = function () {
        return 'll' + _super.prototype.sy.call(this);
    };
    return Cat;
}(Animal));
var d = new Cat('bb');
console.log(d.syh());
