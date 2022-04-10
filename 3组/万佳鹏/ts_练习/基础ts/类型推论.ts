/* 如果给一个变量赋值的时候没有指定类型那么typescript就会按照类型推论的规则推断出一个类型 */
let str="1346"
//str=123

/* 上列等于下列 */
let str1:string="1346"
//str1=13

/* 如果声明一个变量的时候没有赋值那么类型自动定义为any类型 */
let str3
str3=133
str3="133"
str3=true
export{}