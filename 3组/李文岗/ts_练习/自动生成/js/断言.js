"use strict";
// 断言
// let anystr:any="hellow"
// let sLeng:number=(anystr as string).length
// console.log('len',sLeng);
// let sLeng:number=(<string>anystr).length
// console.log('leg2');
// 1 将联合类型断言为其中一个类型
function getCacheData(key) {
    return window.cache[key];
}
var tom = getCacheData('tom');
tom.run();
