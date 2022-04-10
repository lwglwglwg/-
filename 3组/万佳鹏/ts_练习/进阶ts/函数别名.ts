//类型别名：给一个类型起个新名字
   type name=string; //有type 创建类型别名
   type name2=()=>string;
   type name3=name|name2
   function getName(n:name3):name{
       if (typeof n==='string') {
           return n;
       } else {
           return n()
       }
   }