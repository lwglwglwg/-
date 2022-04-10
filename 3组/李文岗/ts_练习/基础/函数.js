"use strict";
// 1.函数声明 
// function sum(x:number,y:boolean):number{
//     return x+Number(y)
// }
// console.log(sum(1,true));
exports.__esModule = true;
// 2.函数表达式
var sum1 = function (x, y) { return x + y; };
console.log(sum1(1, 3));
// 剩余参数
function push(arr) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    items.forEach(function (item) {
        arr.push(item);
    });
}
var list = [];
push(list, 1, 2, 'hello');
console.log(list);
