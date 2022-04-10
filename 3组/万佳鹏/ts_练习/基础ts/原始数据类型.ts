/* 在变量后面用：加上类型 */
// 列如：Boo后面跟上boolean只能赋值boolean类型的值true/false
let Boo: boolean = true
let Str: string = "雷霆嘎巴"
let Num: number = 123

/* 可以用Void来表示没有任何返回值的函数， */
function alertName(): void {
    console.log("我的家在东北");
}
let ale = alertName()

/* 声明一个Void类型的变量没有什么用，因为只能赋值null和undeefined*/
/* 注意：null只有strictNullChecks为false的时候才可以赋值给void类型(在tsconfig.json)中设置*/
let voi:void=null
console.log(voi);

/* null和undefined可以直接定义原始数据类型的 */
let Nul: null = null
let Nun: undefined = undefined

/* null,undefind是所有类型的子类型可以赋值给其他类型，但是void是不可以的*/
let nul1:null=null
let voi1:void
let str1:number=nul1
// let str2:number=voi1  Type 'void' is not assignable to type 'number'(类型“void”不能赋值给类型“number”。)

export{}