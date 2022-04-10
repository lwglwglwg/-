"use strict";
exports.__esModule = true;
//  泛型 ：声明时不知名特征，使用时指明特征
// 1.在函数名后加<T>, T:代表输入的类型
//  function fn(n){
//       return n;
//  }
function foo(n) {
    return n;
}
foo(100);
//2.泛型 类
var fun3 = /** @class */ (function () {
    function fun3() {
        this.data = []; //private私有属性
    }
    fun3.prototype.push = function (item) {
        return this.data.push(item);
    };
    fun3.prototype.pop = function () {
        return this.data.shift();
    };
    return fun3;
}());
var fn = new fun3();
fn.push(1);
// fn.push("str")
console.log(fn.pop().toFixed());
var a = { name: 'tom' };
function newFun(arg) {
    console.log(arg.length);
    return arg;
}
//多个类型参数 
function swp(arg) {
    return [arg[1], arg[0]];
}
swp([7, 'seven']); //seven ,7
