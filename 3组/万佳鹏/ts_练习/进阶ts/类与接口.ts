//类与接口:接口（Interfaces）可以用于对「对象的形状（Shape）」进行描述。
  // 1. 一个类可以实现多个接口
  interface Alarm {
      alert():void;
  }
  interface Light {
      lightOn():void;
      lightOff():void;
  }

  class Car implements Alarm,Light{
      alert(){
        console.log('car');
        
      }
      lightOn(){
       console.log('lighton');
       
      }
      lightOff(){
       console.log('lightoff');
       
      }
  }

 // 2.接口继承接口
   interface Amail {
       alert():void;
   }
   interface Dog extends Amail {
       lightOn():void;
       lightOff():void;
   }

//  3.接口继承类
 class Point {
     x:number;
     y:number;
     constructor(x:number,y:number) {
         this.x=x
         this.y=y
     }
 }  

 interface pot extends Point {
    z:number;
 }
 let pot3:pot={x:1,y:3,z:4} 