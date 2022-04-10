/* 在ts中我们可以使用接口来定义对象的类型 */
/* ts中的接口是一个非常灵活的概念，除了可用于对类的一部分进行抽象外也可以对对象的形状进行描述*/
//列
interface obj {
    name: string;
    age: number
}
let obj1: obj = {
    name: "玛卡巴卡",
    age: 123
}
 let obj2:obj={
     name:"唔西迪西"
 }
 let obj3:obj={
    name:"唔西迪西",
    age:13,
    sex:"女"
}
/* 定义的变量必须和接口一模一样不能少属性也不能多属性 */

/* 如果我们需要一个可有可无的属性可以用可选属性 */
interface objs {
    name: String;
    age?: number
}
let obj4: objs = {
    name: "jjj",
    age: 123
}
let obj5: objs = {
    name: "jjj",
}
let obj6:obj={
    name:"唔西迪西",
    age:13,
    sex:"女"
} 
/* 上列中age为可选属性可有可无但是还是不能可以添加未定义的属性 */

/* 任意属性 */
interface objss {
    name: string;
    age?: number;
    [name: string]: any
}
let obj7: objss = {
    name: "tttt",
    age: 123,
    sex: "13",
    bb: true
}
console.log(obj7);
// 上列设置l [name:string]:any
// 代表可以取任意类型的任意属性
//如果改成[name:string]:string那么确定属性和任意属性只能为string类型
//也可用用联合类型 [name:string]:string|number...

/* 只读属性*/
//用readonly来定义只读属性
//只读属性只能在创建的时候赋值，不能更改
interface obja {
    readonly id: number;
    name: string;
    sex: string;
    [name: string]: any
}
let obj8:obja = {
    id: 123,
    name:"王境泽",
    sex:"男",
    dizhi:"真香"
}
console.log(obj8);
obj8.id=1222//( Cannot assign to 'id' because it is a read-only property)(不能分配给'id'，因为它是只读属性。)
obj8.sex="女"
/* 因为id为只读属性所以更改时报错而sex不是只读属性更改时不报错 */
/* 如果 给obj8赋值的话不给id赋值也会报错*/
console.log(obj8);

export { }