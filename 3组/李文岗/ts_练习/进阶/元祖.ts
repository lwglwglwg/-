//数组合并了相同类型的对象，
//元组（Tuple）合并了不同类型的对象
 //定义一对值分别为 string 和 number 的元组
let tom:[string,number] =['tom',12]
console.log(tom[0]);
tom[0].slice(1)
tom[1].toFixed(2)//number的属性

//2.越界的元素
//当添加越界的元素时，它的类型会限制为元组中每个类型的联合类型：
let tom2: [string, number];
tom2 = ['Tom', 25];
tom2.push('male');
// tom2.push(true);不可以

