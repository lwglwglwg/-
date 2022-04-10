/* 联合类型表示取值为多种类型的一种 */
let str: number | string = 13
str = "133"
//类型之间用|表示 赋值只能有number和string类型其他类型不行

/* 当我们不确定联合类型的变量到底是哪个类型的时候，只能访问此联合类型共用的属性和方法 */
function allLength(som: string | number): number {
    return som.length
}
/* 因为length不是string和number的共用属性所以会报错( Property 'length' does not exist on type 'string | number') */
function allLength1(som: string | number): string {
    return som.toString()
}
/* 因为length是string和number的共用属性所以可以使用 */

let aleLength: string | number;
aleLength = 'seven';
console.log(aleLength.length); // 5
aleLength = 7;
console.log(aleLength.length); // 编译时报错
/* 因为1被推断城string类型拥有length属性可以使用，2则被推断成number类型不可以使用length属性 */