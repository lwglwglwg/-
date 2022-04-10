/* 在ts中有多个定义数组的方法 */
//1.可以用类型+[]
let arr:number[]=[1,1,2,5]
arr.push(10)
arr.push("78")
console.log(arr);
//上列中数组类型定义为number代表数组中的值只能为number类型
//数组方法也会受到类型的影响只能添加number类型的值，其他类型会报错

/* 2可以用数组泛型 */
let arr1:Array<any>=[1,2,5,6,8,"55"]
console.log(arr1);
//用Array<类型>来定义数组

/* 3比较常见的用any来定义数组 */
let arr2:any[]=[1,2,"45",{name:"玛卡巴卡"}]
console.log(arr2);
//用any来定义数组那数组就可包含任意类型的值
