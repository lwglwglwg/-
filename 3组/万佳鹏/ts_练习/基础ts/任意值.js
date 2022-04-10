"use strict";
exports.__esModule = true;
/* 如果是一个普通类型在赋值过程中改变类型是不被允许的 */
var str = "欧青辣少";
/* str=123 */ /*  Type 'number' is not assignable to type 'string'.(类型'number'不能赋值给类型'string'。) */
/* 但是如果是any类型的话则是允许赋值任意类型的 */
var str1 = "玛卡巴卡";
str1 = 123;
/* 在任意值可以访问任何属性都是允许的 */
var anyThing = 'hello';
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);
/* 在声明变量的时候如果没有指定类型则自动为any类型 */
var sun;
sun = "123";
sun = 112;
/* 上列等于下列 */
var sun1;
sun1 = "123";
sun1 = 123;
