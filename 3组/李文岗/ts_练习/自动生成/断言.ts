// 断言
// let anystr:any="hellow"
// let sLeng:number=(anystr as string).length
// console.log('len',sLeng);

// let sLeng:number=(<string>anystr).length
// console.log('leg2');

// 1 将联合类型断言为其中一个类型

function getCacheData(key: string): any {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom = getCacheData('tom') as Cat;
tom.run();