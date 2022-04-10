// 类型别名：给一个类型起个新名字
         //应用常用于联合类型 和替代接口
  type typeName=string|number
  function fn(arg:typeName){

  }   
  let a:typeName="hello"

      //替代接口
    interface shap{
        name:string;
        age:number
    }  
    let obj:shap={
      name:'张三',
      age:20
    }